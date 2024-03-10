module.exports = function(app, db) {
    //file to create a user
    app.get("/view/createUser", (req, res) => {
        const filepath = 'test.html';
        res.sendFile(filepath, { root: __dirname });
    })

    // Requête vide on n'envoit rien.
    app.get('/', (req, res) => {
        res.send('');
    });

    app.get('/createUser', (req, res) => {
        db.createUser(req, res);
    })

};
