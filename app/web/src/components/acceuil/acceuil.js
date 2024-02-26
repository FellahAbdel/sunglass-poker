import React from 'react';
import {Link} from 'react-router-dom'
import "./acceuil.css";

export const acceuil = () => { 
    return (
        <div className='accueil'>
            <div className='accueil'>
                <img src="../../../../../design/SunGameStudio_logo.png" alt="Logo de SunGamesStudio"></img>
            </div>
            <div className='accueil'>
                <button><Link to="">JOUER</Link></button>
                <button><Link to="">Code invite</Link></button>
                <img src="../../../../../design/SunGlassPoker_logo.png" alt="Logo de SunGlassPoker"></img>
            </div>
        </div>
    )
}

export default acceuil;