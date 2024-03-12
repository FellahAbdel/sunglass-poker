import React from 'react';
import "./acceuil.css";
import LogoComponent from "../logo/Logo";
import Button from "../button/Buttons";
import { useAuth } from "../AuthProvider";

const Acceuil = ({ openWindow }) => {
  const { isLogged } = useAuth();
  const handleClick = () => {
    // Regarder si on est connecté ou pas
    isLogged ? startGame() : openWindow("login");
  };

  const startGame = () => {
    // Commncer une partie
    console.log("Démarrez la partie !");
  };
var userIsConnected=false;

export const acceuil = () => { 
    return (
        <div>
            <div className='accueil'>
            <LogoComponent className="logoacceuil"/>
            </div>
            <div className='accueil'>
            <div>
        
        {props.isConnected && (
            <Button 
    className="cta" 
    label="JOUER" 
    />
        )}

        {!props.isConnected && (
            <Button onClick={() => openWindow("login")}
    className="cta" 
    label="LOGIN TO PLAY" 
    />
        )}

        {isWindowOpen && <Window onClose={closeWindow} windowType={windowType} />}
    </div>
                
                <LogoComponent className="logoacceuil"/>
            </div>
        </div>
    )
}
