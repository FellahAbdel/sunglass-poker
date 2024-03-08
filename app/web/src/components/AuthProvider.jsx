// AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(() => {
    // Initialiser à partir de localStorage lors de la première exécution
    const storedIsLogged = localStorage.getItem('isLogged');
    return storedIsLogged ? JSON.parse(storedIsLogged) : false;
  });

  const logingIn = () => {
    setIsLogged(true);
  };

  const logingOut = () => {
    setIsLogged(false);
  };

  // Enregistrer dans le localStorage à chaque changement d'isLogged
  useEffect(() => {
    localStorage.setItem('isLogged', JSON.stringify(isLogged));
  }, [isLogged]);

  return (
    <AuthContext.Provider value={{ isLogged, logingIn, logingOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
