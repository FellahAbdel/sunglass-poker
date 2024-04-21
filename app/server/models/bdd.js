// Importations nécessaires
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

// Modèles Mongoose
const UserModel = require("./User");
const StatModel = require("./Stat");
const ItemModel = require("./Item");
const GameDescriptionModel = require("./GameDescription");

// Initialisation des items (si nécessaire)
const initItems = require("./initItems");
const emptyGames = require("./emptyGameDescription");

require("dotenv").config();

module.exports = function (app, bdd) {
  console.log("bdd!", bdd);

  // Connexion à la base de données MongoDB
  mongoose.connect("mongodb://pokerBackEndServer:azerty@" + bdd + "/Poker", {});

  const db = mongoose.connection;

  db.on(
    "error",
    console.error.bind(console, "Erreur de connexion à la base de données:")
  );
  db.once("open", () => {
    console.log("Connecté à la base de données MongoDB");
    emptyGames();
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
          return {
            error: true,
            code: 400,
            data: {
              error: "user_exists",
              field: existingUser.pseudo === pseudo ? "pseudo" : "email",
            },
          };
        }

        // Fonction pour trouver les items par défaut
        async function findDefaultItem(name, category = null) {
          const query = category
            ? { "names.en": name, category }
            : { "names.en": name };
          const item = await ItemModel.findOne(query);
          if (!item) {
            throw new Error(`Default item not found: ${name}`);
          }
          return item;
        }

        // Récupération des items par défaut
        const defaultAvatar = await findDefaultItem("Sun");
        const defaultColor = await findDefaultItem("White", "colorAvatar");
        const defaultSunglasses = await findDefaultItem("Nothing");

        // Création de l'utilisateur avec les items par défaut
        const newUser = new UserModel({
          pseudo,
          email,
          password: hashedPassword,
          itemsOwned: [
            defaultAvatar._id,
            defaultColor._id,
            defaultSunglasses._id,
          ],
          baseAvatar: defaultAvatar._id,
          sunglasses: defaultSunglasses._id,
          colorAvatar: defaultColor._id,
          inGame: null,
        });
        const savedUser = await newUser.save();

        // Création des statistiques de l'utilisateur
        const newStat = new StatModel({
          maxCoins: 0,
          maxGain: 0,
          totalGain: 0,
          experience: 0,
          user: savedUser._id,
        });
        await newStat.save();
        savedUser.stat = newStat._id;
        await savedUser.save();

        return savedUser;
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error);
        if (error.message.startsWith("Default item not found")) {
          return {
            error: true,
            code: 404,
            data: { error: "item_not_found", message: error.message },
          };
        }
        throw error;
      }
    },

    loginUser: async (username, password) => {
      try {
        const user = await UserModel.findOne({ pseudo: username });
        if (!user) {
          return {
            error: true,
            code: 404,
            data: { error: "user_not_found", message: "User not found" },
          };
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return {
            error: true,
            code: 401,
            data: {
              error: "invalid_credentials",
              message: "Invalid credentials",
            },
          };
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return {
          success: true,
          user: {
            id: user._id,
            pseudo: user.pseudo,
            email: user.email,
            inGame: user.inGame,
          },
          token: token,
        };
      } catch (error) {
        console.error("Error during login:", error);
        throw error;
      }
    },

    checkEmail: async (email) => {
      try {
        const user = await UserModel.findOne({ email });
        if (user) {
          return { exists: true, message: "E-mail exists in the database" };
        } else {
          return {
            exists: false,
            message: "E-mail does not exist in the database",
          };
        }
      } catch (error) {
        console.error("Error during email check:", error);
        throw error;
      }
    },

    updateUserData: async (identifierType, identifierValue, field, value) => {
      try {
        const updatedUser = await UserModel.findOneAndUpdate(
          { [identifierType]: identifierValue },
          { $set: { [field]: value } },
          { new: true, runValidators: true }
        );
        if (updatedUser) {
          return { success: true, message: `${field} updated successfully` };
        } else {
          return { success: false, message: `Failed to update ${field}` };
        }
      } catch (error) {
        console.error("Error updating user data:", error);
        throw error;
      }
    },

    buyItem: async (userId, itemId) => {
      try {
        const user = await UserModel.findById(userId);
        if (!user) {
          return { success: false, message: "User not found" };
        }

        const item = await ItemModel.findById(itemId);
        if (!item) {
          return { success: false, message: "Item not found" };
        }

        if (user.coins < item.price) {
          return { success: false, message: "Not enough coins" };
        }

        user.coins -= item.price;

        user.itemsOwned.push(item._id);

        await user.save();

        return {
          success: true,
          message: "Item bought successfully",
          user: {
            id: user._id,
            coins: user.coins,
            itemsOwned: user.itemsOwned,
          },
        };
      } catch (error) {
        console.error("Error buying item:", error);
        throw error;
      }
    },

    getUserInfo: async (userId) => {
      console.log("Fetching info for user ID:", userId);
      try {
        const user = await UserModel.findById(userId)
          .populate("baseAvatar")
          .populate("sunglasses")
          .populate("colorAvatar")
          .exec();

        if (!user) {
          console.log("No user found with ID:", userId); // Log if no user is found
          return { success: false, message: "Utilisateur non trouvé" };
        }

        return {
          success: true,
          user: {
            ...user._doc,
            pseudo: user.pseudo,
            baseAvatarImgSrc: user.baseAvatar ? user.baseAvatar.imgSrc : null,
            sunglassesImgSrc: user.sunglasses ? user.sunglasses.imgSrc : null,
            colorAvatarImgSrc: user.colorAvatar
              ? user.colorAvatar.imgSrc
              : "#FFFFFF",
            inGame: user.inGame,
          },
        };
      } catch (error) {
        console.error("Error fetching user information:", error);
        throw error;
      }
    },

    getItems: async () => {
      try {
        const items = await ItemModel.find();
        return { success: true, items: items };
      } catch (error) {
        console.error("Error fetching items:", error);
        throw new Error("Error fetching items from the database");
      }
    },

    activateAvatar: async (userId, itemId) => {
      try {
        const user = await UserModel.findById(userId);
        if (!user) {
          return { success: false, message: "User not found" };
        }

        const item = await ItemModel.findById(itemId);
        if (!item) {
          return { success: false, message: "Item not found" };
        }

        const itemExists = user.itemsOwned.some(
          (id) => id.toString() === itemId
        );
        if (!itemExists) {
          return { success: false, message: "Item not owned" };
        }

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
            user.colorAvatar = itemId;
            break;
          default:
            return { success: false, message: "Invalid item category" };
        }

        await user.save();

        return {
          success: true,
          message: "Avatar component activated successfully",
          itemType: itemType,
          itemId: itemId,
        };
      } catch (error) {
        console.error("Error activating avatar component:", error);
        throw error;
      }
    },

    createGameDescription: async function (
      serverName,
      roomPassword,
      rank,
      master
    ) {
      try {
        const existingGame = await GameDescriptionModel.findOne({ serverName });
        if (existingGame) {
          await GameDescriptionModel.deleteOne({ serverName });
        }
        //   return {
        //     error: true,
        //     code: 400,
        //     data: { error: "game_exists",
        //     field: "game",
        //     message: "Game name already exists" },
        //   };
        // }

        const gameDescription = new GameDescriptionModel({
          serverName,
          roomPassword,
          rank,
          players: [master],
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

    addOnePlayerGameDesc: async function (gameId, userId) {
      try {
        console.log("add a player in game bdd");
        const gameDesc = await GameDescriptionModel.findOne({ _id: gameId });
        gameDesc.players.push(userId);
        gameDesc.save();
      } catch (err) {
        console.error("dao", err);
      }
    },

    updateGameDescription: async function (
      identifierType,
      identifierValue,
      field,
      value
    ) {
      try {
        const updatedGameDesc = await GameDescriptionModel.findOneAndUpdate(
          { [identifierType]: identifierValue },
          { $set: { [field]: value } },
          { new: true, runValidators: true }
        );
        if (updatedGameDesc) {
          return { success: true, message: `${field} updated successfully` };
        } else {
          return { success: false, message: `Failed to update ${field}` };
        }
      } catch (error) {
        console.error("Error updating user data:", error);
        throw error;
      }
    },

    playerLeftGame: async function (id){
      try{
        const user = await UserModel.find({_id,id});
        user.inGame = null;
        await user.save();
      }catch(err){
        console.error('erreur avec player Left game',err  );
      }
    },

    gameRoomDescription: async function () {
      try {
        const gameDescriptions = await GameDescriptionModel.find({});
        return { error: false, code: 200, data: gameDescriptions };
      } catch (error) {
        console.error("Error fetching game descriptions:", error);
        return {
          error: true,
          code: 500,
          data: { error: "Error fetching game descriptions" },
        };
      }
    },
  };

  return dao;
};
