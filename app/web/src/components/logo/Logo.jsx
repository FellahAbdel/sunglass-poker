// LogoComponent.jsx
import React from "react";
import "./logo.css";
import logo from "../assets/SunGameStudio_logo.png";

const LogoComponent = ({style}) => {
  return (
    <div className={style}>
      <img src={logo} alt="Logo du site"/>;
    </div>
)};

export default LogoComponent;
