import React from 'react';
import "./header.css";
import {Link} from 'react-router-dom'

const Header = () => {
	return (
		<header className='header'>
			<nav>
				<Link to="/">Accueil</Link>
				<Link to="/UrlHome">/UrlHome</Link>
				<Link to="/NomURLMael">/NomURLMael</Link>
				<Link to="/ebl">/ebl</Link>
				<Link to="/logi">/logi</Link>
			</nav>
		</header>
	);
}
export default Header;