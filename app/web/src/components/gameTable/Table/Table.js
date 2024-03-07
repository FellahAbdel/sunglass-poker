import React , {useState} from 'react';
import './table.css';
import './tableCards.css'
import './textGlitch.css';
import ClientsProfile from '../PlayersProfile/PlayersProfile';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import cardBack from './../../assets/images/card-design.png';
import Card from '../Card/Card';


const Table = ({dealingFlop, showCards, profileMenuActive, settingsMenuActive}) => {
  //name , user ID , level , games played , winning ratio , joined Date 
  const userInfo = ["Mostafa","otsuno" , "100", "5" , "30%","10/march/2024"];

  return (
    <div className={`container-table ${profileMenuActive || settingsMenuActive ? 'container-menu' : ""}`}>

        <div className={`container-cards ${profileMenuActive || settingsMenuActive ? 'disappear' : ""}`}>

          {dealingFlop[0] ? false : 
            <div class="glitch-wrapper">
              <div class="glitch" data-glitch="SunGlassPoker">SunGlassPoker</div>
            </div>
          }
          <div className="container-tableCards">

            {/* first three flops -> dealingFlop[0]
            first forth flops -> dealingFlop[1]
            first fifth flops -> dealingFlop[2] */}

            <Card card={["2","clubs"]} style={`tableCard`} flippedStyle={"dealingFlop0"} flippingCard={dealingFlop[0]}/>
            <Card card={["3","clubs"]} style={"tableCard"} flippedStyle={"dealingFlop1"} flippingCard={dealingFlop[0]}/>
            <Card card={["4","clubs"]} style={"tableCard"} flippedStyle={"dealingFlop2"} flippingCard={dealingFlop[0]}/>
            <Card card={["5","clubs"]} style={"tableCard"} flippedStyle={"dealingFlop3"} flippingCard={dealingFlop[1]}/>
            <Card card={["6","clubs"]} style={"tableCard"} flippedStyle={"dealingFlop4"} flippingCard={dealingFlop[2]}/>


          </div>  

          <div className="container-dealerDuck">
            <img src={cardBack} alt=""/>
          </div>
        </div>
        <span className={`profiles ${profileMenuActive || settingsMenuActive ? 'disappear' : ""}`}>
          <div className="profile profile0"><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa0"}/></div>
          <div className="profile profile1"><ClientsProfile status={"Fold"} chips={9999999} name={"Mostafa1"}/></div>
          <div className="profile profile2"><ClientsProfile status={"Waiting"} chips={9999999} name={"Mostafa2"}/></div>
          <div className="profile profile3"><ClientsProfile status={"Raised"} chips={9999999} name={"Mostafa3"}/></div>
          <div className="profile profile4"><ClientsProfile status={"Raised"} chips={9999999} name={"Mostafa4"}/></div>
          <div className="profile profile5"><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa5"}/></div>
          <div className="profile profile6"><ClientsProfile status={"Fold"} chips={9999999} name={"Mostafa6"}/></div>
          <div className="profile profile7"><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa7"}/></div>
          <div className="profile profile8"><ClientsProfile status={"Empty"} chips={""} name={""}/></div>
          <div className="profile profile9"><ClientsProfile status={"Called"} chips={9999999} name={"Mostafa9"}/></div>
        </span>

          {profileMenuActive ?  <ProfileMenu userInfoProp={userInfo}/> : null }
          {settingsMenuActive ?  <SettingsMenu /> : null }

    </div>
  )
}

export default Table;