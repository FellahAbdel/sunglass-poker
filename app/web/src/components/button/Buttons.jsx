// ButtonComponent.jsx
import React from "react";
import "./buttons.css";
import ProfilPicture from "../profilPicture/ProfilPicture";

const Button = ({ onClick, label, className, image }) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      {image ? (
        <ProfilPicture indexAvatar={image} altText={label} className="profil" />
      ) : null}
      {label}
    </button>
  );
};

export default Button;
