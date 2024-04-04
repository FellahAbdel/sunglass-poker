const express = require("express");
const router = express.Router();

const verifyToken = require("./auth");

app = express();
port = 3001; // Port du server

module.exports = (app, dao) => {
  app.post("/api/users", async (req, res) => {
    try {
      const { pseudo, email, password } = req.body;
      const answer = await dao.createUser(pseudo, email, password);
      res.status(answer.code).json(answer.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const answer = await dao.loginUser(username, password);
      res.status(answer.code).json(answer.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/check-email", async (req, res) => {
    try {
      const { email } = req.body;
      const answer = await dao.checkEmail(email);
      res.status(answer.code).json(answer.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/update-user-data", verifyToken, async (req, res) => {
    try {
      const { userId, updateData } = req.body;
      const user = await dao.updateUserData(userId, updateData);
      res.json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // Ajout d'une route pour l'achat d'un item
  app.post("/api/buy-item", verifyToken, async (req, res) => {
    try {
      const { userId, itemId } = req.body;
      const item = await dao.buyItem(userId, itemId);
      res.json(item);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // Récupération des informations de l'utilisateur connecté
  app.get("/api/user-info", verifyToken, async (req, res) => {
    try {
      const userId = req.user.id; // L'ID de l'utilisateur est extrait du token JWT
      const user = await dao.getUserInfo(userId);
      res.json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
};
