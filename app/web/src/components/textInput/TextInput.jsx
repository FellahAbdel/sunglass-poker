// TextInput.jsx
import React from "react";
import "./TextInput.css";

const TextInputComponent = ({ placeholder, type = "text" }) => {
  return <input type={type} placeholder={placeholder} className="input" />;
};

export default TextInputComponent;
