// AuthProvider.js
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useWindowContext } from "./WindowContext";

const AuthContext = createContext();
const CORSSETTINGS = {
  method: "POST",
  mode: "cors",
  origin: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
};

const initialState = { isLogged: false, user: null };

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogged: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isLogged: false, user: null };
    case "UPDATE_USER_DATA":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { showHome } = useWindowContext();
  const { isLogged, user } = state;

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
