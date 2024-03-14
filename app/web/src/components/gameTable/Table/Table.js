import React , {useState} from 'react';
import './table.css';
import './tableCards.css'
import './textGlitch.css';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import Window from "../../connectionWindow/Window";
import { useAuth, getUserInfo,AuthProvider  } from "../../AuthProvider";
import PlayersPlacements from './PlayersPlacements';
import CardsPlacements from './CardsPlacements';



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
        </>)}

    </div>
  )
}

export default Table;