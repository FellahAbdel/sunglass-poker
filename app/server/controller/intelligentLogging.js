const fs = require('node:fs');

module.exports = csl = {
    outputFile: false,
    silenced: [],
    outLocaly: false,
    outLocal: function (type, out, ...args) {
        var element = "<div class='" + out + "'><h2>" + type + "</h2>";
        for (i in args) {
            var subElement = "<pre>";
            data = args[i];
            if (typeof data === 'object')
                subElement += this.getObjString(data);
            else subElement += data;
            subElement += "</pre>";
            element += subElement;
        }
        element += "</div>";
        if (this.outputFile === false) {
            // this.outputFile = './log_'+Math.random()+'.html';
            this.outputFile = './log.html';
            fs.writeFile(this.outputFile, '', err => { });
        }
        fs.appendFile(this.outputFile, element, err => {
            if (err) { console.error('cannot output locally logs', err); }
        });
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
    log: function (type, ...data) {
        if (this.outLocaly)
            this.outLocal(type, 'log', ...data);
        if (!this.silenced[type]) {
            this.pretty(type, 'log', ...data);
        }
    },
    table: function (type, ...data) {
        if (this.outLocaly)
            this.outLocal(type, 'table', ...data);
        if (!this.silenced[type]) {
            this.pretty(type, 'table', ...data);
        }
    },
    error: function (type, ...data) {
        if (this.outLocaly)
            this.outLocal(type, 'error', ...data);
        if (!this.silenced[type]) {
            this.pretty(type, 'error', ...data);
        }
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