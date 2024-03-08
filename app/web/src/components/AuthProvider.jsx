// AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

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
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        console.log("Coins during login:", fullUserData.coins);

        console.log(data.message);
        return true;
      } else {
        console.error(data.message);
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      return false;
    }
  };

  const logingOut = () => {
    setIsLogged(false);
    setUser(null);

    // Supprimer les informations de l'utilisateur du localStorage lors de la déconnexion
    localStorage.removeItem("user");
  };

  const getUserInfo = () => {
    // Fonction pour récupérer les informations de l'utilisateur
    return user;
  };

  return (
    <AuthContext.Provider
      value={{ isLogged, user, login, logingOut, getUserInfo }}
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
