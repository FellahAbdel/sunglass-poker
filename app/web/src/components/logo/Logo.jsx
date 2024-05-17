// LogoComponent.jsx
import React from "react";
import "./logo.css";

const LogoComponent = ({ styleClass, onClick, label , loading }) => {
  return (
    <div className={`${styleClass} ${label && "logo-textPadding"}`}>
      {loading ?       
      (<div className="container-logoParts">
        <img className="logo-core" onClick={onClick} src="static/media/assets/images/icons/sun-core.png" alt="Logo du site" />
        <img className={`logo-flare ${loading && "loading"}`} onClick={onClick} src="static/media/assets/images/icons/sun-flare.png" alt="Logo du site" />
      </div>)
      : (<>
        <img onClick={onClick} src="static/media/assets/SunGameStudio_logo.png" alt="Logo du site" />
        <h1>{label}</h1>
        </>)}

    </div>
  );
};

export default LogoComponent;
