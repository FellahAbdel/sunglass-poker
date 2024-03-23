// AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";
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

export const AuthProvider = ({ children }) => {
  const { showHome } = useWindowContext();
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(
      "isLogged AuthProvider : ",
      isLogged ? "true" : "false"
    );
  }, [isLogged]);

  useEffect(() => {
    // Récupérer les informations de l'utilisateur depuis le localStorage lors du chargement de la page
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLogged(true);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch("api/login", {
        ...CORSSETTINGS,
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.success) {
        // Utilisez les données récupérées de la base de données
        const fullUserData = { ...credentials, ...data.userData };

        setIsLogged(true);
        setUser(fullUserData);

        // Stocker les informations de l'utilisateur dans le localStorage
        localStorage.setItem("user", JSON.stringify(fullUserData));

        console.log(data.message);
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
    setIsLogged(false);
    setUser(null);
    showHome();

    // Supprimer les informations de l'utilisateur du localStorage lors de la déconnexion
    localStorage.removeItem("user");
  };

  const getUserInfo = () => {
    // Fonction pour récupérer les informations de l'utilisateur
    return user;
  };
  const updateUserData = async (
    field,
    value,
    identifierType = "pseudo",
    identifierValue
  ) => {
    try {
      // Vérifiez si l'e-mail est utilisé comme identifiant
      const isEmailIdentifier = identifierType === "email";

      // Si l'e-mail est utilisé comme identifiant, ne vérifiez pas si l'utilisateur est connecté
      if (!isEmailIdentifier && (!isLogged || !user)) {
        console.error("User not logged in.");
        return;
      }

      // Déterminez quel champ utiliser pour rechercher l'utilisateur dans la base de données
      const identifierField = isEmailIdentifier ? "email" : "pseudo";
      const identifier = isEmailIdentifier
        ? identifierValue
        : user[identifierField];

      // Mettez à jour le champ spécifié dans la base de données
      const response = await fetch(
        "/api/update-user-data",
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
        // Mettez à jour le champ dans le contexte local si l'e-mail n'est pas utilisé comme identifiant
        if (!isEmailIdentifier) {
          setUser((prevUser) => ({ ...prevUser, [field]: value }));

          // Mettez à jour les informations dans le stockage local si nécessaire
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, [field]: value })
          );
        }

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
      const response = await fetch("api/check-email", {
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
      const response = await fetch("api/users", {
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
