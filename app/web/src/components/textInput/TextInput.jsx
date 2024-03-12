import React from "react";
import "./TextInput.css";

const TextInputComponent = ({
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  errorMessage,
}) => {
  const hasError = errorMessage !== "";
  return (
    <div className="divTextInput">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`input ${hasError ? "error-border" : ""}`}
        value={value}
        onChange={(e) => onChange(e)}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default TextInputComponent;
