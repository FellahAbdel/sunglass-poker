
import "./header.css";
import {Link} from 'react-router-dom'
import React, { useState } from "react";
import Window from "../connectionWindow/Window";
import Button from "../button/Buttons";


const Header = () => {
const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [windowType, setWindowType] = useState(null);

  const openWindow = (type) => {
    setIsWindowOpen(true);
    setWindowType(type);
  };

  const closeWindow = () => {
    setIsWindowOpen(false);
  };
	return (

		<header className='header'>

			<nav>
				<div>

			<Button 
				className="login" 
				label="Pseudo" 
				/>
				<Button onClick={() => openWindow("tuto")} 
				className="login" 
				label="tutoriel" 
				/>
				<Button onClick={() => openWindow("login")} 
				className="login" 
				label="login" 
				/>
      			
		  		{isWindowOpen && <Window onClose={closeWindow} windowType={windowType} />}
				
				</div>
			</nav>
		</header>
	);
}
export default Header;