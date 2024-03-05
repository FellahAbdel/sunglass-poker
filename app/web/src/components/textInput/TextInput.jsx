import React from "react";
import "./TextInput.css";

const TextInputComponent = ({
  name,
  placeholder,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="input"
      value={value}
      onChange={(e) => onChange(e)}
    />
  );
};

export default TextInputComponent;
