import React from "react";
import "./TextInput.css";

const TextInputComponent = ({
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  errorMessage,
  style
}) => {
  const hasError = errorMessage !== "";
  return (
    <div className="container-textInputComponent">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`${style} ${hasError ? "input-component-error" : ""}`}
        value={value}
        onChange={(e) => onChange(e)}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default TextInputComponent;
