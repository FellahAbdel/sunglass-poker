import React from 'react'
import './textGlitch.css'

function textGlitch({children,styleClass,glitchStyle}) {
  return (
    <div className={styleClass}>
        <div className={`glitch-wrapper`}>
            <div className={`glitch ${glitchStyle}`} data-glitch={children}>{children}</div>
        </div>
    </div>
  )
}

export default textGlitch