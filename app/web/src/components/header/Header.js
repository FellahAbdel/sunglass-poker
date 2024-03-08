import React from 'react';
import "./header.css";
import {Link} from 'react-router-dom'
import socket from  '../../services/socket'
console.log(socket);
const Header = () => {
	return (
		<header className='header'>
			<button onClick={socket.Hello}>HELLO</button>
			<nav>
				<Link to="/">Accueil</Link>
				<Link to="/home">/home</Link>
				<Link to="/login">/login</Link>
				<Link to="/gameTable">/gameTable</Link>
			</nav>
		</header>
	);
}
export default Header;