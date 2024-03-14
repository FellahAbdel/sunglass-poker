// LogoComponent.jsx
import React from "react";
import "./logo.css";
import logo from "../assets/SunGameStudio_logo.png";

const LogoComponent = ({style }) => {
  return <img src={logo} className={`${style}`} alt="Logo du site"/>;
};

export default LogoComponent;
