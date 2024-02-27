import React from 'react';
import {Link} from 'react-router-dom'
import "./acceuil.css";
import LogoComponent from "../logo/logo";
import Button from "../button/buttons";


export const acceuil = () => { 
    return (
        <div>
            <div className='accueil'>
            <LogoComponent className="logoacceuil"/>
            </div>
            <div className='accueil'>

                <Button 
				className="cta" 
				label="JOUER" 
				/>
                
                <LogoComponent className="logoacceuil"/>
            </div>
        </div>
    )
}

export default acceuil;