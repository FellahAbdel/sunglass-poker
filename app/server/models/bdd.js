// index.js
const mongoose = require("mongoose");
const UserModel = require("./User");
const StatModel = require("./Stat");
const jwt = require("jsonwebtoken");

const cors = require("cors");

module.exports = function (app ,bdd) {
  console.log(bdd);
  // Connexion à la base de données MongoDB
  mongoose.connect("mongodb://pokerBackEndServer:azerty@" + bdd + "/Poker", {});
  const db = mongoose.connection;

  db.on(
    "error",
    console.error.bind(console, "Erreur de connexion à la base de données :")
  );
  db.once("open", async () => {
    console.log("Connecté à la base de données MongoDB");
  });

  //file to create a user
  app.get("/view/createUser", (req, res) => {
    const filepath = "test.html";
    res.sendFile(filepath, { root: __dirname });
  });

  app.post("/api/users", async (req, res) => {
    res.header("Access-Control-Allow-Credentials", "true");
    try {
      console.log(req.body);
      const { pseudo, email, password } = req.body;

      // Vérification si le pseudo existe déjà
      const existingPseudo = await UserModel.findOne({ pseudo });
      if (existingPseudo) {
        return res.status(400).json({ error: "user_exists", field: "pseudo" });
      }

      // Vérification si l'email existe déjà
      const existingEmail = await UserModel.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: "user_exists", field: "email" });
      }

      // Création d'un nouvel utilisateur
      const nouveauUtilisateur = new UserModel({
        pseudo,
        email,
        password,
      });

      // Enregistrement dans la base de données
      const utilisateurEnregistre = await nouveauUtilisateur.save();

      // Création d'une nouvelle instance de Stat
      const nouvelleStat = new StatModel({
        maxCoins: 0,
        maxGain: 0,
        totalGain: 0,
        experience: 0,
        user: utilisateurEnregistre._id, // Associez l'ID de l'utilisateur
      });

      // Enregistrement de la statistique dans la base de données
      await nouvelleStat.save();

      // Mettre à jour la propriété 'stat' de l'utilisateur avec l'ID de la nouvelle stat
      utilisateurEnregistre.stat = nouvelleStat._id;
      await utilisateurEnregistre.save();

      res.status(201).json(utilisateurEnregistre);
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la création de l'utilisateur" });
    }
  });

  app.post("/api/login", async (req, res) => {
    res.header("Access-Control-Allow-Credentials", "true");
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ pseudo: username, password });

      if (user) {
        console.log(`Login réussi pour l'utilisateur : ${username}`);
        req.session.userId = user._id;
        console.log("reqsesid:",req.session.userId);
        const token = jwt.sign({ id: user._id }, "votre_secret", {
          expiresIn: "1h",
        });
        res.json({ success: true, token: token });
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  app.post("/api/check-email", async (req, res) => {
    
    res.header("Access-Control-Allow-Credentials", "true");

    try {
      const { email } = req.body;

      // Recherche d'un utilisateur dans la base de données avec l'e-mail fourni
      const user = await UserModel.findOne({ email });

      if (user) {
        // L'e-mail existe dans la base de données
        res.json({ exists: true, message: "E-mail exists in the database" });
      } else {
        // L'e-mail n'existe pas dans la base de données
        res.json({
          exists: false,
          message: "E-mail does not exist in the database",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'e-mail :", error);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.put("/api/update-user-data", async (req, res) => {
    res.header("Access-Control-Allow-Credentials", "true");
    try {
      const { field, value, identifierType, identifierValue } = req.body;

      // Mettez à jour le champ de l'utilisateur dans la base de données
      const updatedUser = await UserModel.findOneAndUpdate(
        { [identifierType]: identifierValue },
        { $set: { [field]: value } },
        { new: true }
      );

      if (updatedUser) {
        return res.json({
          success: true,
          message: `${field} updated successfully`,
        });
      } else {
        return res.json({
          success: false,
          message: `Failed to update ${field}`,
        });
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  });

  app.get("/api/userInfo", async (req, res) => {
    
    const token = req.headers.authorization.split(" ")[1]; // Supposons que le token soit envoyé en tant que "Bearer <token>"
    try {
      const decoded = jwt.verify(token, "votre_secret");
      const user = await UserModel.findById(decoded.id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Utilisateur non trouvé" });
      }
      res.json({ success: true, user });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de l'utilisateur :",
        error
      );
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  });

  //route pour récupérer les statistiques d'un utilisateur
  app.get("/api/user-stats/:userId", async (req, res) => {
    console.log("user:",req.session);
    try {
      const userId = req.params.userId;
      const stats = await StatModel.findOne({ user: userId }).populate(
        "user",
        "pseudo"
      );
      if (stats) {
        res.json({ success: true, stats });
      } else {
        res.status(404).json({ success: false, message: "Stats not found" });
      }
    } catch (error) {
      console.error("Error retrieving user stats:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  return db;
};
