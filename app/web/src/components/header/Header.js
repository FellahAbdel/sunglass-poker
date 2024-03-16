import "./header.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import Window from "../connectionWindow/Window";
import Button from "../button/Buttons";
import GameTable from "../../pages/gameTable";

import { useAuth, getUserInfo } from "../AuthProvider";
import { useWindowContext } from "../WindowContext";


const Header = ({ }) => {
  const { isLogged, logingIn, logingOut, getUserInfo } = useAuth();
  const { openWindow, closeWindow, isWindowOpen, windowType } =
  useWindowContext();

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
        <Link to="/gametable" className="header-button">
          gameTable
        </Link>
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
