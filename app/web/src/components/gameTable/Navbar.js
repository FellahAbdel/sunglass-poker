import React  from "react";
import './navbar.css';
import ChipsCash from './ChipsCash';
import Button from './Button/Button.tsx';


const Navbar = () => { 
    return (
        <div className="container-nav">
            <ChipsCash style="box-chips"/>
            <Button style="btn-profile" children={"Profile"} iconStyle="icon-profile" iconSrc={require('./images/icons/profile-icon.png')}/>
            <Button style="btn-exit" children={"Exit"}/>
            <Button style="btn-settings" children={"Settings"} iconStyle='icon-settings' iconSrc={require('./images/icons/settings-icon.png')}/>
        </div>
    )
}

export default Navbar;
