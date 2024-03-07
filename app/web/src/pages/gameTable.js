import React, { useState } from 'react';
import './gameTable.css';
import '../components/gameTable/animations.css';
import Navbar from '../components/gameTable/Navbar';
import BonusPanel from '../components/gameTable/BonusPanel';
import Table from '../components/gameTable/Table/Table';
import GameActionPanel from '../components/gameTable/GameActionPanel';
import HandCards from '../components/gameTable/HandCards';

const GameTable = () => {
  const [dealingFlop, setDealingFlop] = useState([false,false,false]);
  const [handGuide, setHandGuide ] = useState("");
  const [profileMenu , setProfileMenu] = useState(false);
  const [settingsMenu , setSettingsMenu] = useState(false);
  const [showHandCard, setShowHandCard] = useState(false);

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
    console.log('handleFold function called from parent component');
  }
  const handleRaise = () => {
    console.log('handleFold function called from parent component');
  }


  return (
    <div className="container-main"> 
      <div className="background"></div>
      <div className="backdrop"></div>
      <div className="comp-navbar">
        <Navbar
          exitOnClick={null}
          settingsOnClick={handleSettingsMenu}
          profileOnClick={handleProfileMenu}
        />
      </div>
      
      
      <div className="comp-table"><Table dealingFlop={dealingFlop} showCards={[0,1,2,3,4]} profileMenuActive={profileMenu} settingsMenuActive={settingsMenu}/></div>

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

    </div>
  );
}

export default GameTable;

