import React , {useState} from 'react';
import { useAuth, getUserInfo , AuthProvider  } from "../../AuthProvider";
//CSS
import './table.css';
import './tableCards.css'
//Components
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import Window from "../../connectionWindow/Window";
import PlayersPlacements from './PlayersPlacements';
import CardsPlacements from './CardsPlacements';
import TextGlitch from './../TextGlitch/TextGlitch';
import LogoComponent from '../../logo/Logo';
import Tutorial from './../Tutorial/Tutorial';
import Button from './../Button/Button.tsx';
import HandCards from '../HandCards/HandCards';

const Table = ({
    dealingFlop, //a list of 3 booleans , to deal the first 3 cards , second 4th card , third 5th card
    showCards,
    profileMenuActive, // a boolean to open the profile menu
    settingsMenuActive, // a boolean to open the settings menu
    playersCardDistributedProp, // a list of 10 booleans to distribute to choosen players
    playersCardsShowProp, // a list of 10 booleans to show the cards of choosen players
    moneyPot, // money on the table
    logingInMenuActive, // to see if the page is logged in
    tutorialMenuActive,
    isLoggedOnClick, //temprory
    isLogged, // temprory
    openWindow, isWindowOpen, windowType, closeWindow
  }) => {
    
  const {  logingIn, logingOut, getUserInfo } = useAuth();



  //name , user ID , level , games played , winning ratio , joined Date 
  const userInfo = ["Mostafa","otsuno" , "100", "5" , "30%","10/march/2024"];

  return (

    // Table that becomes a container for the menus when they are activated 
    // container-table : main css for game table
    // container-menu : table css for settings and profile menu
    // container-logIn : css for when user click on logIn button for table menu to open
    // container-acceuil : for the table to show up in acceuil when game opens
    // container-tutorial : for tuto
    <div className={`
      container-table 
      ${(profileMenuActive || settingsMenuActive) && 'container-menu' } 
      ${!isLogged && "container-acceuil"}
      ${tutorialMenuActive && !isLogged && "container-tutorial"}
      ${logingInMenuActive && !isLogged && "container-logIn"}  
      `}>

    {/* Acceuil table if not logged in and game table if logged in */}
    {isLogged ? (<>

        {/* cards and the pot in the center of the table */}
        <CardsPlacements
          moneyPot={moneyPot}
          dealingFlop={dealingFlop}
          disappear={profileMenuActive || settingsMenuActive}
          playersCardDistributedProp={playersCardDistributedProp}
        />

        {/* players around the table */}
        <PlayersPlacements 
          playersCardDistributedProp={playersCardDistributedProp}
          playersCardsShowProp={playersCardsShowProp}
          disappear={profileMenuActive || settingsMenuActive}
        />

        {/* Profile menu panel */}
        {profileMenuActive ?  <ProfileMenu userInfoProp={userInfo}/> : null }

        {/* Settings menu panel */}
        {settingsMenuActive ?  <SettingsMenu /> : null }

      </>): (<>
        

        {/* Acceuil */}

          {/* dynamique logo , moves according to the menu that is open */}
          <LogoComponent 
            style={`
              logo-acceuil
              ${tutorialMenuActive && 'logo-tutorial'}
              ${logingInMenuActive && "logo-login"}
            `}
          />




          {isWindowOpen ? (
          <Window
            onClose={closeWindow}
            windowType={windowType}
            logingIn={logingIn}
            logingOut={logingOut}
          />
          ) : (<>
            
            {tutorialMenuActive ? 
            (
            <Tutorial style="text-tutorial"/>
            ) : ( <>
            <TextGlitch children={"SunGlassPoker"} style={"glitch-accueil"} glitchStyle={"glitchStyle-accueil"}/>
            <Button style={"btn-gameStart"} children={"Start Playing"} onClick={isLoggedOnClick}/>
            </>)}

          </>)}
        



        </>)}

    </div>
  )
}

export default Table;