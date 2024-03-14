import React , {useState} from 'react';
import './table.css';
import './tableCards.css'
import './textGlitch.css';
import PlayersProfile from '../PlayersProfile/PlayersProfile';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import cardBack from './../../assets/images/card-design.png';
import Card from '../Card/Card';
import Window from "../../connectionWindow/Window";
import { useAuth, getUserInfo,AuthProvider  } from "../../AuthProvider";



const Table = ({
    dealingFlop,
    showCards,
    profileMenuActive,
    settingsMenuActive,
    playersCardDistributedProp,
    playersCardsShowProp,
    moneyPot,
    isLoggedTable,
    openWindow, isWindowOpen, windowType, closeWindow
  }) => {
    
  const { isLogged, logingIn, logingOut, getUserInfo } = useState();


  //name , user ID , level , games played , winning ratio , joined Date 
  const userInfo = ["Mostafa","otsuno" , "100", "5" , "30%","10/march/2024"];

  return (
    <div className={`container-table ${profileMenuActive || settingsMenuActive ? 'container-menu' : ""}`}>


    {isLoggedTable ? (<>
        <div className={`container-cards ${profileMenuActive || settingsMenuActive ? 'disappear' : ""}`}>
          
          <div className={`container-moneyPot`}>{moneyPot.toLocaleString()}$</div>

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
            <Card  style={"cardDuck"}  card={null} flippedStyle={null} flippingCard={false}/>
            
            <Card  style={`cardPlayer ${playersCardDistributedProp[0] ? "transition1 profile0cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${playersCardDistributedProp[0] ? "transition2 profile0cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>

            <Card  style={`cardPlayer ${playersCardDistributedProp[1] ? "transition1 profile1cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${playersCardDistributedProp[1] ? "transition2 profile1cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>

            <Card  style={`cardPlayer ${playersCardDistributedProp[2] ? "transition1 profile2cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${playersCardDistributedProp[2] ? "transition2 profile2cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            
            <Card  style={`cardPlayer ${playersCardDistributedProp[3] ? "transition1 profile3cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${playersCardDistributedProp[3] ? "transition2 profile3cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>

            <Card  style={`cardPlayer ${playersCardDistributedProp[4] ? "transition1 profile4cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${playersCardDistributedProp[4] ? "transition2 profile4cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>

            <Card  style={`cardPlayer ${playersCardDistributedProp[5] ? "transition1 profile5cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${playersCardDistributedProp[5] ? "transition2 profile5cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>

            <Card  style={`cardPlayer ${playersCardDistributedProp[6] ? "transition1 profile6cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${playersCardDistributedProp[6] ? "transition2 profile6cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>

            <Card  style={`cardPlayer ${playersCardDistributedProp[7] ? "transition1 profile7cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${playersCardDistributedProp[7] ? "transition2 profile7cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>

            <Card  style={`cardPlayer ${playersCardDistributedProp[8] ? "transition1 profile8cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${playersCardDistributedProp[8] ? "transition2 profile8cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            
            <Card  style={`cardPlayer ${playersCardDistributedProp[9] ? "transition1 profile9cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${playersCardDistributedProp[9] ? "transition2 profile9cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>

            
          </div>  
        </div>


        <span className={`profiles ${profileMenuActive || settingsMenuActive ? 'disappear' : ""}`}>
          <div className="profile profile0"><PlayersProfile status={"Checked"} chips={9999999} name={"Mostafa0"} flippingPlayerCards={playersCardsShowProp[0]} gotCards={playersCardDistributedProp[0]}/></div>
          <div className="profile profile1"><PlayersProfile status={"Fold"} chips={9999999} name={"Mostafa1"} flippingPlayerCards={playersCardsShowProp[1]} gotCards={playersCardDistributedProp[1]}/></div>
          <div className="profile profile2"><PlayersProfile status={"Waiting"} chips={9999999} name={"Mostafa2"} flippingPlayerCards={playersCardsShowProp[2]} gotCards={playersCardDistributedProp[2]}/></div>
          <div className="profile profile3"><PlayersProfile status={"Raised"} chips={9999999} name={"Mostafa3"} flippingPlayerCards={playersCardsShowProp[3]} gotCards={playersCardDistributedProp[3]}/></div>
          <div className="profile profile4"><PlayersProfile status={"Raised"} chips={9999999} name={"Mostafa4"} flippingPlayerCards={playersCardsShowProp[4]} gotCards={playersCardDistributedProp[4]}/></div>
          <div className="profile profile5"><PlayersProfile status={"Checked"} chips={9999999} name={"Mostafa5"} flippingPlayerCards={playersCardsShowProp[5]} gotCards={playersCardDistributedProp[5]}/></div>
          <div className="profile profile6"><PlayersProfile status={"Fold"} chips={9999999} name={"Mostafa6"} flippingPlayerCards={playersCardsShowProp[6]} gotCards={playersCardDistributedProp[6]}/></div>
          <div className="profile profile7"><PlayersProfile status={"Checked"} chips={9999999} name={"Mostafa7"} flippingPlayerCards={playersCardsShowProp[7]} gotCards={playersCardDistributedProp[7]}/></div>
          <div className="profile profile8"><PlayersProfile status={"Empty"} chips={""} name={""} flippingPlayerCards={playersCardsShowProp[8]} gotCards={playersCardDistributedProp[8]}/></div>
          <div className="profile profile9"><PlayersProfile status={"Called"} chips={9999999} name={"Mostafa9"} flippingPlayerCards={playersCardsShowProp[9]} gotCards={playersCardDistributedProp[9]}/></div>
        </span>

        {profileMenuActive ?  <ProfileMenu userInfoProp={userInfo}/> : null }
        {settingsMenuActive ?  <SettingsMenu /> : null }

        </>): (
            <>
      <AuthProvider>
      {isWindowOpen && (
          <Window
            onClose={closeWindow}
            windowType={windowType}
            logingIn={logingIn}
            logingOut={logingOut}
          />
        )}
        </AuthProvider>
            
            </>
    
        )}

    </div>
  )
}

export default Table;