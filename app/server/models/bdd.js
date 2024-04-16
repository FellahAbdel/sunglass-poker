// index.js
const mongoose = require("mongoose");
const UserModel = require("./User");
const StatModel = require("./Stat");
const GameDescriptionModel = require("./GameDescription");
const jwt = require("jsonwebtoken");

module.exports = function (app, bdd) {
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

  const dao = {
    CreateUser: async function (body) {
      try {
        const { pseudo, email, password } = body;

        // Vérification si le pseudo existe déjà
        const existingPseudo = await UserModel.findOne({ pseudo });
        if (existingPseudo) {
          return {
            error: true,
            code: 400,
            data: { error: "user_exists", field: "pseudo" },
          };
        }

        // Vérification si l'email existe déjà
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
          return {
            error: true,
            code: 400,
            data: { error: "user_exists", field: "email" },
          };
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

        return { error: false, code: 201, data: utilisateurEnregistre };
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        return {
          error: true,
          code: 500,
          data: { error: "Erreur lors de la création de l'utilisateur" },
        };
      }
    },

    LoginUser: async function (body) {
      const res = { error: true, code: 400 };
      try {
        const { username, password } = body;
        // Recherche d'un utilisateur dans la base de données avec la combinaison pseudo/mot de passe
        const user = await UserModel.findOne({ pseudo: username, password });
        if (user) {
          // La combinaison de pseudo et de mot de passe est correcte
          const token = jwt.sign({ id: user._id }, "secretKeyForSession", {
            expiresIn: "1h",
          });
          // Envoyer toutes les informations de l'utilisateur dans la réponse
          return {
            ...res,
            error: false,
            data: { success: true, message: "Login successful", token: token },
            user: user._id,
          };
        } else {
          // La combinaison de pseudo et de mot de passe n'est pas correcte
          return {
            ...res,
            data: { success: false, message: "Invalid credentials" },
          };
        }
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        return {
          ...res,
          code: 500,
          data: { success: false, message: "Server error" },
        };
      }
      return res;
    },

    checkEmail: async function (body) {
      try {
        const { email } = body;
        const res = { error: true, code: 400 };
        // Recherche d'un utilisateur dans la base de données avec l'e-mail fourni
        const user = await UserModel.findOne({ email });

        if (user) {
          // L'e-mail existe dans la base de données
          return {
            ...res,
            data: { exists: true, message: "E-mail exists in the database" },
          };
        } else {
          // L'e-mail n'existe pas dans la base de données
          return {
            ...res,
            error: false,
            code: 200,
            data: {
              exists: false,
              message: "E-mail does not exist in the database",
            },
          };
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'e-mail :", error);
        return { ...res, code: 500, data: { error: "Server error" } };
      }
      return res;
    },

    updateUserData: async function (body) {
      try {
        const { field, value, identifierType, identifierValue } = body;
        const res = { error: true, code: 400 };

        // Mettez à jour le champ de l'utilisateur dans la base de données
        const updatedUser = await UserModel.findOneAndUpdate(
          { [identifierType]: identifierValue },
          { $set: { [field]: value } },
          { new: true }
        );

        if (updatedUser) {
          return {
            ...res,
            error: false,
            code: 200,
            data: { success: true, message: `${field} updated successfully` },
          };
        } else {
          return {
            ...res,
            data: { success: false, message: `Failed to update ${field}` },
          };
        }
      } catch (error) {
        console.error(`Error updating ${field}:`, error);
        return {
          ...res,
          code: 500,
          data: { success: false, message: "Server error" },
        };
      }
      return res;
    },

    userInfo: async function (token) {
      const res = { error: true, code: 400 };
      try {
        const decoded = jwt.verify(token, "secretKeyForSession");
        const user = await UserModel.findById(decoded.id);
        if (!user) {
          return {
            ...res,
            code: 404,
            data: { success: false, message: "Utilisateur non trouvé" },
          };
        }
        return {
          ...res,
          error: false,
          code: 200,
          data: { success: true, user },
        };
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur :",
          error
        );
        return {
          ...res,
          code: 500,
          data: { success: false, message: "Erreur serveur" },
        };
      }
      return res;
    },

    //route pour récupérer les statistiques d'un utilisateur
    userStat: async function (userId) {
      res = { error: true, code: 400 };
      try {
        const stats = await StatModel.findOne({ user: userId }).populate(
          "user",
          "pseudo"
        );
        if (stats) {
          return {
            ...res,
            error: false,
            code: 200,
            data: { success: true, stats },
          };
        } else {
          return {
            ...res,
            code: 404,
            data: { success: false, message: "Stats not found" },
          };
        }
      } catch (error) {
        console.error("Error retrieving user stats:", error);
        return {
          ...res,
          code: 500,
          data: { success: false, message: "Server error" },
        };
      }
      return res;
    },

    createGameDescription: async function (serverName, password, rank) {
      try {
        const gameDescription = new GameDescriptionModel({
          serverName,
          password,
          rank,
        });
        await gameDescription.save();
        return { error: false, code: 200, data: gameDescription };
      } catch (error) {
        console.error("Error creating game description:", error);
        return {
          error: true,
          code: 500,
          data: { error: "Error creating game description" },
        };
      }
    },
  };

  return dao;
};
