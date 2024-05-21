const express = require("express");
const router = express.Router();

const store = require("../store/configStore");
const verifyToken = require("./auth");
const { count } = require("console");

module.exports = (app, dao, gameController) => {
  app.get("/api/rooms", (req, res) => {
    var roomsInfos = [];
    roomsInfos[0] = store.getState().game;
    for (var room in roomsInfos[0].rooms) {
      csl.log(roomsInfos[0].rooms[room]);
      roomsInfos[0].rooms[room].game.restartCall =
        roomsInfos[0].rooms[room].game.restartCall === false ? 0 : 1;
      roomsInfos[0].rooms[room].game.focusTurnCall =
        roomsInfos[0].rooms[room].game.focusTurnCall === false ? 0 : 1;
    }
    roomsInfos[1] = [];
    if (gameController !== undefined)
      for (var room in gameController.refresh) {
        csl.log(room);
        roomsInfos[1].push({
          refresh: gameController.refresh[room] !== undefined ? true : false,
        });
      }
    res.send(roomsInfos);
  });

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
      csl.error("Error during login:", error);
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
      csl.error("Error during email check:", error);
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
      csl.error("Error updating user data:", error);
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
      csl.error("Error buying item:", error);
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
      csl.error("Error fetching user information:", error);
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
      csl.error("Error fetching items:", error.message);
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
      csl.error("Error activating avatar component:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  app.get("/api/get-all-ranking/", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Default to page 1 if undefined
      const nbRes = parseInt(req.query.nbres) || 10; // Default to 10 results per page if undefined

      const result = await dao.getAllRanking(page, nbRes);
      res.send(result);
    } catch (error) {
      res
        .status(500)
        .send({ success: false, message: "Internal Server Error" });
    }
  });

  // Route to handle the creation of games
  app.post("/api/games", async (req, res) => {
    try {
      // Extract game data from the request body
      const { serverName, password, rank, master } = req.body;

      // Call the createGameDescription function from dao
      const result = await dao.createGameDescription(
        serverName,
        password,
        rank,
        master
      );

      // Check if there was an error during game creation
      if (result.error) {
        // Send an error response
        return res.status(result.code).json(result.data);
      }

      // Send a success response with the created game description
      res.status(result.code).json(result.data);
    } catch (error) {
      // Handle unexpected errors
      csl.error("Error creating game:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/gameRoomDescription", async (req, res) => {
    try {
      // Call the gameDescription function from dao
      const result = await dao.gameRoomDescription();

      // Check if there was an error fetching game descriptions
      if (result.error) {
        // Send an error response
        return res.status(result.code).json(result.data);
      }

      // Send a success response with the fetched game descriptions
      res.status(result.code).json(result.data);
    } catch (error) {
      // Handle unexpected errors
      csl.error("Error fetching game descriptions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/availableRooms", async (req, res) => {
    try {
      // Call the gameDescription function from dao
      const result = await dao.getAvailableGames();

      // Check if there was an error fetching game descriptions
      if (result.error) {
        // Send an error response
        return res.status(result.code).json(result.data);
      }

      // Send a success response with the fetched game descriptions
      res.status(result.code).json(result.data);
    } catch (error) {
      // Handle unexpected errors
      csl.error("Error fetching avaliable games:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/avatar-info/:userId", async (req, res) => {
    csl.log("UserID from URL:", req.params.userId);
    try {
      const userId = req.params.userId;
      const avatarData = await dao.getAvatarInfo(userId);
      if (avatarData) {
        res.json(avatarData);
      } else {
        res.status(404).json({ message: "Avatar information not found" });
      }
    } catch (error) {
      csl.error("Error fetching avatar information:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/update-coins", verifyToken, async (req, res) => {
    try {
      const { userId, coinsToAdd } = req.body;
      if (!userId || coinsToAdd === undefined) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      const result = await dao.updateUserCoins(userId, coinsToAdd);

      if (result.success) {
        res.json({
          success: true,
          updatedCoins: result.updatedCoins,
          message: "Coins updated successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to update coins",
        });
      }
    } catch (error) {
      csl.error("Error updating coins:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  app.post("/api/verify-game-password", async (req, res) => {
    try {
      const { roomId, password } = req.body;
      if (!roomId || !password) {
        return res.status(400).json({ error: "Missing room ID or password" });
      }
      const result = await dao.verifyGamePassword(roomId, password);

      if (result.success) {
        res.json({ success: true });
      } else {
        res.status(401).json({ success: false, error: "Incorrect password" });
      }
    } catch (error) {
      csl.error("Error verifying game password:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/change-password", async (req, res) => {
    try {
      const { email, code, newPassword } = req.body;
      const result = await dao.changePassword(email, code, newPassword);

      if (result.success) {
        res.json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      csl.error("Error changing password:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};
