const express = require('express');
const router = express.Router();

// Define your API routes here

app = express();
port = 3001; // Port du server
module.exports = (app, dao) => {
    app.post("/api/users", async (req, res) => {
        const answer = dao.createUser(req.body);
        res.status(answer.code).json(answer.data);
    })
    app.post("/api/login", async (req, res) => {
        const answer = dao.LoginUser(req.body)
        res.status(answer.code).json(answer.data);
    })
    app.post("/api/check-email", async (req, res) => {
        const answer = dao.checkEmail(req.body);
        res.status(answer.code).json(answer.data);
    })
    app.put("/api/update-user-data", async (req, res) => {
        const answer = dao.updateUserData(req.body);
        res.status(answer.code).json(answer.data);
    });

    app.get("/api/userInfo", async (req, res) => {
        // Supposons que le token soit envoyé en tant que "Bearer <token>"
        const token = req.headers.authorization.split(" ")[1];
        answer = dao.userInfo(token);
        res.status(answer.code).json(answer.data);
    });

    app.get("/api/user-stats/:userId", async (req, res) => {
        const userId = req.params.userId;
        answer = dao.userStat(userId);
        res.status(answer.code).json(answer.data);
    })
};