// ButtonComponent.jsx
import React from "react";
import "./buttons.css";

const Button = ({ onClick, label, className }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
