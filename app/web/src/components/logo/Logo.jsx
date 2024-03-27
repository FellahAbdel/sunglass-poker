// LogoComponent.jsx
import React from "react";
import "./logo.css";
import logo from "../assets/SunGameStudio_logo.png";

const LogoComponent = ({styleClass , onClick, label}) => {
  return (
    <div className={styleClass} >
      <img onClick={onClick} src={logo} alt="Logo du site"/>
      <h1>{label}</h1>
    </div>
)};

export default LogoComponent;
