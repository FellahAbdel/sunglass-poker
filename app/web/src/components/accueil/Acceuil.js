<<<<<<< HEAD:app/web/src/components/accueil/Acceuil.js
import React from 'react';
=======
import React from "react";
import { Link } from "react-router-dom";
>>>>>>> 44aee3b (modification css, ajout component  text):app/web/src/components/acceuil/Acceuil.js
import "./acceuil.css";
import LogoComponent from "../logo/Logo";
import Button from "../button/Buttons";

export const acceuil = () => {
  return (
    <div>
      <div className="accueil">
        <LogoComponent className="logoacceuil" />
      </div>
      <div className="accueil">
        <Button className="cta" label="JOUER" />

        <LogoComponent className="logoacceuil" />
      </div>
    </div>
  );
};

export default acceuil;
