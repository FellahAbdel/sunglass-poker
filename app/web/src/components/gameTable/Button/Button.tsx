import React from 'react';

const Button = ({ children , iconStyle , iconSrc , style, onClick }) => {
  return (
    <button className={style} onClick={onClick}>
      {children}
      {iconStyle && <img className={iconStyle} src={iconSrc}/>}
    </button>
  );
};

export default Button;