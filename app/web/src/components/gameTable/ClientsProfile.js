import React from 'react';
import Styles from './clientProfile.module.css'

const  ClientsProfile=({status, chips, name}) =>{
    const formattedChips = chips.toLocaleString();
    const dollarSign = '$';

    return (
    <div className={`${Styles.container}`}>
        <div className={`${Styles.statusBar}`}>{status}</div>
        <div className={`${Styles.info}`}>
            {formattedChips}{dollarSign}<br/>
            {name}
        </div>
        <img className={`${Styles.profilePic}`} src={require('./images/pp_simple.jpg')} alt='profilePic'/>
    </div>
    )
}

export default ClientsProfile;