import React from 'react';
import "./header.css";
import {Link} from 'react-router-dom'

const Header = () => {
	return (
		<header className='header'>
			<button><Link to="/home">TEMPORAIRE</Link></button>

			<nav>
				<button>Pseudo</button>

				<button><Link to="">Tutoriel</Link></button>

				<button><Link to="/login">Connexion</Link></button>
			</nav>
		</header>
	);
}
export default Header;