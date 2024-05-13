import React from "react";
import "./textGlitch.css";
import { useSettings } from "./../Utiles/SettingsContext.jsx";

function TextGlitch({ children, styleClass, glitchStyle }) {
  const { animation } = useSettings();

  return (
    <div className={styleClass}>
      <div className={`${animation ? "glitch-wrapper" : ""}`}>
        <div
          className={`${
            animation ? `glitch ${glitchStyle}` : "noAnimationGlitch"
          }`}
          data-glitch={children}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default TextGlitch;
