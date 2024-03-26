import React from 'react'
import './textGlitch.css'

function textGlitch({children,style,glitchStyle}) {
  return (
    <div className={style}>
        <div className={`glitch-wrapper`}>
            <div className={`glitch ${glitchStyle}`} data-glitch={children}>{children}</div>
        </div>
    </div>
  )
}

export default textGlitch