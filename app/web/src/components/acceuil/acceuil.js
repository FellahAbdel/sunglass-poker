import React from 'react';
import {Link} from 'react-router-dom'
import "./acceuil.css";
import LogoComponent from "../logo/logo";


export const acceuil = () => { 
    return (
        <div>
            <div className='accueil'>
            <LogoComponent className="logoacceuil"/>
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