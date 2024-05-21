import React from "react";
import "./textGlitch.css";
import { useSettings } from "./../Utiles/SettingsContext.jsx";
/**
 * TextGlitch applies a glitch effect to text based on the animation settings.
 * It allows the text content and glitch styling to be dynamically adjusted via props.
 *
 * Props:
 *  - children: The text content to apply the glitch effect to.
 *  - styleClass: Additional CSS class for custom styling.
 *  - glitchStyle: Specific glitch effect style class to apply when animations are enabled.
 */
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
