import React from 'react';
import "./acceuil.css";
import LogoComponent from "../logo/Logo";
// import Button from "../button/Buttons";
import Form from "./Form";

var userIsConnected=false;

export const acceuil = () => { 
    return (
        <div>
            <div className='accueil'>
            <LogoComponent className="logoacceuil"/>
            </div>
            <div className='accueil'>

                <div>
                <Form isConnected={userIsConnected}/>
                </div>
                
                
                <LogoComponent className="logoacceuil"/>
            </div>
        </div>
    )
}

export default acceuil;