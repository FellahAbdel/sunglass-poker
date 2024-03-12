import React  from "react";
import './navbar.css';
import ChipsCash from './ChipsCash';
import Button from '../Button/Button.tsx';


const Navbar = ({profileOnClick,exitOnClick ,settingsOnClick}) => { 
    return (
        <div className="container-nav">
            <ChipsCash style="box-chips"/>
            <Button onClick={profileOnClick} style="btn-profile" children={"Profile"} iconStyle="icon-profile" iconSrc={require('./../../assets/images/icons/profile-icon.png')}/>
            <Button onClick={exitOnClick} style="btn-exit" children={"Exit"}/>
            <Button onClick={settingsOnClick} style="btn-settings" children={"Settings"} iconStyle='icon-settings' iconSrc={require('./../../assets/images/icons/settings-icon.png')}/>
        </div>
    )
}

export default Navbar;
