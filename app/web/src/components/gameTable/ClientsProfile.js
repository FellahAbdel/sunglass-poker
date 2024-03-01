import React from 'react';
import './clientProfile.css';
import ProgressBar from './ProgressBar';

const  ClientsProfile=({status, chips, name}) =>{
    const formattedChips = chips.toLocaleString();
    const dollarSign = '$';

    return (
    <div className="container-onGameProfile">
        <div className="box-playerInfo">
            {formattedChips}{dollarSign}<br/>
            {name}
        </div>
        <div className="box-status">
            <ProgressBar className="progressBar ProgressPercentage" durationInSeconds={5}/>
            <div className="box-statusText">{status}</div>
        </div>
        <img className="profilePic" src={require('./images/pp_simple.jpg')} alt='profilePic'/>
        
    </div>
    )
}

export default ClientsProfile;