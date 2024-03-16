import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./acceuil.css";
import LogoComponent from "../components/logo/Logo";
import Button from "../components/button/Buttons";
import { useAuth } from "../components/AuthProvider";
import { useWindowContext } from "../components/WindowContext";

import "./gameTable.css";
import "../components/gameTable/Utiles/animations.css";
import Table from "../components/gameTable/Table/Table";

const Acceuil = ({}) => {
  const { isLogged } = useAuth();

  const { openWindow, closeWindow, isWindowOpen, windowType } =
    useWindowContext();

  const handleClick = () => {
    // Regarder si on est connecté ou pas
    isLogged ? startGame() : openWindow("login");
  };

  const startGame = () => {
    // Commncer une partie
    console.log("Démarrez la partie !");
  };

  return (
    <>
      <div className="background"></div>
      <div className="backdrop"></div>
      <div className="accueil">
        <div className="comp-table">
          <Table
            showGameTable={false}
            isWindowOpen={isWindowOpen}
            windowType={windowType}
            openWindow={openWindow}
            closeWindow={closeWindow}
          />
        </div>
      </div>
    </>
  );
};

export default Acceuil;
