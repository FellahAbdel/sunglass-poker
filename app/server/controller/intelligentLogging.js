const fs = require('node:fs');

module.exports = csl = {
    outputFile: false,
    silenced: [],
    outLocaly: false,
    buffLocal: [],
    buffCallLocal: [],
    buffConsole: [],
    outLocalAdd: function(args) {
        this.buffCallLocal.push(args);
    },
    callLocal: function(){
        args = this.buffCallLocal.shift();
        this.outLocal.apply(this,args);
    },
    writeLocal: async function(){
        const element = this.buffLocal.shift();
        if (this.outputFile === false) {
            // this.outputFile = './log_'+Math.random()+'.html';
            this.outputFile = './log.html';
            fs.writeFile(this.outputFile, '', err => { });
        }
        fs.appendFile(this.outputFile, element, err => {
            if (err) { console.error('cannot output locally logs', err); }
        });
    },
    buffConsoleAdd: function(args) {
        this.buffConsole.push(args);
    },
    writeConsole: async function(){
        args = this.buffConsole.shift();
        this.pretty.apply(this,args);
    },
    outLocal: function (type, out, ...args) {
        var element = "<div class='" + out + ' ' + type + "'><h2>" + type + "</h2></br><section>";
        for (i in args) {
            var subElement = "<span>";
            data = args[i];
            if (typeof data === 'object')
                subElement += '<pre>' + this.getObjString(data) + '</pre>';
            else subElement += data;
            subElement += "</span>";
            element += subElement;
        }
        element += "</section></div>";
        this.buffLocal.push(element);
        this.writeLocal();
    },
    getObjString: function (obj, decorate = '    ') {
        var output = ' { ';
        var maxWidth = 0;
        var rs = '';
        for (var name in obj) {
            // recursive string of obj[name]
            rs = '';
            if (typeof obj[name] === 'function') rs = '[function]';
            else if (typeof obj[name] === 'object')
                if (decorate.length < 8) rs = this.getObjString(obj[name], decorate + '  ');
                else rs = '[OBJECT]';
            else rs = obj[name];
            output += '\n' + decorate + name + ':' + rs + ',';
        }
        if (rs !== '') output += '\n'
        return output + decorate + '}';
    },
    pretty: function (type, out, ...data) {

        console.log("\n\n[@" + type + "@] : ------------\n ");
        switch (out) {
            case "error":
                console.error(...data);
                break;
            case "log":
                console.log(...data);
                break;
            case "table":
                console.table(...data);
                break;
            default:
                console.log(...data);
        }
        console.log("\n------------ [-" + type + "-]\n");
    },
    prelog: function(type,out, ...data){
        if (this.outLocaly){
            this.outLocalAdd([type, out, ...data]);
            this.callLocal();
        }
        if (!this.silenced[type]) {
            this.buffConsoleAdd([type, out, ...data]);
            this.writeConsole();
        }
    },
    log: function (type, ...data) {
        this.prelog(type,'log',...data);
    },
    table: function (type, ...data) {
        this.prelog(type,'table',...data);
    },
    error: function (type, ...data) {
        this.prelog(type,'error',...data);
    },
    silenced: function (type) {
        if (Array.isArray(type)) {
            type.forEach((t) => this.silenced[t] = true);
        } else {
            this.silenced[type] = true;
        }
    },
    toggle: function (type) {
        if (Array.isArray(type)) {
            type.forEach((t) => this.silenced[t] = (!this.silenced[t] | true));
        } else {
            this.silenced[type] = (!this.silenced[type] | true);
        }
    },
}