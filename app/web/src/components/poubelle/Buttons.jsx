// ButtonComponent.jsx
import React from "react";
import "./buttons.css";

const Button = ({ onClick, label, className, image, onClick2 }) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
