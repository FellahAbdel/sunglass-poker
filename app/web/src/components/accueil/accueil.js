import React, { useState, useEffect } from "react";
import Login from "../auth/login/Login";
import Signup from "../auth/signup/Signup";

const Accueil = () => {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isSignupVisible, setSignupVisible] = useState(false);

  const handleLoginClick = () => {
    setLoginVisible(true);
    setSignupVisible(false);
  };

  const handleSignupClick = () => {
    setLoginVisible(false);
    setSignupVisible(true);
  };

  const handleCloseWindows = () => {
    setLoginVisible(false);
    setSignupVisible(false);
  };

  return (
    <div>
      <h1>Bienvenue sur notre site</h1>
      <button onClick={handleLoginClick}>Connexion</button>
      <button onClick={handleSignupClick}>Créer un compte</button>

      {isLoginVisible && (
        <Login onClose={handleCloseWindows} onSignupClick={handleSignupClick} />
      )}
      {isSignupVisible && (
        <Signup onClose={handleCloseWindows} onLoginClick={handleLoginClick} />
      )}
    </div>
  );
};

export default Accueil;
