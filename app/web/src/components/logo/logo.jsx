// LogoComponent.jsx
import React from "react";
import "./logo.css";
import logo from "../assets/SunGameStudio_logo.png";

const LogoComponent = () => {
  return <img src={logo} alt="Logo du site" className="logo" />;
};

export default LogoComponent;
