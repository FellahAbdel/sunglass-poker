import React from 'react';
import './table.css';
import ClientsProfile from './ClientsProfile';

const Table = () => {
  return (
    <div className="table">
        <div className="container-cards">
          <div className="tableCardsPlacement">SunGlass Poker</div>
          <div className="dealerCardsPlacement"></div>
        </div>

        <div className="profile profile0"><ClientsProfile status={"Waiting"} chips={9999999} name={"Mostafa0"}/></div>
        <div className="profile profile1"><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa1"}/></div>
        <div className="profile profile2"><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa2"}/></div>
        <div className="profile profile3"><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa3"}/></div>
        <div className="profile profile4"><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa4"}/></div>
        <div className="profile profile5"><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa5"}/></div>
        <div className="profile profile6"><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa6"}/></div>
        <div className="profile profile7"><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa7"}/></div>
        <div className="profile profile8"><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa8"}/></div>
        <div className="profile profile9"><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa9"}/></div>
    </div>
  )
}

export default Table;