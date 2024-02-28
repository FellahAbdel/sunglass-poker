import React from 'react';
import Styles from './clientProfile.css'
import ProgressBar from './ProgressBar';

const  ClientsProfile=({status, chips, name}) =>{
    const formattedChips = chips.toLocaleString();
    const dollarSign = '$';

    return (
    <div className="container">
        <div className="info">
            {formattedChips}{dollarSign}<br/>
            {name}
        </div>
        <div className="statusBar">
            <ProgressBar className="progressBar ProgressPercentage" durationInSeconds={5}/>
            <div className="status">{status}</div>
            
        </div>
        <img className="profilePic" src={require('./images/pp_simple.jpg')} alt='profilePic'/>
        
    </div>
    )
}

export default ClientsProfile;