// LogoComponent.jsx
import React from "react";
import "./logo.css";

/**
 * LogoComponent displays a logo, optionally with a label and animation.
 * It supports interactive behavior with an onClick handler.
 *
 * Props:
 *  - styleClass: String specifying additional CSS classes for the logo container.
 *  - onClick: Function to handle click events on the logo.
 *  - label: String (optional) to display a label next to the logo.
 *  - loading: Boolean indicating if a loading animation should be shown.
 */
const LogoComponent = ({ styleClass, onClick, label , loading }) => {
  return (
    <div className={`${styleClass} ${label && "logo-textPadding"}`}>
      {/* Conditionally renders different logo versions based on the loading state */}
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
