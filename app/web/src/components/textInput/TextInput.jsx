import React from "react";
import "./TextInput.css";
import { useTranslation } from "../Utiles/Translations";
/**
 * TextInputComponent creates a styled input field with optional error handling.
 * It uses a translation hook for localized placeholders and error messages.
 *
 * Props:
 *  - name: String representing the input's name attribute.
 *  - placeholder: String identifier for translation of the input's placeholder text.
 *  - type: String specifying the HTML input type, defaulting to "text".
 *  - value: Controlled value of the input.
 *  - onChange: Function to handle changes in the input.
 *  - errorMessage: String identifier for the error message translation.
 *  - styleClass: CSS class for styling the input element.
 *  - styleClass2: Additional CSS class for the outer container.
 *  - onKeyDown: Function to handle the 'onKeyDown' event.
 */
const TextInputComponent = ({
  name,
  placeholder,
  type = "text",
  value,
  onChange,
  errorMessage,
  styleClass,
  styleClass2,
  iconSrc,
  onKeyDown,
}) => {
  // Check if an error message exists to conditionally style the input
  const hasError = errorMessage !== "";
  const { getTranslatedWord } = useTranslation();
  return (
    <div className={`container-textInputComponent ${styleClass2}`}>
      <input
        type={type}
        name={name}
        placeholder={getTranslatedWord(placeholder)}
        className={`${styleClass} ${hasError ? "input-component-error" : ""}`}
        value={value}
        onChange={(e) => onChange(e)}
        onKeyDown={onKeyDown}
      ></input>
      <img className="texxtInput-icon" src={iconSrc} />
      {errorMessage && <p>{getTranslatedWord(errorMessage)}</p>}{" "}
    </div>
  );
};

export default TextInputComponent;
