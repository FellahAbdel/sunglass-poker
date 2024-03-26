import React from 'react';
import "./button.css";

const Button = ({ label , iconStyle , iconSrc , style, onClick }) => {
  return (
    <button className={style} onClick={onClick}>
      {label}
      {iconSrc && <img className={iconStyle} src={iconSrc}/>}
    </button>
  );
};

export default Button;