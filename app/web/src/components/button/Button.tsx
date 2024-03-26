import React from 'react';
import "./button.css";

const Button = ({ label , iconSrc , style, onClick }) => {
  return (
    <button className={style} onClick={onClick}>
      {label}
      {iconSrc && <img src={iconSrc}/>}
    </button>
  );
};

export default Button;