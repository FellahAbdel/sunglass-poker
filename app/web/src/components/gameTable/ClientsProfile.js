import React from 'react';
import './clientProfile.css';
import ProgressBar from './ProgressBar';

const  ClientsProfile=({status, chips, name}) =>{
    const formattedChips = chips.toLocaleString();
    const dollarSign = '$';


    return (
    <div className="container-onGameProfile">
        <div className={`box-status  ${status}`}>

        {status === "Waiting" ? (
                <ProgressBar className="progressBar progressPercentage" durationInSeconds={5} />
            ) : (
                <div className="box-statusText">{status}</div>
            )}
        </div>

        <div className={`box-playerInfo ${status}`}>
            {formattedChips} {status === "Empty" ? null : dollarSign}<br/>
            {name}
        </div>

        <img className={`profilePic ${status}`} src={status === "Empty" ? null : require('./images/pp_simple.jpg')} alt='profilePic'/>
        
    </div>
    )
}

export default ClientsProfile;