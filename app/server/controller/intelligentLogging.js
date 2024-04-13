module.exports = csl = {
    silenced: [],
    log: function (type, ...data) {
        if (!this.silenced[type]) {
            console.log("\n\n[@" + type + "@] : ------------\n ");
            console.log(...data);
            console.log("\n------------ [-" + type + "-]\n");
        }
    },
    table: function (type, ...data) {
        if (!this.silenced[type]) {
            console.log("\n\n[@" + type + "@] : ------------\n ");
            console.table( ...data);
            console.log("\n------------ [-" + type + "-]\n");
        }
    },
    error: function (type, ...data) {
        if (!this.silenced[type]) {
            console.log("\n\n[@" + type + "@] : ------------\n ");
            console.error( ...data);
            console.log("\n------------ [-" + type + "-]\n");
        }
    },
    silenced: function (type) {
        if(Array.isArray(type)){
            type.forEach((t) => this.silenced[t] = true);
        }else {   
            this.silenced[type] = true;
        }
    },
    toggle: function (type) {
        if(Array.isArray(type)){
            type.forEach((t) => this.silenced[t] = (!this.silenced[t] | true));
        }else {   
            this.silenced[type] = (!this.silenced[type] | true);
        }
    },
}