// LogoComponent.jsx
import React from "react";
import "./logo.css";

const LogoComponent = ({ styleClass, onClick, label }) => {
  return (
    <div className={`${styleClass} ${label && "logo-textPadding"}`}>
      <img onClick={onClick} src="static/media/assets/SunGameStudio_logo.png" alt="Logo du site" />
      <h1>{label}</h1>
    </div>
  );
};

export default LogoComponent;
