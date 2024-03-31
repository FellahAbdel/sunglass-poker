module.exports = (app, dao) => {
    app.post("/api/users", async (req, res) => {
        const answer = await dao.CreateUser(req.body);
        res.status(answer.code).json(answer.data);
    })
    app.post("/api/login", async (req, res) => {
        const answer = await dao.LoginUser(req.body);
        if(answer.user){
            req.session.user = answer.user;
            console.log(req.session.user);
            req.session.save();
        }
        res.status(answer.code).json(answer.data);
    })
    app.post("/api/check-email", async (req, res) => {
        const answer = await dao.checkEmail(req.body);
        res.status(answer.code).json(answer.data);
    })
    app.put("/api/update-user-data", async (req, res) => {
        const answer = await dao.updateUserData(req.body);
        res.status(answer.code).json(answer.data);
    });

    app.get("/api/userInfo", async (req, res) => {
        console.log("userInfo session : ",req.session);
        // Supposons que le token soit envoyé en tant que "Bearer <token>"
        const token = req.headers.authorization.split(" ")[1];
        answer = await dao.userInfo(token);
        res.status(answer.code).json(answer.data);
    });

    app.get("/api/user-stats/:userId", async (req, res) => {
        const userId = req.params.userId;
        answer = await dao.userStat(userId);
        res.status(answer.code).json(answer.data);
    })
};