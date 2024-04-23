import React from "react";
import "./TextInput.css";
import { useTranslation } from "../Utiles/Translations";

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
  const { getTranslatedWord } = useTranslation();
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
      {errorMessage && <p>{getTranslatedWord(errorMessage)}</p>}    </div>
  );
};

export default TextInputComponent;
