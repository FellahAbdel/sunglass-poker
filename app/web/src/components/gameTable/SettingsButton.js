import React from 'react';
import styles from './SettingsButton.module.css';
import SettingsIcon from './images/icons/settings-icon.png';

function SettingsButton(){
    const handleClick = () => {
      }

    return (
        <div className={`${styles.settingsButton}`} onClick={handleClick}>
                <span>Settings</span>
                <img src={SettingsIcon} alt="settings" className={`${styles.settingsIcon}`}/>
        </div>
    )
}

export default SettingsButton;