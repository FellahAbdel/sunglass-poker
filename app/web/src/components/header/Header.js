import React from 'react';
import "./header.css";
import {Link} from 'react-router-dom'

const Header = () => {
	return (
		<header className='header'>
			<nav>
				<Link to="/">Accueil</Link>
				<Link to="/home">/home</Link>
				<Link to="/login">/login</Link>
				<Link to="/gameTable">/gameTable</Link>

				<button>Connexion</button>
			</nav>
		</header>
	);
}
export default Header;