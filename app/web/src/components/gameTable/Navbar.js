import React  from "react";
import styles from './navbar.module.css';
import ChipsCash from './ChipsCash';
import ProfileButton from './ProfileButton';
import SettingsButton from './SettingsButton';
import ExitButton from './ExitButton';

const Navbar = () => { 
    return (
        <div className={`${styles.navbar}`}>
            <div className={`${styles.chipsCash}`}><ChipsCash/></div>
            <div className={`${styles.profile}`}><ProfileButton/></div>
            <div className={`${styles.exit}`}><ExitButton/></div>
            <div className={`${styles.settings}`}><SettingsButton/></div>
        </div>
    )
}

export default Navbar;
