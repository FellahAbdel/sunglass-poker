
import "./header.css";
import {Link} from 'react-router-dom'
import React, { useState } from "react";
import Window from "../connectionWindow/Window";


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
			<button><Link to="/acceuil">TEMPORAIRE</Link></button>

			<nav>
				<button>Pseudo</button>

				<button><Link to="">Tutoriel</Link></button>

				<button onClick={() => openWindow("signup")}>Create an account</button>
      	<button onClick={() => openWindow("login")}>Login</button>
		  {isWindowOpen && <Window onClose={closeWindow} windowType={windowType} />}
			</nav>
		</header>
	);
}
export default Header;