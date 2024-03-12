import "./header.css";
import { Link } from "react-router-dom";
import React from "react";
// import Window from "../connectionWindow/Window";
// import Button from "../button/Buttons";
import FormHeader from "../acceuil/Formheader";

import { useAuth, getUserInfo } from "../AuthProvider";

const Header = ({ openWindow, isWindowOpen, windowType, closeWindow }) => {
  const { isLogged, logingIn, logingOut, getUserInfo } = useAuth();

  return (
    <header className="header">
      <nav>
        {isLogged ? (
          <div className="dropdown">
            <Button
              className="profil header-button"
              label={getUserInfo() ? getUserInfo().username : "Pseudo"}
              image={getUserInfo().avatar}
              onClick2={() => openWindow("avatar")}
            />

            <div className="dropdown-content">
              {/* Contenu du menu déroulant */}
              <Button className="deroulant" label="Profil" />
              <Button className="deroulant" label="Stats" />
              <Button
                className="deroulant"
                label={`Coins : ${
                  getUserInfo() && getUserInfo().coins !== undefined
                    ? getUserInfo().coins
                    : 0
                }`}
              />
              <Button
                onClick={logingOut}
                className="logout deroulant"
                label="Logout"
              />
            </div>
          </div>
        ) : (
          <Button
            onClick={() => openWindow("login")}
            className="header-button"
            label="Login"
          />
        )}
        <Button
          onClick={() => openWindow("tuto")}
          className="header-button"
          label="tutoriel"
        />
        {isWindowOpen && (
          <Window
            onClose={closeWindow}
            windowType={windowType}
            logingIn={logingIn}
            logingOut={logingOut}
          />
        )}
      </nav>
    </header>
  );
};
export default Header;
