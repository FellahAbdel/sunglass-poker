import React , {useState} from 'react';
import './table.css';
import './tableCards.css'
import './textGlitch.css';
import ClientsProfile from '../ClientsProfile';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import cardBack from './../../assets/images/card-design.png';


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
            <div className={`tableCard  ${dealingFlop[0] ? "dealingFlop0 flipped" : ""}`}>
              <img className="tableCardBack " src={cardBack} alt="card0"/>
              <img className="tableCardFront" src={require('./../../assets/images/card_front/2_of_clubs.png')} alt="card0"/>
            </div>
            
            <div className={`tableCard  ${dealingFlop[0] ? "dealingFlop1 flipped" : ""}`}>
              <img className="tableCardBack " src={cardBack} alt="card1"/>
              <img className="tableCardFront" src={require('./../../assets/images/card_front/3_of_clubs.png')} alt="card1"/>
            </div>

            <div className={`tableCard  ${dealingFlop[0] ? "dealingFlop2 flipped" : ""}`}>
              <img className="tableCardBack " src={cardBack} alt="card2"/>
              <img className="tableCardFront" src={require('./../../assets/images/card_front/4_of_clubs.png')} alt="card2"/>
            </div>

            <div className={`tableCard  ${dealingFlop[1] ? "dealingFlop3 flipped" : ""}`}>
              <img className="tableCardBack " src={cardBack} alt="card3"/>
              <img className="tableCardFront" src={require('./../../assets/images/card_front/5_of_clubs.png')} alt="card3"/>
            </div>

            <div className={`tableCard  ${dealingFlop[2] ? "dealingFlop4 flipped" : ""}`}>
              <img className="tableCardBack " src={cardBack} alt="card4"/>
              <img className="tableCardFront" src={require('./../../assets/images/card_front/6_of_clubs.png')} alt="card4"/>
            </div>


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