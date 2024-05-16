// Necessary imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

// Mongoose models
const UserModel = require("./User");
const StatModel = require("./Stat");
const ItemModel = require("./Item");
const GameDescriptionModel = require("./GameDescription");

// Initialize items (if necessary)
const initItems = require("./initItems");
const resetServer = require("./resetServer");

const csl = require("../controller/intelligentLogging");
// csl.silenced('bdd');

require("dotenv").config();

module.exports = function (app, bdd) {
  // Logging database connection
  csl.log("bdd", "bdd!", bdd);

  // Connect to MongoDB database
  mongoose.connect("mongodb://pokerBackEndServer:azerty@" + bdd + "/Poker", {});

  const db = mongoose.connection;

  db.on(
    "error",
    console.error.bind(console, "Error connecting to the database:")
  );
  db.once("open", () => {
    // Log successful database connection
    csl.log("bdd", "Connected to MongoDB database");
    // Reset server state
    resetServer.emptyGameDesc();
    resetServer.resetPlayerInGame();
    // Initialize items
    initItems();
  });

  const dao = {
    createUser: async (pseudo, email, password) => {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      try {
        // Check uniqueness of pseudo and email
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

        // Function to find default items
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

        // Retrieve default items
        const defaultAvatar = await findDefaultItem("Sun");
        const defaultColor = await findDefaultItem("White", "colorAvatar");
        const defaultSunglasses = await findDefaultItem("Nothing");

        // Create user with default items
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

        // Create user statistics
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
        csl.error("bdd", "Error creating user:", error);
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
        // Find user by username
        const user = await UserModel.findOne({ pseudo: username });
        if (!user) {
          // If user not found, return error
          return {
            error: true,
            code: 404,
            data: { error: "user_not_found", message: "User not found" },
          };
        }

        // Compare password with hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // If password does not match, return error
          return {
            error: true,
            code: 401,
            data: {
              error: "invalid_credentials",
              message: "Invalid credentials",
            },
          };
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        // Return success response with user details and token
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
        // Handle error
        csl.error("bdd", "Error during login:", error);
        throw error;
      }
    },

    checkEmail: async (email) => {
      try {
        // Find user by email
        const user = await UserModel.findOne({ email });
        if (user) {
          // If user exists, return exists:true with a message
          return { exists: true, message: "E-mail exists in the database" };
        } else {
          // If user does not exist, return exists:false with a message
          return {
            exists: false,
            message: "E-mail does not exist in the database",
          };
        }
      } catch (error) {
        // Handle error
        csl.error("bdd", "Error during email check:", error);
        throw error;
      }
    },

    updateUserData: async (identifierType, identifierValue, field, value) => {
      try {
        // Find the user by the specified identifier and update the field with the new value
        const updatedUser = await UserModel.findOneAndUpdate(
          { [identifierType]: identifierValue },
          { $set: { [field]: value } },
          { new: true, runValidators: true }
        );
        if (updatedUser) {
          // If the user is updated successfully, return success:true with a message
          return { success: true, message: `${field} updated successfully` };
        } else {
          // If the user is not found, return success:false with a failure message
          return { success: false, message: `Failed to update ${field}` };
        }
      } catch (error) {
        // Handle error
        csl.error("bdd", "Error updating user data:", error);
        throw error;
      }
    },

    buyItem: async (userId, itemId) => {
      try {
        // Find the user by ID
        const user = await UserModel.findById(userId);
        if (!user) {
          // If user not found, return failure message
          return { success: false, message: "User not found" };
        }

        // Find the item by ID
        const item = await ItemModel.findById(itemId);
        if (!item) {
          // If item not found, return failure message
          return { success: false, message: "Item not found" };
        }

        // Check if user has enough coins to buy the item
        if (user.coins < item.price) {
          // If not enough coins, return failure message
          return { success: false, message: "Not enough coins" };
        }

        // Deduct the item price from user's coins
        user.coins -= item.price;

        // Add the item to the user's owned items
        user.itemsOwned.push(item._id);

        // Save the updated user
        await user.save();

        // Return success message along with updated user information
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
        // Handle error
        csl.error("bdd", "Error buying item:", error);
        throw error;
      }
    },

    getUserInfo: async (userId) => {
      // Log fetching info for the user ID
      csl.log("bdd", "Fetching info for user ID:", userId);
      try {
        // Find the user by ID and populate avatar, sunglasses, and colorAvatar fields
        const user = await UserModel.findById(userId)
          .populate("baseAvatar")
          .populate("sunglasses")
          .populate("colorAvatar")
          .exec();

        if (!user) {
          // Log if no user is found
          csl.log("bdd", "No user found with ID:", userId);
          return { success: false, message: "Utilisateur non trouvé" };
        }

        // Return user information with additional fields for avatar images and inGame status
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
        // Log and throw error if fetching user information fails
        csl.error("bdd", "Error fetching user information:", error);
        throw error;
      }
    },

    getItems: async () => {
      try {
        // Find all items in the database
        const items = await ItemModel.find();
        // Return success message along with the list of items
        return { success: true, items: items };
      } catch (error) {
        // Log and throw error if fetching items fails
        csl.error("bdd", "Error fetching items:", error);
        throw new Error("Error fetching items from the database");
      }
    },

    activateAvatar: async (userId, itemId) => {
      try {
        // Find the user by ID
        const user = await UserModel.findById(userId);
        if (!user) {
          // Return error message if user is not found
          return { success: false, message: "User not found" };
        }

        // Find the item by ID
        const item = await ItemModel.findById(itemId);
        if (!item) {
          // Return error message if item is not found
          return { success: false, message: "Item not found" };
        }

        // Check if the user owns the item
        const itemExists = user.itemsOwned.some(
          (id) => id.toString() === itemId
        );
        if (!itemExists) {
          // Return error message if item is not owned by the user
          return { success: false, message: "Item not owned" };
        }

        let itemType;
        switch (item.category) {
          case "baseAvatar":
            // Set baseAvatar if the item category is baseAvatar
            itemType = "baseAvatar";
            user.baseAvatar = itemId;
            break;
          case "sunglasses":
            // Set sunglasses if the item category is sunglasses
            itemType = "sunglasses";
            user.sunglasses = itemId;
            break;
          case "colorAvatar":
            // Set colorAvatar if the item category is colorAvatar
            itemType = "colorAvatar";
            user.colorAvatar = itemId;
            break;
          default:
            // Return error message for invalid item category
            return { success: false, message: "Invalid item category" };
        }

        // Save the updated user data
        await user.save();

        // Return success message along with activated avatar component information
        return {
          success: true,
          message: "Avatar component activated successfully",
          itemType: itemType,
          itemId: itemId,
        };
      } catch (error) {
        // Log and throw error if activating avatar component fails
        csl.error("bdd", "Error activating avatar component:", error);
        throw error;
      }
    },

    getAllRanking: async (page, nbRes) => {
      try {
        // Find all users, sort them by coins in descending order, paginate the results,
        // and select only pseudo and coins fields
        const users = await UserModel.find()
          .sort({ coins: -1 }) // Sort users by coins in descending order
          .skip((page - 1) * nbRes) // Skip documents based on pagination
          .limit(nbRes) // Limit the number of documents per page
          .select({ pseudo: 1, coins: 1 }); // Select only pseudo and coins fields

        // Return success message along with the data (users)
        return { success: true, data: users };
      } catch (err) {
        // Log and return error message if fetching rankings fails
        console.error("Error fetching rankings:", err);
        return { success: false, error: err };
      }
    },

    /*
    getAllRanking: async (page, nbRes) => {
      try {
        const users = await UserModel.aggregate([
          {
            $lookup: {
              from: "Stat", // Assurez-vous que le nom de la collection est correct
              pipeline: [{ $project: { maxGain: 1 } }],
              as: "gain",
            },
          },
          {
            $sort: { gain: -1 },
          },
          {
            $project: { pseudo: 1, gain: 1 },
          },
          {
            $skip: (page - 1) * nbRes,
          },
          {
            $limit: nbRes,
          },
        ]);
        return { success: true, data: users };
      } catch (err) {
        console.error("Error fetching rankings:", err);
        return { success: false, error: err }; // rethrow the error after logging
      }
    },*/

    getAvatarInfo: async (userId) => {
      try {
        // Find the user by ID and populate avatar-related fields with necessary information
        const user = await UserModel.findById(userId)
          .populate({
            path: "baseAvatar",
            select: "imgSrc eyePosition", // Only fetching necessary fields
          })
          .populate({
            path: "sunglasses",
            select: "imgSrc",
          })
          .populate({
            path: "colorAvatar",
            select: "imgSrc",
          })
          .exec();

        // If user not found, log and return null
        if (!user) {
          console.log("No user found with ID:", userId);
          return null;
        }

        // Return avatar information including baseAvatar, sunglasses, and colorAvatar
        return {
          baseAvatar: user.baseAvatar
            ? {
                imgSrc: user.baseAvatar.imgSrc,
                eyePosition: user.baseAvatar.eyePosition,
              }
            : null,
          sunglasses: user.sunglasses
            ? {
                imgSrc: user.sunglasses.imgSrc,
              }
            : null,
          colorAvatar: user.colorAvatar
            ? {
                imgSrc: user.colorAvatar.imgSrc,
              }
            : null,
        };
      } catch (error) {
        // Log and throw error if fetching avatar information fails
        console.error("Error fetching avatar information:", error);
        throw error;
      }
    },

    createGameDescription: async function (
      serverName,
      roomPassword,
      rank,
      master = 0
    ) {
      try {
        // Check if a game with the same serverName exists, if so, delete it
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

        // Create a new game description with provided parameters
        const gameDescription = new GameDescriptionModel({
          serverName,
          roomPassword,
          rank,
          players: master === 0 ? [] : [master], // If master provided, add to players array
        });

        // Save the new game description
        await gameDescription.save();

        // Return success message with the created game description
        return { error: false, code: 200, data: gameDescription };
      } catch (error) {
        // Log and return error message if creating game description fails
        csl.error("bdd", "Error creating game description:", error);
        return {
          error: true,
          code: 500,
          data: { error: "Error creating game description" },
        };
      }
    },

    addOnePlayerGameDesc: async function (gameId, userId) {
      // Log the addition of a player to a game
      csl.log("bdd", "add a player in game bdd");

      // Find the game description by ID and add the player's ID to the players array
      const gameDesc = await GameDescriptionModel.findById(gameId);
      gameDesc.players.push(userId);
      await gameDesc.save();

      // Log the update of the inGame status for the player
      csl.log("bdd", "update the inGame status of the player");

      // Find the user by ID and update their inGame status to gameId
      const user = await UserModel.findById(userId);
      console.log(userId, user);
      user.inGame = gameId;
      await user.save();
    },

    removeGameDesc: async function (gameId) {
      // Find and delete the game description by ID
      await GameDescriptionModel.findByIdAndDelete(gameId);
    },

    updateGameDescription: async function (
      identifierType,
      identifierValue,
      field,
      value
    ) {
      try {
        // Find and update the game description based on identifierType and identifierValue
        const updatedGameDesc = await GameDescriptionModel.findOneAndUpdate(
          { [identifierType]: identifierValue },
          { $set: { [field]: value } },
          { new: true, runValidators: true }
        );

        // Check if the update was successful and return a success message
        if (updatedGameDesc) {
          return { success: true, message: `${field} updated successfully` };
        } else {
          return { success: false, message: `Failed to update ${field}` };
        }
      } catch (error) {
        // Log and throw error if updating game description fails
        csl.error("bdd", "Error updating game description:", error);
        throw error;
      }
    },

    playerLeftGame: async function (id) {
      try {
        // Find the user by ID
        const user = await UserModel.findById(id);

        // Find the game description by user's inGame ID
        const gameDesc = await GameDescriptionModel.findById(user.inGame);

        // If game description exists, remove the player's ID from the players array
        if (gameDesc !== null) {
          gameDesc.players = gameDesc.players.filter((p) => p === id);
          await gameDesc.save();
        }

        // Reset the user's inGame status to null
        user.inGame = null;
        console.log(user, " removing user in game");
        await user.save();
      } catch (err) {
        // Log error if player leaving game encounters an error
        csl.error("bdd", "Error with player left game:", err);
      }
    },

    gameRoomDescription: async function () {
      try {
        // Fetch all game descriptions from the database
        const gameDescriptions = await GameDescriptionModel.find({});
        // Return fetched game descriptions along with success status code 200
        return { error: false, code: 200, data: gameDescriptions };
      } catch (error) {
        // Log and return error if fetching game descriptions fails
        csl.error("bdd", "Error fetching game descriptions:", error);
        return {
          error: true,
          code: 500,
          data: { error: "Error fetching game descriptions" },
        };
      }
    },

    updateUserCoins: async (userId, coinsToAdd) => {
      try {
        // Find user by ID
        const user = await UserModel.findById(userId);
        if (!user) {
          return { success: false, message: "User not found" };
        }
        // Update user's coins by adding coinsToAdd
        user.coins += coinsToAdd;
        await user.save();
        // Return success message along with updated coins count
        return {
          success: true,
          updatedCoins: user.coins,
          message: "Coins updated successfully",
        };
      } catch (error) {
        // Log and return error if updating user coins fails
        console.error("Error updating user coins:", error);
        return { success: false, message: "Failed to update user coins" };
      }
    },

    getUserPseudoFromUserId: async (userId) => {
      try {
        // Find user by ID and return their pseudo (username)
        const user = await UserModel.findOne({ _id: userId });
        if (user) {
          return user.pseudo; // Assuming user.userName is the field containing the user's name
        } else {
          throw new Error(`User with ID ${userId} not found`);
        }
      } catch (error) {
        // Log and throw error if retrieving user data fails
        csl.error("bdd", "Error retrieving user data:", error);
        throw error;
      }
    },

    getAvailableGames: async function () {
      try {
        // Fetch all available games with status "WAITING" from the database
        const availableGames = await GameDescriptionModel.find({
          status: "WAITING",
        });
        // Return fetched available games along with success status code 200
        return { code: 200, data: availableGames };
      } catch (error) {
        // Return error along with error status code 500 if fetching available games fails
        return { code: 500, error: error.message };
      }
    },

    getServerNameFromGameId: async function (gameId) {
      csl.log('getServerNameFromGameId',"Argument gameId: ",gameId);
      if(gameId.gameRoomId !== undefined)
        gameId = gameId.gameRoomId;
      try {
        gameRecord = await GameDescriptionModel.findOne({ _id: gameId });
        if (gameRecord) {
          return gameRecord.serverName;
        } else {
          throw new Error(`Game with ID ${gameId} not found`);
        }
      } catch (error) {
        // Log and throw error if retrieving game data fails
        csl.error("bdd", "Error retrieving game data:", error);
        throw error;
      }
    },

    updateStatusToInProgress: async function (roomId) {
      try {
        // Find and update the game description's status to "IN_PROGRESS" by room ID
        const updatedRoom = await GameDescriptionModel.findOneAndUpdate(
          { _id: roomId },
          { $set: { status: "IN_PROGRESS" } },
          { new: true, runValidators: true }
        );
        // Return success message if update is successful
        if (updatedRoom) {
          return {
            success: true,
            message: "Status updated to IN_PROGRESS successfully",
          };
        } else {
          return {
            success: false,
            message: "Failed to update status to IN_PROGRESS",
          };
        }
      } catch (error) {
        // Log and throw error if updating status to IN_PROGRESS fails
        console.error("Error updating status to IN_PROGRESS:", error);
        throw error;
      }
    },
  };
  dao.verifyGamePassword = async (roomId, password) => {
    try {
      const gameDescription = await GameDescriptionModel.findById(roomId);
      if (!gameDescription) {
        return { success: false, error: "Game room not found" };
      }

      const match = await bcrypt.compare(
        password,
        gameDescription.roomPassword
      );
      if (match) {
        return { success: true };
      } else {
        return { success: false, error: "Incorrect password" };
      }
    } catch (error) {
      console.error("Error verifying game password:", error);
      return { success: false, error: "Internal server error" };
    }
  };

  return dao;
};
