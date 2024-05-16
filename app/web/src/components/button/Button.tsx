import React from 'react';
import "./button.css";
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay'; 

const Button = ({ label, showAvatar, iconSrc, styleClass, onClick, disabled }) => {
  return (
    <button className={styleClass} onClick={onClick} disabled={disabled}>
      <span>{label}</span>
      {iconSrc && <img src={iconSrc} alt={label}/>}
    </button>
  );
};

export default Button;