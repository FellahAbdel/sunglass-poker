//react imports
import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useAuth, getUserInfo, AuthProvider } from "./../components/AuthProvider";
//css imports
import './gameTable.css';
import '../components/gameTable/Utiles/animations.css';
//components imports
import Navbar from '../components/gameTable/Navbar/Navbar';
import BonusPanel from '../components/gameTable/Bonus/BonusPanel';
import Table from '../components/gameTable/Table/Table';
import GameActionPanel from '../components/gameTable/GameActionPanel/GameActionPanel';
import HandCards from '../components/gameTable/HandCards/HandCards';




const GameTable = () => {
  const [dealingFlop, setDealingFlop] = useState([false,false,false]);
  const [handGuide, setHandGuide ] = useState("");
  const [profileMenu , setProfileMenu] = useState(false);
  const [settingsMenu , setSettingsMenu] = useState(false);
  const [showHandCard, setShowHandCard] = useState(false);
  const [playersCardsShow, setPlayersCardsShow] = useState([0,0,0,0,0,0,0,0,0,0]);
  const [playersCardDistributed, setPlayersCardDistributed] = useState([0,0,0,0,0,0,0,0,0,0]);
  const [logInButton, setLogInButton] = useState();

  const { isLogged, logingIn, logingOut, getUserInfo } = useAuth();


  const handleLogIn = () => {
    setLogInButton(!logInButton);
    console.log('handleLogIn function called from parent component');
  }

  const handleShowHandCard = () => {
    setShowHandCard(!showHandCard);
  }

  const handleProfileMenu = () => {
    setProfileMenu(!profileMenu);
    if (settingsMenu) { setSettingsMenu(false) };
  }
  const handleSettingsMenu = () => {
    setSettingsMenu(!settingsMenu);
    if (profileMenu) { setProfileMenu(false) };
  }
  
  const handleFold = () => {
    console.log('handleFold function called from parent component');
    setDealingFlop([!dealingFlop[0],!dealingFlop[1],!dealingFlop[2]]);
    setHandGuide("Full House");
    setShowHandCard(!showHandCard);

  }
  const handleCheckOrCall = () => {
    setPlayersCardDistributed([!playersCardDistributed[0],!playersCardDistributed[1],!playersCardDistributed[2],!playersCardDistributed[3]]);
    console.log('handleFold function called from parent component');
  }
  const handleRaise = () => {
    console.log('handleFold function called from parent component');
    setPlayersCardsShow([!playersCardsShow[0],!playersCardsShow[1],!playersCardsShow[2]]);

  }


  return (
    <div className="container-main"> 

      {/* css Pattern background */}
      <div className="background"></div>
      <div className="backdrop"></div>


      {/* Navbar or header */}
      <div className="comp-navbar">
        <Navbar
          exitOnClick={null}
          settingsOnClick={handleSettingsMenu}
          profileOnClick={handleProfileMenu}
          //navbar changes for loggedIn
          isLoggedNavbar={isLogged}
          logInOnClick={handleLogIn}
        />
      </div>

      {/* Menu/Table */}
      <AuthProvider> 
      <div className="comp-table">
        <Table 
          dealingFlop={dealingFlop} 
          showCards={[0,1,2,3,4]} 
          playersCardDistributedProp={playersCardDistributed}
          playersCardsShowProp={playersCardsShow}
          moneyPot={9999999999}
          // to open the profile and setting menus
          profileMenuActive={profileMenu} 
          settingsMenuActive={settingsMenu}
          logingInMenuActive={logInButton}
          // LogIn panel
          isWindowOpen={logInButton}
          windowType={logInButton ? "login" : null}
          
        />
      </div>
      </AuthProvider> 

      {/* playing elements opens when logged in */}
      {isLogged && (<>

        <div className={`comp-bonus  ${profileMenu || settingsMenu ? "slideDown": "slideUp"}`}><BonusPanel/></div>
        <div className={`comp-gameAction ${profileMenu || settingsMenu  ? "slideDown": "slideUp"}`}>
          <GameActionPanel
              handleFoldProp={handleFold}
              handleRaiseProp={handleRaise}
              handleCheckOrCallProp={handleCheckOrCall}
          />
          </div>

        <div className={`comp-handCards ${profileMenu || settingsMenu  ? "slideDown": "slideUp"}`}>
          <HandCards 
            card1={["a","hearts"]}
            card2={["a","diamonds"]}
            showHandCardProp={showHandCard}
            handGuideProp={handGuide}/>
        </div> 

      </>)}


    </div>
  );
}

export default GameTable;

