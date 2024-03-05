// index.js

const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./User");
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

// Exemple d'ajout d'un utilisateur et de récupération de tous les utilisateurs
const nouveauUtilisateur = new UserModel({
  pseudo: "john_doe",
  email: "john.doe@example.com",
  password: "motDePasseSecret",
  coins: 100,
});

nouveauUtilisateur
  .save()
  .then((result) => {
    console.log("Utilisateur enregistré avec succès :", result);

    // Récupérer tous les utilisateurs
    return UserModel.find({});
  })
  .then((users) => {
    console.log("Utilisateurs existants :", users);
  })
  .catch((error) => {
    console.error("Erreur :", error);
  });

app.post("/api/users", async (req, res) => {
  try {
    const { pseudo, email, password, coins } = req.body;

    // Création d'un nouvel utilisateur
    const nouveauUtilisateur = new UserModel({
      pseudo,
      email,
      password,
      coins,
    });

    // Enregistrement dans la base de données
    const utilisateurEnregistre = await nouveauUtilisateur.save();

    res.status(201).json(utilisateurEnregistre);
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'utilisateur" });
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
