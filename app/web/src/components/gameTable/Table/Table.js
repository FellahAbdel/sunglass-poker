import React , {useState} from 'react';
import './table.css';
import './tableCards.css'
import './textGlitch.css';
import PlayersProfile from '../PlayersProfile/PlayersProfile';
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
            <Card  style={"cardDuck"}  card={null} flippedStyle={null} flippingCard={false}/>
            
            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition1 profile0cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition2 profile0cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>

            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition1 profile1cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition2 profile1cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>

            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition1 profile2cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition2 profile2cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            
            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition1 profile3cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition2 profile3cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>

            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition1 profile4cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition2 profile4cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>

            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition1 profile5cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition2 profile5cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>

            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition1 profile6cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition2 profile6cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>

            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition1 profile7cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition2 profile7cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>

            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition1 profile8cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition2 profile8cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            
            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition1 profile9cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>
            <Card  style={`cardPlayer ${dealingFlop[0] ? "transition2 profile9cards": ""}`}  card={null} flippedStyle={null} flippingCard={false}/>

            
          </div>  
{/* 
          <div className='container-cardDistribution'>
            {/* <img className="cardPlayer0" src={cardBack}/> 
          </div> */}

        </div>


        <span className={`profiles ${profileMenuActive || settingsMenuActive ? 'disappear' : ""}`}>
          <div className="profile profile0"><PlayersProfile status={"Checked"} chips={9999999} name={"Mostafa0"}/></div>
          <div className="profile profile1"><PlayersProfile status={"Fold"} chips={9999999} name={"Mostafa1"}/></div>
          <div className="profile profile2"><PlayersProfile status={"Waiting"} chips={9999999} name={"Mostafa2"}/></div>
          <div className="profile profile3"><PlayersProfile status={"Raised"} chips={9999999} name={"Mostafa3"}/></div>
          <div className="profile profile4"><PlayersProfile status={"Raised"} chips={9999999} name={"Mostafa4"}/></div>
          <div className="profile profile5"><PlayersProfile status={"Checked"} chips={9999999} name={"Mostafa5"}/></div>
          <div className="profile profile6"><PlayersProfile status={"Fold"} chips={9999999} name={"Mostafa6"}/></div>
          <div className="profile profile7"><PlayersProfile status={"Checked"} chips={9999999} name={"Mostafa7"}/></div>
          <div className="profile profile8"><PlayersProfile status={"Empty"} chips={""} name={""}/></div>
          <div className="profile profile9"><PlayersProfile status={"Called"} chips={9999999} name={"Mostafa9"}/></div>
        </span>







        {profileMenuActive ?  <ProfileMenu userInfoProp={userInfo}/> : null }
        {settingsMenuActive ?  <SettingsMenu /> : null }



    </div>
  )
}

export default Table;