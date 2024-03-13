//react imports
import React, { useState }  from "react";
import { useAuth, getUserInfo } from "./../../AuthProvider.jsx";
//css
import './navbar.css';
//components
import ChipsCash from './ChipsCash';
import Button from '../Button/Button.tsx';




const Navbar = ({profileOnClick,exitOnClick ,settingsOnClick, openWindow, isWindowOpen, windowType, closeWindow}) => { 
    //const { isLogged, logingIn, logingOut, getUserInfo } = useAuth();
    const [isLogged] = useState(true);

    return (
        <div className="container-nav">
            
            {/* Current Chips inventory and LogOut Button */}
            {isLogged && ( <>
            
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
                children={isLogged ? "Profile" : "LogIn"}
                onClick={isLogged ? profileOnClick : null}
                style="btn-profile"
                iconStyle="icon-profile"
                iconSrc={require('./../../assets/images/icons/profile-icon.png')}
            />

            {/* Settings/Tutorial Buttons */}
            <Button 
                children={isLogged ? "Settings" : "Tutorial"}
                onClick={settingsOnClick}
                style="btn-settings"
                iconStyle='icon-settings'
                iconSrc={isLogged ? require('./../../assets/images/icons/settings-icon.png') : require('./../../assets/images/icons/tutorial-icon.png')}
            />
        

        
        </div>
    )
}

export default Navbar;
