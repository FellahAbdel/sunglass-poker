// LogoComponent.jsx
import React from "react";
import "./logo.css";
import logo from "../assets/SunGameStudio_logo.png";

const LogoComponent = ({className }) => {
  return <img src={logo} className={`${className}`} alt="Logo du site"/>;
};

export default LogoComponent;
