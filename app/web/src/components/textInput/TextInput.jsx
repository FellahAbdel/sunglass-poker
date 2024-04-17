import React from "react";
import "./TextInput.css";

const TextInputComponent = ({
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  errorMessage,
  styleClass,
  styleClass2
}) => {
  const hasError = errorMessage !== "";
  return (
    <div className={`container-textInputComponent ${styleClass2}`}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`${styleClass} ${hasError ? "input-component-error" : ""}`}
        value={value}
        onChange={(e) => onChange(e)}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default TextInputComponent;
