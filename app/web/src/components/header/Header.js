import "./header.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Window from "../connectionWindow/Window";
import Button from "../button/Buttons";

const Header = ({
  isLogged,
  openWindow,
  logingIn,
  isWindowOpen,
  windowType,
  closeWindow,
  logingOut,
}) => {
  return (
    <header className="header">
      <nav>
        <div>
          <Button className="login" label="Pseudo" />
          <Button
            onClick={() => openWindow("tuto")}
            className="login"
            label="tutoriel"
          />
          {isLogged ? ( //Elements affichés quand il est connecté
            <>
              <Button onClick={logingOut} className="login" label="logout" />
            </>
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
