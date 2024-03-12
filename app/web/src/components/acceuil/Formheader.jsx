import React, { useState } from "react";
import Window from "../connectionWindow/Window";
import Button from "../button/Buttons";


function FormHeader(props){
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
				className="login" 
				label="pseudo" 
				/>

                )}

            {!props.isConnected && (
                <Button 
				className="login" 
				label="Bienvenue" 
				/>

                )}

				<Button onClick={() => openWindow("tuto")} 
				className="login" 
				label="tutoriel" 
				/>

            {props.isConnected && (
                <Button 
				className="login" 
				label="Vous êtes connecter" 
				/>

                )}

            {!props.isConnected && (
              <Button onClick={() => openWindow("login")} 
              className="login" 
              label="login" 
              />

                )}

            

                {isWindowOpen && <Window onClose={closeWindow} windowType={windowType} />}
      
        </div>
    );
}

export default FormHeader;