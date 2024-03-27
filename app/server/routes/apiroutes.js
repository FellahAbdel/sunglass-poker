const express = require('express');
const router = express.Router();

// Define your API routes here

app = express();
port = 3001; // Port du server
module.exports = (app,dao) =>  {  
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
    app.put("/api/update-user-data",async(req,res ) => {
        const answer = dao.updateUserData(req.body);
        res.status(answer.code).json(answer.data);
    });
};