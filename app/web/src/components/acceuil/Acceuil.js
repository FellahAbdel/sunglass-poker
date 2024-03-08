import React from "react";
import { Link } from "react-router-dom";
import "./acceuil.css";
import LogoComponent from "../logo/Logo";
import Button from "../button/Buttons";
import { useAuth } from '../AuthProvider';


const Acceuil = ({ openWindow }) => {
  const { isLogged } = useAuth();
  const handleClick = () => {
    // Regarder si on est connecté ou pas
    isLogged ? startGame() : openWindow("login");
  };

  const startGame = () => {
    // Commncer une partie
    console.log("Démarrez la partie !");
  };

  return (
    <div>
      <div className="accueil">
        <LogoComponent className="logoacceuil" />
      </div>
      <div className="accueil">
        <Button className="cta" label="JOUER" onClick={handleClick} />
        <LogoComponent className="logoacceuil" />
      </div>
    </div>
  );
};

export default Acceuil;
