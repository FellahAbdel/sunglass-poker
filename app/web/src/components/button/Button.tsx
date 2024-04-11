import React from 'react';
import "./button.css";
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay'; 

const Button = ({ label, showAvatar, iconSrc, styleClass, onClick }) => {
  return (
    <button className={styleClass} onClick={onClick}>
      {label}
      {showAvatar ? <div className='avatarClass'><AvatarDisplay /> </div> : (iconSrc && <img src={iconSrc} alt={label} />)}
    </button>
  );
};

export default Button;