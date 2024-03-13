db.createRole({
    role: "pokerServer",
    privileges : [
        { 
            resource: {db:"Poker", collection:""},
            actions: ["find", "update", "insert", "remove"]
        }
    ],
    roles: []
})


db.createUser({
    user: "pokerBackEndServer",
    pwd: "azerty",
    roles: ["pokerServer"]
})