//react imports
import React, { useState }  from "react";
import { useAuth, getUserInfo } from "./../../AuthProvider.jsx";
//css
import './navbar.css';
//components
import ChipsCash from './ChipsCash';
import Button from '../Button/Button.tsx';




const Navbar = ({
    profileOnClick,
    exitOnClick ,
    settingsOnClick, 
    isLoggedNavbar,
    logInOnClick,
    }) => { 

    return (
        <div className="container-nav">
            
            {/* Current Chips inventory and LogOut Button */}
            {isLoggedNavbar && ( <>
            
                <ChipsCash 
                    currentChips={9999999999}
                    style={`box-chips`}
                />
                <Button
                    children={"LogOut"}
                    onClick={exitOnClick}
                    style="btn-exit"
                />

            </> )}


            {/* Profile/LogIn Button */}
            <Button 
                children={isLoggedNavbar ? "Profile" : "LogIn"}
                onClick={isLoggedNavbar ? profileOnClick : logInOnClick}
                style={`${isLoggedNavbar ? "btn-profile" : "btn-logIn"}`}
                iconStyle="icon-profile"
                iconSrc={require('./../../assets/images/icons/profile-icon.png')}
            />

            {/* Settings/Tutorial Buttons */}
            <Button 
                children={isLoggedNavbar ? "Settings" : "Tutorial"}
                onClick={isLoggedNavbar ? settingsOnClick : null}
                style={`${isLoggedNavbar ? "btn-settings" : "btn-tutorial"}`}
                iconStyle={`${isLoggedNavbar ? "icon-settings" : "icon-tutorial"}`}
                iconSrc={isLoggedNavbar ? require('./../../assets/images/icons/settings-icon.png') : require('./../../assets/images/icons/tutorial-icon.png')}
            />
        

        
        </div>
    )
}

export default Navbar;
