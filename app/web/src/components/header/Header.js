import "./header.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Window from "../connectionWindow/Window";
import Button from "../button/Buttons";
import { useAuth, getUserInfo } from "../AuthProvider";

const Header = ({ openWindow, isWindowOpen, windowType, closeWindow }) => {
  const { isLogged, logingIn, logingOut, getUserInfo } = useAuth();
  

  return (
    <header className="header">
      <nav>
        <div>
          {isLogged ? (
            <>
              <div className="dropdown">
                <Button
                  className="login"
                  label={getUserInfo() ? getUserInfo().username : "Pseudo"}
                />

                <div className="dropdown-content">
                  {
                    /* Contenu du menu déroulant */
                    <>
                      <Button className="deroulant" label="Profil" />

                      <Button className="deroulant" label="Stats" />

                      <Button
                        className="deroulant"
                        label={`Coins : ${
                          getUserInfo() && getUserInfo().coins !== undefined
                            ? getUserInfo().coins
                            : 0
                        }`}
                        /*OnClick : ouvre l'historique */
                      />
                      <Button
                        onClick={logingOut}
                        className="logout deroulant"
                        label="Logout"
                      />
                    </>
                  }
                </div>
              </div>
            </>
          ) : (
            <Button
              onClick={() => openWindow("login")}
              className="login"
              label="Profil"
            />
          )}

          <Button
            onClick={() => openWindow("tuto")}
            className="login"
            label="tutoriel"
          />
          {isLogged ? ( //Elements affichés quand il est connecté
            <></>
          ) : (
            //Elements affichés quand non connecté
            <Button
              onClick={() => openWindow("login")}
              className="login"
              label="login"
            />
          )}
          {isWindowOpen && (
            <Window
              onClose={closeWindow}
              windowType={windowType}
              logingIn={logingIn}
              logingOut={logingOut}
            />
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
