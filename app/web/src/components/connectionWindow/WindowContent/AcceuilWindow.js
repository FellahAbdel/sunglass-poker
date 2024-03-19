import Reaact, { useState } from 'react';
// import './acceuilWindow.css'
import TextGlitch from '../../gameTable/TextGlitch/TextGlitch.js';
import Button from "../../button/Button.tsx";
import { useAuth, getUserInfo, AuthProvider } from "../../AuthProvider";


const AcceuilWindow = ({onClickStartGame}) => {
    
    const { logingIn, logingOut, getUserInfo, isLogged } = useAuth();


  return (
    <div className="AcceuilWindow">
        <TextGlitch
            children={"SunGlassPoker"}
            style={"glitch-accueil"}
            glitchStyle={"glitchStyle-accueil"}
        />
        <Button
            style={"btn-gameStart"}
            label={isLogged ? "Start Playing" : "Login to Play"}
            onClick={onClickStartGame}
        />
    </div>
  );
}

export default AcceuilWindow;