import React from 'react'
import './textGlitch.css'

function textGlitch({children,style,glitchStyle}) {
  return (
    <div className={style}>
        <div class={`glitch-wrapper`}>
            <div class={`glitch ${glitchStyle}`} data-glitch={children}>{children}</div>
        </div>
    </div>
  )
}

export default textGlitch