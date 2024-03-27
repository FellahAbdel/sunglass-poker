// index.js
const mongoose = require("mongoose");
const UserModel = require("./User");
const StatModel = require("./stat");


module.exports = function (app) {

  // Connexion à la base de données MongoDB
  mongoose.connect("mongodb://pokerBackEndServer:azerty@127.0.0.1:27017/Poker", {
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


  //file to create a user
  app.get("/view/createUser", (req, res) => {
    const filepath = 'test.html';
    res.sendFile(filepath, { root: __dirname });
  })
  const dao = {
    CreateUser: async function (body) {
      try {
        const { pseudo, email, password } = body;

        // Vérification si le pseudo existe déjà
        const existingPseudo = await UserModel.findOne({ pseudo });
        if (existingPseudo) {
          return {error:true,code:400, data:{ error: "user_exists", field: "pseudo" }};
        }

        // Vérification si l'email existe déjà
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
          return {error:true,code:400, data:{ error: "user_exists", field: "email" }};
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

        return  {error:false,code:201,data:utilisateurEnregistre};
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        return {error:true, code:500,data:{error:"Erreur lors de la création de l'utilisateur"} };
      }
    },

    LoginUser: async function (body) {
      try {
        const { username, password } =body;
        const res = {error:true, code:400};
        // Recherche d'un utilisateur dans la base de données avec la combinaison pseudo/mot de passe
        const user = await UserModel.findOne({ pseudo: username, password });
        if (user) {
          // La combinaison de pseudo et de mot de passe est correcte

          // Envoyer toutes les informations de l'utilisateur dans la réponse
          res = {...res, data:{ success: true, message: "Login successful", userData: user }};
        } else {
          // La combinaison de pseudo et de mot de passe n'est pas correcte
          res= {...res,data:{ success: false, message: "Invalid credentials" }};
        }
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res= {...res,code:500,data:{ success: false, message: "Server error" }};
      }
      return res;
    },

    checkEmail: async function (body) {
      try {
        const { email } = body;
        const res = {error:true, code:400};
        // Recherche d'un utilisateur dans la base de données avec l'e-mail fourni
        const user = await UserModel.findOne({ email });

        if (user) {
          // L'e-mail existe dans la base de données
          res = {...res, data:{ exists: true, message: "E-mail exists in the database" }};
        } else {
          // L'e-mail n'existe pas dans la base de données
          res  ={...res,code:200,data:{exists: false,message: "E-mail does not exist in the database"}};
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'e-mail :", error);
        res =  {...res,code:500,data:{ error: "Server error" }};
      }
      return res;
    },

    updateUserData: async function(body) {
      try {
        const { field, value, identifierType, identifierValue } = body;
        const res = {error:true, code:400};

        // Mettez à jour le champ de l'utilisateur dans la base de données
        const updatedUser = await UserModel.findOneAndUpdate(
          { [identifierType]: identifierValue },
          { $set: { [field]: value } },
          { new: true }
        );

        if (updatedUser) {
          res = {...res,code:200, data:{success: true,message: `${field} updated successfully`}};
        } else {
          res = {...res,data:{ success: false, message: `Failed to update ${field}` }};
        }
      } catch (error) {
        console.error(`Error updating ${field}:`, error);
        res = {...res,code:500,data:{ success: false, message: "Server error" }};
      }
      return res;
    }

  }
  return dao;
}