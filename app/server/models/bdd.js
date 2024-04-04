// Importations nécessaires
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// Modèles Mongoose
const UserModel = require("./User");
const StatModel = require("./Stat");
const ItemModel = require("./Item");

// Initialisation des items (si nécessaire)
const initItems = require("./initItems");

require("dotenv").config();

module.exports = function (app) {
  // Connexion à la base de données MongoDB
  mongoose.connect(
    "mongodb://pokerBackEndServer:azerty@127.0.0.1:27017/Poker",
    {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    }
  );

  const db = mongoose.connection;

  db.on(
    "error",
    console.error.bind(console, "Erreur de connexion à la base de données:")
  );
  db.once("open", () => {
    console.log("Connecté à la base de données MongoDB");
    initItems();
  });

  const dao = {
    createUser: async (pseudo, email, password) => {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      try {
        // Vérification de l'unicité du pseudo et de l'email
        const existingUser = await UserModel.findOne({
          $or: [{ pseudo }, { email }],
        });
        if (existingUser) {
          throw new Error("Le pseudo ou l'email est déjà utilisé");
        }

        // Création et sauvegarde de l'utilisateur
        const newUser = new UserModel({
          pseudo,
          email,
          password: hashedPassword,
          itemsOwned: [defaultAvatar._id],
          avatar: [defaultAvatar._id],
        });
        const savedUser = await newUser.save();

        // Création et sauvegarde des statistiques de l'utilisateur
        const newStat = new StatModel({ user: savedUser._id });
        await newStat.save();

        return savedUser;
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error);
        throw error;
      }
    },

    loginUser: async (username, password) => {
      try {
        const user = await UserModel.findOne({ pseudo: username });
        if (!user) {
          throw new Error("Utilisateur non trouvé");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Mot de passe incorrect");
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return { user, token };
      } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        throw error;
      }
    },

    checkEmail: async (email) => {
      try {
        const user = await UserModel.findOne({ email });
        return !!user; // Renvoie true si l'utilisateur existe, sinon false
      } catch (error) {
        console.error("Erreur lors de la vérification de l'email:", error);
        throw error;
      }
    },

    updateUserData: async (userId, updateData) => {
      try {
        const user = await UserModel.findByIdAndUpdate(
          userId,
          { $set: updateData },
          { new: true }
        );
        return user;
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour des données de l'utilisateur:",
          error
        );
        throw error;
      }
    },

    buyItem: async (userId, itemId) => {
      try {
        const user = await UserModel.findById(userId);
        const item = await ItemModel.findById(itemId);

        if (!user || !item) {
          throw new Error("Utilisateur ou item introuvable");
        }

        // Vérifier si l'utilisateur possède déjà l'item
        if (user.itemsOwned.includes(item._id)) {
          throw new Error("L'item est déjà possédé");
        }

        // Ajouter l'item aux items possédés par l'utilisateur
        user.itemsOwned.push(item._id);
        await user.save();

        return item;
      } catch (error) {
        console.error("Erreur lors de l'achat de l'item:", error);
        throw error;
      }
    },
  };

  return dao;
};
