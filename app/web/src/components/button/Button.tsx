import React from 'react';
import "./button.css";

const Button = ({ label , iconSrc , styleClass, onClick }) => {
  return (
    <button className={styleClass} onClick={onClick}>
      {label}
      {iconSrc && <img src={iconSrc} alt={label}/>}
    </button>
  );
};

export default Button;