const fs = require('node:fs');


/**
 * FIFO Implementation of print with local HTML and console.
 * Put decorators around a type of print.
 */
module.exports = csl = {
    // Set to false will choose the file itself and set it.
    // Could be preset or change during execution to allow time base log or clear the logs once in a while.
    outputFile: false,  
    // List of the silenced type.
    silenced: [],
    // If set to false logs wont be save in the html file.
    outLocaly: false,
    buffLocal: [],
    buffCallLocal: [],
    buffConsole: [],
    isOn: true, // Allow to quickly disable every print. Usefull for production environnement
    /**
     * Adds called print arguments to the local buffer list.
     * @param {...args} args 
     */
    outLocalAdd: function(args) {
        this.buffCallLocal.push(args);
    },
    /**
     * take next argument to be printed to the local buffer.
     */
    callLocal: function(){
        args = this.buffCallLocal.shift();
        this.outLocal.apply(this,args);
    },
    /**
     * Write the buffered elements to the local html file.
     */
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
    /**
     * Adds called print arguments to the console buffer list.
     * @param {...args} args 
     */
    buffConsoleAdd: function(args) {
        this.buffConsole.push(args);
    },
    /**
     * Write the next elements to the local buffer in html.
     */
    writeConsole: async function(){
        args = this.buffConsole.shift();
        this.pretty.apply(this,args);
    },
    /**
     * Write the next elements in the html buffer.
     * @param {(Array<String>|String)} type The classification of the print elements.
     * @param {String} out The kind of print. [error,table,log]
     * @param  {...any} args Elements to print.
     */
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
    /**
     * Create a String of the object. Prevent loop in string cast and allow nested object based on the decorator.
     * @param {Object} obj The object we need to detail.
     * @param {String} decorate Correspond to the left Space we need to leave. Allow readable indentation for nested object and table.
     * @returns the generated string
     */
    getObjString: function (obj, decorate = '    ') {
        var output = ' { ';
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
    /**
     * Create a decoration around the string we generate.
     * @param {(Array<String>|String)} type The classification of the print elements.
     * @param {String} out The kind of print. [error,table,log]
     * @param  {...any} args Elements to print.
     */
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
    /**
     * Filter what kind of log we want, local || console.
     * @param {(Array<String>|String)} type The classification of the print elements.
     * @param {String} out The kind of print. [error,table,log]
     * @param  {...any} args Elements to print.
     */
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
    /**
     * Set the type of print to the log type.
     * @param {*} type The classification of the print elements.
     * @param  {...any} data Elements to print.
     */
    log: function (type, ...data) {
        if(this.isOn)
            this.prelog(type,'log',...data);
    },
    /**
     * Set the type of print to table. Allow console to create the corresponding decoration.
     * @param {*} type The classification of the print elements.
     * @param  {...any} data Elements to print.
     */
    table: function (type, ...data) {
        if(this.isOn)
            this.prelog(type,'table',...data);
    },
    /**
     * Set the type of print to be an error. May allow for colors and specifics decoration in compatible console.
     * @param {*} type The classification of the print elements.
     * @param  {...any} data Elements to print.
     */
    error: function (type, ...data) {
        if(this.isOn)
            this.prelog(type,'error',...data);
    },
    /**
     * Allow to silence and stop the print on the console for the types passed in arguments.
     * They will always be printed in the local file if it's activated.
     * @param {String|Array<String>} type The type we want to silence.
     */
    silenced: function (type) {
        if (Array.isArray(type)) {
            type.forEach((t) => this.silenced[t] = true);
        } else {
            this.silenced[type] = true;
        }
    },
    /**
     * Switch between printing in the console and silencing the type in arguments.
     * @param {String|Array<String>} type The class of print that will be toggle.
     */
    toggle: function (type) {
        if (Array.isArray(type)) {
            type.forEach((t) => this.silenced[t] = (!this.silenced[t] | true));
        } else {
            this.silenced[type] = (!this.silenced[type] | true);
        }
    },
}