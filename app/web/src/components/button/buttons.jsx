// ButtonComponent.jsx
import React from "react";
import "./buttons.css";

const Button = ({ onClick, label, className }) => {
  return (
    <button className={`buttonconnexion ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
