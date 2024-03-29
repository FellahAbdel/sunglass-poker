// AuthProvider.js
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useWindowContext } from "./WindowContext";
import { userReducer, initialState } from "../../store/reducers/userReducer";

const AuthContext = createContext();
const CORSSETTINGS = {
  method: "POST",
  mode: "cors",
  origin: "http://localhost:3000",
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

  const login = async (credentials) => {
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        ...CORSSETTINGS,

        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (data.success) {
        sessionStorage.setItem("authToken", data.token); // Stocker le token en mémoire ou gérer via headers
        dispatch({
          type: "LOGIN",
          payload: { ...data.userData, token: data.token },
        });
        fetchUserInfo(data.token); //Charger les info de l'utilisateur
        return true;
      } else {
        console.error(data.message);
        return { error: data.message };
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      return false;
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

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch("http://localhost:3001/api/userInfo", {
        // Assurez-vous que cette route existe dans votre backend et qu'elle renvoie les informations de l'utilisateur basé sur le token
        method: "GET",
        headers: {
          ...CORSSETTINGS.headers,
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      console.log("Réponse de /api/userInfo:", data); // Log pour voir la réponse

      if (data.success) {
        dispatch({
          type: "LOGIN",
          payload: { ...data.user, token: token }, // Supposons que `data.user` contient les informations de l'utilisateur
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

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/user-stats/${user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Incluez d'autres headers comme le token si nécessaire
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        return data.stats; // Supposons que la réponse contient un objet stats dans data.stats
      } else {
        console.error("Failed to fetch user stats");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        user,
        login,
        logingOut,
        getUserInfo,
        updateUserData,
        checkEmail,
        registerUser,
        state,
        dispatch,
        fetchStats,
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