// AuthProvider.js
/**
 * Manages user authentication state, including login, logout, and user data retrieval.
 * Provides functions for interacting with the authentication API endpoints.
 */
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { useWindowContext } from "./WindowContext";
import { userReducer, initialState } from "../../store/reducers/userReducer";

const AuthContext = createContext();
const CORSSETTINGS = {
  method: "POST",
  mode: "cors",
  origin: "http://localhost:10002",
  headers: {
    "Content-Type": "application/json",
  },
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { showHome, windowType } = useWindowContext();
  const { isLogged, user } = state;

  /**
   * Function to change avatar
   * @param {String} itemId
   * @param {String} itemType
   * @returns Boolean & Avatar infos
   */
  const activateAvatar = async (itemId, itemType) => {
    try {
      const response = await fetch(`api/activate-avatar`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ userId: user._id, itemId, itemType }),
      });
      const data = await response.json();
      if (data.success) {
        dispatch({ type: "UPDATE_USER_AVATAR", payload: { itemId, itemType } });
        fetchUserInfo();
        return true;
      } else {
        console.error("Failed to activate avatar component", data.message);
        return false;
      }
    } catch (error) {
      console.error("Error activating avatar component:", error);
      return false;
    }
  };

  /**
   * Function to buy an item
   * @param {String} itemId
   * @returns Boolean & User infos
   */
  const buyItem = async (itemId) => {
    try {
      const response = await fetch("api/buy-item", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          userId: user._id,
          itemId: itemId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        dispatch({ type: "UPDATE_USER", payload: data.user });
        fetchUserInfo();
        return true;
      } else {
        console.error(data.message);
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de l'achat de l'item :", error);
      return false;
    }
  };

  /**
   * Function to change user password
   * @param {String} email
   * @param {String} code
   * @param {String} newPassword
   * @returns Boolean & Error Message
   */
  const changePassword = async (email, code, newPassword) => {
    try {
      const response = await fetch("api/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        console.error("Error changing password:", data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error changing password:", error.message);
      return { success: false, message: "Network error or server is down" };
    }
  };

  /**
   * Function to check if an email exists in the database
   * @param {String} email
   * @returns Boolean | Error Message
   */
  const checkEmail = async (email) => {
    try {
      // Envoyer l'e-mail à l'utilisateur avec un lien pour réinitialiser le mot de passe
      const response = await fetch("api/check-email", {
        ...CORSSETTINGS,
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        return true;
      } else {
        console.error("Mail not found");
        return { error: data.error, field: data.field };
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du mail", error);
      return false;
    }
  };

  /**
   * Function to create a new game room
   * @param {String} serverName
   * @param {String} password
   * @param {String} rank
   * @param {String} masterInfo
   * @returns Game Id | Error
   */
  const createGameRoom = async (serverName, password, rank, masterInfo) => {
    try {
      const response = await fetch("api/games", {
        ...CORSSETTINGS,
        body: JSON.stringify({
          serverName,
          password,
          rank,
          master: masterInfo,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        return data._id;
      } else {
        console.error("Error creating game:", data.message);
        return { error: data.error, field: data.field };
      }
    } catch (error) {
      console.error("Error creating game:", error);
      return false;
    }
  };

  /**
   * Function to fetch items from the server
   * @returns Items infos
   */
  const fetchItems = async () => {
    try {
      const response = await fetch("api/items", {
        method: "GET",
      });
      let items = await response.json();
      if (response.ok) {
        items = items.map((item) => ({
          ...item,
          imgSrc: resolveImagePath(item.imgSrc),
        }));

        return items;
      } else {
        console.error("Erreur lors du chargement des items");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion à l'API:", error);
    }
  };

  /**
   * Function to fetch the rankings of the game
   * @param {int} pageNum
   * @param {int} nbResults
   * @returns Boolean & List of players
   */
  const fetchRankings = async (pageNum, nbResults = 10) => {
    try {
      const response = await fetch(
        `api/get-all-ranking?page=${pageNum}&nbres=${nbResults}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        rankings: data.data,
        hasMore: data.data.length === nbResults,
      };
    } catch (error) {
      console.error("Error fetching rankings:", error);
      return {
        success: false,
        message: error.message || "An error occurred while fetching rankings.",
      };
    }
  };

  /**
   * Function to fetch user information from the server
   * @returns Boolean & Error Message
   */
  const fetchUserInfo = useCallback(async () => {
    try {
      const authToken = sessionStorage.getItem("authToken");
      if (!authToken) {
        console.error("No auth token found");
        return;
      }

      const response = await fetch("api/userInfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "API responded with an error.");
      }

      const data = await response.json();

      if (data.success) {
        dispatch({
          type: "LOGIN",
          payload: {
            ...data.user,
          },
        });
      } else {
        console.error(
          "Impossible de récupérer les informations de l'utilisateur"
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de l'utilisateur :",
        error
      );
    }
  }, [dispatch]);

  /**
   * Function to retrieve authentication headers including the bearer token
   * @returns token
   */
  const getAuthHeaders = () => {
    const token = sessionStorage.getItem("authToken");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  let avatarInCache = new Map(
    JSON.parse(sessionStorage.getItem("avatarInCache")) || []
  );

  /**
   * Function to get avatar by ID
   * @param {String} userId
   * @param {Boolean} forced
   * @returns Avatar infos
   */
  const getAvatarById = async (userId, forced = false) => {
    userId = String(userId);
    if (!forced)
      if (avatarInCache.has(userId)) {
        let dataSet = avatarInCache.get(userId);
        if (dataSet !== null && dataSet !== undefined) {
          if (Date.now() - dataSet.lastUpdated <= 10000) {
            return dataSet.avatar;
          }
        }
      }

    try {
      const requestUrl = `api/avatar-info/${userId}`;

      const response = await fetch(requestUrl, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to fetch avatar:", errorText);
        throw new Error(errorText || "API responded with an error.");
      }

      const data = await response.json();

      if (data && data.baseAvatar && data.sunglasses && data.colorAvatar) {
        const avatarDataSet = {
          baseAvatar: {
            imgSrc: data.baseAvatar.imgSrc,
            eyePosition: data.baseAvatar.eyePosition,
          },
          sunglasses: {
            imgSrc: data.sunglasses.imgSrc,
          },
          colorAvatar: {
            imgSrc: data.colorAvatar.imgSrc,
          },
        };
        avatarInCache.set(userId, {
          avatar: avatarDataSet,
          lastUpdated: Date.now(),
        });
        sessionStorage.setItem("avatarInCache", avatarInCache);
        saveAvatarToCache();
        return avatarDataSet;
      } else {
        console.error("Data validation error: Missing required avatar fields.");
        throw new Error(
          "Data validation error: Missing required avatar fields."
        );
      }
    } catch (error) {
      console.error("Error fetching avatar:", error);
      return null;
    }
  };

  /**
   * Function to get available game rooms
   * @returns List of game rooms
   */
  const getAvailableRooms = async () => {
    try {
      const response = await fetch("api/availableRooms", {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        console.error("Failed to fetch rooms:", data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      return null;
    }
  };

  const getUserInfo = () => {
    return state.user;
  };

  /**
   * Function to retrieve room table records
   * @param {String} token
   * @returns Room Infos
   */
  const getRoomTableRecords = async (token) => {
    try {
      const response = await fetch("api/gameRoomDescription", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch roomTableRecords");
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Error fetching roomTableRecords:", error);
      return null;
    }
  };

  /**
   * Function to handle user login
   * @param {} credentials
   * @returns Boolean & Error Message
   */
  const login = async (credentials) => {
    try {
      const response = await fetch("api/login", {
        ...CORSSETTINGS,
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        // Si la réponse n'est pas un 2xx, gérer l'erreur
        const errorData = await response.json();
        console.error("Erreur de login:", errorData.message);
        return { error: errorData.message };
      }
      const data = await response.json();
      if (data.success) {
        sessionStorage.setItem("authToken", data.token); // Stocker le token en session
        dispatch({
          type: "LOGIN",
          payload: { ...data.userData, token: data.token },
        });
        fetchUserInfo(); // Charger les informations utilisateur
        return true;
      } else {
        console.error("Erreur de login:", data.message);
        return { error: data.message };
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      return false;
    }
  };

  /**
   * Function to put in cache the users avatar to save server requests
   */
  const saveAvatarToCache = () => {
    sessionStorage.setItem(
      "avatarInCache",
      JSON.stringify(Array.from(avatarInCache))
    );
  };

  // Effect to fetch user information on component mount or window type change
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    if (authToken) {
      fetchUserInfo();
      dispatch({
        type: "LOGIN",
        payload: {
          token: authToken,
        },
      });
    }
  }, [windowType, fetchUserInfo]);

  /**
   * Function to handle user logout
   */
  const logingOut = () => {
    dispatch({ type: "LOGOUT" });
    showHome();

    sessionStorage.removeItem("authToken"); // nettoyer le token
  };

  /**
   * Function to register a new user
   * @param {String} userData
   * @returns Boolean & Error Message
   */
  const registerUser = async (userData) => {
    try {
      const response = await fetch("api/users", {
        ...CORSSETTINGS,
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        return true;
      } else {
        console.error("Erreur lors de la création de l'utilisateur");
        return { error: data.error, field: data.field };
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
      return false;
    }
  };

  /**
   * Function to resolve image paths
   * @param {String} relativePath
   * @returns Resolved Image Path
   */
  const resolveImagePath = (relativePath) => {
    return `${process.env.PUBLIC_URL}${relativePath}`;
  };

  /**
   * Function to update user coins
   * @param {int} coinsToAdd
   * @returns Boolean & Updated Coins
   */
  const updateUserCoins = async (coinsToAdd) => {
    if (!state.isLogged || !user) {
      console.error("User not logged in.");
      return false;
    }

    try {
      const response = await fetch("api/update-coins", {
        ...CORSSETTINGS,
        headers: getAuthHeaders(),
        body: JSON.stringify({
          userId: user._id,
          coinsToAdd,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Failed to update coins:", data.message);
        return false;
      }
      dispatch({
        type: "UPDATE_USER_DATA",
        payload: { ...user, coins: data.updatedCoins },
      });

      return true;
    } catch (error) {
      console.error("Error updating user coins:", error);
      return false;
    }
  };

  /**
   * Function to update user data
   * @param {String} field
   * @param {*} value
   * @param {String} identifierType
   * @param {*} identifierValue
   * @returns New User Datas
   */
  const updateUserData = async (
    field,
    value,
    identifierType = "pseudo",
    identifierValue
  ) => {
    try {
      const isEmailIdentifier = identifierType === "email";
      if (!isEmailIdentifier && (!state.isLogged || !state.user)) {
        console.error("User not logged in.");
        return;
      }

      const identifierField = isEmailIdentifier ? "email" : "pseudo";
      const identifier = isEmailIdentifier
        ? identifierValue
        : state.user[identifierField];

      const response = await fetch("api/update-user-data", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          field,
          value,
          identifierType,
          identifierValue: identifier,
        }),
      });

      const data = await response.json();

      if (data.success) {
        dispatch({
          type: "UPDATE_USER_DATA",
          payload: { ...state.user, [field]: value },
        });
        return true;
      } else {
        console.error(`Failed to update ${field}:`, data.message);
        return { error: data.message };
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      return { error: error.message };
    }
  };

  /**
   * Function to verify game password entered by the user
   * @param {String} roomId
   * @param {String} password
   * @returns Boolean & Error Message
   */
  const verifyGamePassword = async (roomId, password) => {
    try {
      const response = await fetch(`api/verify-game-password`, {
        ...CORSSETTINGS,
        body: JSON.stringify({
          roomId,
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Password verification failed:", data.message);
        return { success: false, error: data.message };
      }

      return { success: data.success, roomId: data.roomId };
    } catch (error) {
      console.error("Error during password verification:", error);
      return { success: false, error: "Network error or server is down" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        user,
        userId: user ? user._id : null,
        login,
        createGameRoom,
        getRoomTableRecords,
        logingOut,
        getUserInfo,
        updateUserData,
        checkEmail,
        registerUser,
        state,
        dispatch,
        fetchItems,
        buyItem,
        activateAvatar,
        getAvatarById,
        updateUserCoins,
        getAvailableRooms,
        verifyGamePassword,
        fetchRankings,
        changePassword,
        fetchUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
