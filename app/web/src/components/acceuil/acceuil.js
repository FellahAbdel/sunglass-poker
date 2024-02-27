import React from 'react';
import {Link} from 'react-router-dom'
import "./acceuil.css";
import logo from "../assets/SunGameStudio_logo.png"

export const acceuil = () => { 
    return (
        <div>
            <div className='accueil'>
                <img src={logo} alt="Logo de SunGamesStudio"></img>
            </div>
            <div className='accueil'>
                <button className='jouer'><Link to="/login">JOUER</Link></button>
                <button className='invite'><input type="text" placeholder="Code d'invitation"></input></button>
                <img src="../../../../../design/SunGlassPoker_logo.png" alt="Logo de SunGlassPoker"></img>
            </div>
        </div>
    )
}

export default acceuil;