// AuthProvider.js
import React, { createContext, useContext, useEffect, useReducer } from "react";
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
  const { showHome } = useWindowContext();
  const { isLogged, user } = state;

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken"); // Ou localStorage selon votre préférence
    if (authToken) {
      fetchUserInfo(authToken); // Récupérer les informations de l'utilisateur à partir du token
      dispatch({
        type: "LOGIN",
        payload: {
          token: authToken,
        },
      });
    }
  }, []);

  const getAuthHeaders = () => {
    const token = sessionStorage.getItem("authToken");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

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
        fetchUserInfo(data.token); // Charger les informations utilisateur
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

  // Créer une description de jeu d'un salon.
  const createGameRoom = async (serverName, password, rank, masterInfo) => {
    try {
      const response = await fetch("http://localhost:3001/api/games", {
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
        console.log("Game created successfully");
        console.log("Game data:", data);
        // Additional logic if needed
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

  const getRoomTableRecords = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/gameRoomDescription",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch roomTableRecords");
      } else {
        console.log("roomTableRecords fetched successfully");
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Error fetching roomTableRecords:", error);
      return null;
    }
  };

  const logingOut = () => {
    dispatch({ type: "LOGOUT" });
    showHome();

    sessionStorage.removeItem("authToken"); // nettoyer le token
  };

  const getUserInfo = () => {
    return state.user;
  };

  const updateUserData = async (
    field,
    value,
    identifierType = "pseudo",
    identifierValue
  ) => {
    try {
      const isEmailIdentifier = identifierType === "email";
      // Utilisation de state.isLogged et state.user pour vérifier la connexion et accéder aux informations utilisateur
      if (!isEmailIdentifier && (!state.isLogged || !state.user)) {
        console.error("User not logged in.");
        return;
      }

      const identifierField = isEmailIdentifier ? "email" : "pseudo";
      // Utilisation de state.user pour déterminer la valeur d'identifiant si nécessaire
      const identifier = isEmailIdentifier
        ? identifierValue
        : state.user[identifierField];

      const response = await fetch(
        "http://localhost:3001/api/update-user-data",
        {
          ...CORSSETTINGS,
          headers: getAuthHeaders(),
          body: JSON.stringify({
            field,
            value,
            identifierType,
            identifierValue: identifier,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Dispatch d'une action pour mettre à jour l'état utilisateur si la mise à jour est réussie
        dispatch({
          type: "UPDATE_USER_DATA",
          payload: { ...state.user, [field]: value },
        });
        console.log(`${field} updated successfully.`);
        return true;
      } else {
        console.error(`Failed to update ${field}:`, data.message);
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  const checkEmail = async (email) => {
    try {
      // Envoyer l'e-mail à l'utilisateur avec un lien pour réinitialiser le mot de passe
      const response = await fetch("http://localhost:3001/api/check-email", {
        ...CORSSETTINGS,
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Reset password email sent successfully.");
      } else {
        console.error("not-found");
        return "not-found";
      }
    } catch (error) {
      console.error("Error sending reset password email:", error);
    }
  };

  const registerUser = async (userData) => {
    try {
      // Effectuer la requête POST vers votre API
      const response = await fetch("http://localhost:3001/api/users", {
        ...CORSSETTINGS,
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Utilisateur créé avec succès!");
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

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/userInfo", {
        method: "GET",
        headers: getAuthHeaders(),
      });
      const data = await response.json();

      console.log("Réponse de /api/userInfo:", data); // Log pour voir la réponse

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
  };

  // const fetchStats = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3001/api/user-stats/${user._id}`,
  //       {
  //         method: "GET",
  //         headers: getAuthHeaders(),
  //       }
  //     );
  //     const data = await response.json();
  //     console.log("Data fetched from fetchStats:", data);
  //     if (data.success) {
  //       return data.stats; // Supposons que la réponse contient un objet stats dans data.stats
  //     } else {
  //       console.error("Failed to fetch user stats");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user stats:", error);
  //     return null;
  //   }
  // };

  const resolveImagePath = (relativePath) => {
    return `${process.env.PUBLIC_URL}${relativePath}`;
  };

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/items", {
        method: "GET",
      });
      let items = await response.json();
      if (response.ok) {
        items = items.map((item) => ({
          ...item,
          imgSrc: resolveImagePath(item.imgSrc),
        }));
        console.log("Items chargés : ", items);

        return items;
      } else {
        console.error("Erreur lors du chargement des items");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion à l'API:", error);
    }
  };

  const buyItem = async (itemId) => {
    try {
      const response = await fetch("http://localhost:3001/api/buy-item", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          userId: user._id,
          itemId: itemId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log(data.message);
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

  const activateAvatar = async (itemId, itemType) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/activate-avatar`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({ userId: user._id, itemId, itemType }),
        }
      );
      const data = await response.json();
      if (data.success) {
        dispatch({ type: "UPDATE_USER_AVATAR", payload: { itemId, itemType } });
        console.log("Avatar component activated successfully");
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

  const getAvatarById = async (userId) => {
    try {
      const requestUrl = `http://localhost:3001/api/avatar-info/${userId}`;
      //console.log("Requesting avatar data from URL:", requestUrl);

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
      //console.log("Parsed Data Received:", data);

      if (data && data.baseAvatar && data.sunglasses && data.colorAvatar) {
        console.log("Data fields are correctly structured and present.");
        return {
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

  const updateUserCoins = async (coinsToAdd) => {
    if (!state.isLogged || !user) {
      console.error("User not logged in.");
      return false;
    }
  
    try {
      const response = await fetch("http://localhost:3001/api/update-coins", {
        ...CORSSETTINGS,
        headers: getAuthHeaders(),
        body: JSON.stringify({
          userId: user._id,
          coinsToAdd
        }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        console.error("Failed to update coins:", data.message);
        return false;
      }
        dispatch({
        type: "UPDATE_USER_DATA",
        payload: { ...user, coins: data.updatedCoins }
      });
  
      console.log("Coins updated successfully to:", data.updatedCoins);
      return true;
    } catch (error) {
      console.error("Error updating user coins:", error);
      return false;
    }
  };    

  const getAvailableRooms = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/availableRooms", {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Rooms fetched successfully");
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

  const verifyGamePassword = async (roomId, password) => {
    try {
      const response = await fetch(`http://localhost:3001/api/verify-game-password`, {
        ...CORSSETTINGS,
        body: JSON.stringify({
          roomId,
          password
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
        //fetchStats,
        fetchItems,
        buyItem,
        activateAvatar,
        getAvatarById,
        updateUserCoins,
        // fetch available rooms
        getAvailableRooms,
        verifyGamePassword
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
