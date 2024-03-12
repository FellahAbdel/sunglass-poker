// ButtonComponent.jsx
import React from "react";
import "./buttons.css";
import ProfilPicture from "../profilPicture/ProfilPicture";

const Button = ({ onClick, label, className, image, onClick2 }) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      {image ? (
        <ProfilPicture indexAvatar={image} altText={label} className="profil" onClick={onClick2} />
      ) : null}
      {label}
    </button>
  );
};

export default Button;
