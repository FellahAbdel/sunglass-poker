import React from 'react';
import {Link} from 'react-router-dom'
import "./acceuil.css";

export const acceuil = () => { 
    return (
        <div className='accueil'>
            <div className='accueil'>
                <img src="../assets/SunGameStudio_logo.png" alt="Logo de SunGamesStudio"></img>
            </div>
            <div className='accueil'>
                <button className='jouer'><Link to="">JOUER</Link></button>
                <button className='invite'><input type="text" placeholder="Code d'invitation"></input></button>
                <img src="../../../../../design/SunGlassPoker_logo.png" alt="Logo de SunGlassPoker"></img>
            </div>
        </div>
    )
}

export default acceuil;