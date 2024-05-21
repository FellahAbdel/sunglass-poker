import React from "react";
import "./button.css";

/**
 * Button component renders a customizable button with optional icons.
 *
 * Props:
 * - label: String representing the button text.
 * - iconSrc: String (optional) URL for the icon image to display alongside the label.
 * - styleClass: String representing the CSS class for styling the button.
 * - onClick: Function (optional) callback function to execute on button click.
 * - disabled: Boolean (optional) if true, disables the button interaction.
 */
const Button = ({ label, iconSrc, styleClass, onClick, disabled }) => {
  /**
   * Handles the button click event.
   * - Prevents event propagation to parent elements.
   * - Executes the onClick prop function if provided.
   * @param {Object} event - The event object from the click event.
   */
  const handleClick = (event) => {
    event.stopPropagation();
    onClick && onClick(event);
  };

  return (
    <button className={styleClass} onClick={handleClick} disabled={disabled}>
      <span>{label}</span>
      {iconSrc && <img src={iconSrc} alt={label} />}
    </button>
  );
};

export default Button;
