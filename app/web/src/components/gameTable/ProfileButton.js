import React  from "react";
import styles from './ProfileButton.module.css';
import ProfileIcon from './images/icons/profile-icon.png';


function ProfileButton(){ 
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