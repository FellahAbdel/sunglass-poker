import React, { useState } from "react";
import Button from "../button/Buttons";
import Window from "../connectionWindow/Window";

function Form(props){
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    const [windowType, setWindowType] = useState(null);
  
    const openWindow = (type) => {
      setIsWindowOpen(true);
      setWindowType(type);
    };
  
    const closeWindow = () => {
      setIsWindowOpen(false);
    };
    return(
        
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
    );
}


export default Form;