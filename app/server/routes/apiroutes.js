const express = require("express");
const router = express.Router();

const verifyToken = require("./auth");

module.exports = (app, dao) => {
  // Création d'un nouvel utilisateur
  app.post("/api/users", async (req, res) => {
    try {
      const { pseudo, email, password } = req.body;
      const answer = await dao.createUser(pseudo, email, password);
      if (answer.error) {
        res.status(answer.code).json(answer.data);
      } else {
        res.status(201).json(answer);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Connexion de l'utilisateur
  app.post("/api/login", async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const result = await dao.loginUser(username, password);

      if (result.error) {
        res.status(result.code).json(result.data);
      } else {
        res.json({
          success: true,
          user: result.user,
          token: result.token,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vérification de l'existence d'un email
  app.post("/api/check-email", async (req, res, next) => {
    try {
      const { email } = req.body;
      const result = await dao.checkEmail(email);

      if (result.exists) {
        res.json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error during email check:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Mise à jour des données de l'utilisateur
  app.put("/api/update-user-data", verifyToken, async (req, res, next) => {
    try {
      const { field, value, identifierType, identifierValue } = req.body;
      const result = await dao.updateUserData(
        identifierType,
        identifierValue,
        field,
        value
      );

      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Achat d'un item par l'utilisateur
  app.post("/api/buy-item", verifyToken, async (req, res, next) => {
    try {
      const { itemId } = req.body;
      const userId = req.userId;

      const result = await dao.buyItem(userId, itemId);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error("Error buying item:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Récupération des informations de l'utilisateur connecté
  app.get("/api/userInfo", verifyToken, async (req, res, next) => {
    try {
      const userId = req.userId;
      const result = await dao.getUserInfo(userId);
      if (result.success) {
        res.json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/items", async (req, res) => {
    try {
      const result = await dao.getItems();
      if (result.success) {
        res.json(result.items);
      } else {
        res.status(500).json({ success: false, message: result.message });
      }
    } catch (error) {
      console.error("Error fetching items:", error.message);
      res.status(500).json({
        success: false,
        message: "Server error during item retrieval",
      });
    }
  });

  app.post("/api/activate-avatar", verifyToken, async (req, res, next) => {
    try {
      const { userId, itemId } = req.body;
      const result = await dao.activateAvatar(userId, itemId);

      if (result.success) {
        res.json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error activating avatar component:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
};
