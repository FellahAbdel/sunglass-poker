import React from 'react';
import './clientProfile.css';
import ProgressBar from './ProgressBar';

const  ClientsProfile=({status, chips, name}) =>{
    const formattedChips = chips.toLocaleString();
    const dollarSign = '$';

    return (
    <div className="container-onGameProfile">



        <div className="box-status">
        {["Checked", "Fold", "Raised"].includes(status) ? (
                <div className="box-statusText">{status}</div>
            ) : (
                <ProgressBar className="progressBar progressPercentage" durationInSeconds={5} />
            )}
        </div>

        <div className="box-playerInfo">
            {formattedChips}{dollarSign}<br/>
            {name}
        </div>

        <img className="profilePic" src={require('./images/pp_simple.jpg')} alt='profilePic'/>
        
    </div>
    )
}

export default ClientsProfile;