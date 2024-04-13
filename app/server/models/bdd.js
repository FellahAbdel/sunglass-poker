// bdd.js
const mongoose = require("mongoose");
const UserModel = require("./User");
const StatModel = require("./Stat");
const ItemModel = require("./Item");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const initOrUpdateItems = require("./initItems");

require("dotenv").config();

const cors = require("cors");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.id;
    next();
  });
};

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
    //await UserModel.deleteMany({});
    //await StatModel.deleteMany({});

    initOrUpdateItems();
  });
  /*try {

    const users = await UserModel.find();
    console.log("Affichage des utilisateurs dans la base de données :");
    console.log(users); // Affichez le résultat dans la console
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
  
  }
});*/

  app.get("/view/createUser", async (req, res, next) => {
    const filepath = "test.html";
    res.sendFile(filepath, { root: __dirname });
  });

  app.post("/api/users", async (req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    try {
      console.log(req.body);
      const { pseudo, email, password } = req.body;
      // Hashage du mot de passe
      const hashedPassword = await bcrypt.hash(password, saltRounds);

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

      const defaultAvatar = await ItemModel.findOne({ name: "Sun" });
      if (!defaultAvatar) {
        return res
          .status(500)
          .json({ error: "Avatar par défaut introuvable." });
      }

      const defaultColor = await ItemModel.findOne({
        name: "white",
        category: "colorAvatar",
      });
      if (!defaultColor) {
        return res
          .status(500)
          .json({ error: "Couleur par défaut introuvable." });
      }

      const defaultSunglasses = await ItemModel.findOne({ name: "Nothing" });
      if (!defaultSunglasses) {
        return res
          .status(500)
          .json({ error: "Avatar par défaut introuvable." });
      }

      const nouveauUtilisateur = new UserModel({
        pseudo,
        email,
        password: hashedPassword,
        itemsOwned: [defaultAvatar._id, defaultColor._id, defaultSunglasses._id],
        baseAvatar: defaultAvatar._id,
        sunglasses: defaultSunglasses._id,
        colorAvatar: defaultColor._id,
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
      next(error);
    }
  });

  app.post("/api/login", async (req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ pseudo: username });

      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          console.log(`Login réussi pour l'utilisateur : ${username}`);
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          res.json({ success: true, token: token });
        } else {
          res.json({ success: false, message: "Invalid credentials" });
        }
      } else {
        res.json({ success: false, message: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/check-email", async (req, res, next) => {
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
      next(error);
    }
  });

  app.put("/api/update-user-data", verifyToken, async (req, res, next) => {
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
      next(error);
    }
  });

  app.get("/api/userInfo", verifyToken, async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.userId)
        .populate("baseAvatar")
        .populate("sunglasses")
        .populate("colorAvatar")
        .exec();

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Utilisateur non trouvé" });
      }

      // Construisez la réponse en utilisant les nouveaux champs
      const response = {
        success: true,
        user: {
          ...user._doc,
          baseAvatarImgSrc: user.baseAvatar ? user.baseAvatar.imgSrc : null,
          sunglassesImgSrc: user.sunglasses ? user.sunglasses.imgSrc : null,
          colorAvatar: user.colorAvatar ? user.colorAvatar.imgSrc : "#FFFFFF",
        },
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  });

  //route pour récupérer les statistiques d'un utilisateur
  app.get("/api/user-stats/:userId", verifyToken, async (req, res, next) => {
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
      next(error);
    }
  });

  app.post("/api/buy-item", verifyToken, async (req, res, next) => {
    const { itemId } = req.body;

    const userId = req.userId;

    try {
      // Trouver l'utilisateur par son ID
      const user = await UserModel.findById(userId);

      // Vérifier si l'utilisateur a assez de coins
      const item = await ItemModel.findById(itemId);
      if (user.coins < item.price) {
        return res
          .status(400)
          .json({ success: false, message: "Not enough coins" });
      }

      // Déduire le prix de l'item des coins de l'utilisateur
      user.coins -= item.price;

      // Ajouter l'item aux items possédés par l'utilisateur
      user.itemsOwned.push(itemId);

      // Sauvegarder les modifications de l'utilisateur
      await user.save();

      res
        .status(200)
        .json({ success: true, message: "Item bought successfully", user });
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/items", async (req, res) => {
    try {
      const items = await ItemModel.find();
      res.json(items);
    } catch (error) {
      console.error("Erreur lors de la récupération des items:", error);
      res.status(500).send("Erreur serveur lors de la récupération des items");
    }
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Server error" });
  });

  app.post("/api/activate-avatar", verifyToken, async (req, res, next) => {
    const { userId, itemId } = req.body;

    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const item = await ItemModel.findById(itemId);
      if (!item) {
        return res
          .status(404)
          .json({ success: false, message: "Item not found" });
      }

      const itemExists = user.itemsOwned.some((id) => id.toString() === itemId);
      if (!itemExists) {
        return res
          .status(404)
          .json({ success: false, message: "Item not owned" });
      }

      // Déterminer le itemType basé sur la catégorie de l'item
      let itemType;
      switch (item.category) {
        case "baseAvatar":
          itemType = "baseAvatar";
          user.baseAvatar = itemId;
          break;
        case "sunglasses":
          itemType = "sunglasses";
          user.sunglasses = itemId;
          break;
        case "colorAvatar":
          itemType = "colorAvatar";
          user.colorAvatar = itemId; // Supposant que vous stockez l'ID ou la valeur directement
          break;
        default:
          return res
            .status(400)
            .json({ success: false, message: "Invalid item category" });
      }

      await user.save();

      res.json({
        success: true,
        message: "Avatar component activated successfully",
        itemType: itemType,
        itemId: itemId,
      });
    } catch (error) {
      console.error("Error activating avatar component:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  return db;
};
