// index.js

const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./User");
const StatModel = require("./stat");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3001;

// Middleware pour le parsing des requêtes JSON
app.use(express.json());

// Utilisez le middleware cors
app.use(cors());

// Connexion à la base de données MongoDB
mongoose.connect("mongodb://localhost:27017/Poker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(console, "Erreur de connexion à la base de données :")
);
db.once("open", () => {
  console.log("Connecté à la base de données MongoDB");
});

app.post("/api/users", async (req, res) => {
  try {
    const { pseudo, email, password } = req.body;

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
  try {
    const { username, password } = req.body;

    // Recherche d'un utilisateur dans la base de données avec la combinaison pseudo/mot de passe
    const user = await UserModel.findOne({ pseudo: username, password });

    if (user) {
      // La combinaison de pseudo et de mot de passe est correcte
      console.log("Coins during login:", user.coins); // Ajoutez ce log

      // Envoyer toutes les informations de l'utilisateur dans la réponse
      res.json({ success: true, message: "Login successful", userData: user });
    } else {
      // La combinaison de pseudo et de mot de passe n'est pas correcte
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/check-email", async (req, res) => {
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

app.post("/api/reset-password", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Effectuer une requête pour mettre à jour le mot de passe dans la base de données
    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { $set: { password } },
      { new: true }
    );

    if (updatedUser) {
      res.json({ success: true, message: "Password reset successful" });
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
