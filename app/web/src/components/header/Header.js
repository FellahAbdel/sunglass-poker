
import "./header.css";
import React from "react";
// import Window from "../connectionWindow/Window";
// import Button from "../button/Buttons";
import FormHeader from "../acceuil/Formheader";

var userIsConnected=false;

const Header = () => {

	return (

		<header className='header'>

			<nav>

			<FormHeader isConnected={userIsConnected}/>


			</nav>
		</header>
	);
}
export default Header;