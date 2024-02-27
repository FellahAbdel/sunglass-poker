import React  from "react";
import styles from './profileButton.module.css';
import ProfileIcon from './images/icons/profile-icon.png';


const ProfileButton = () => { 
    const handleClick = () => {
    }
    return (
        <div className={`${styles.profileButton}`} onClick={handleClick}>
            <span>Profile</span>
            <img src={ProfileIcon} alt="profile" className={`${styles.profileIcon}`}/>
        </div>
    )
}

export default ProfileButton;