import React from 'react';
import "./button.css";

const Button = ({ label, iconSrc, styleClass, onClick , disabled}) => {
  const handleClick = (event) => {
    event.stopPropagation(); // Ajout pour stopper la propagation
    onClick && onClick(event); // Appelle la fonction onClick passée en props si elle existe
  };
  return (
    <button className={styleClass} onClick={handleClick} disabled={disabled}>
      <span>{label}</span>
      {iconSrc && <img src={iconSrc} alt={label}/>}
    </button>
  );
};

export default Button;