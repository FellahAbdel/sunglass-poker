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

  const handleProfileMenu = () => {
    setProfileMenu(!profileMenu);
  }

  
  const handleFold = () => {
    console.log('handleFold function called from parent component');
    setDealingFlop([!dealingFlop[0],!dealingFlop[1],!dealingFlop[2]]);
    setHandGuide("Full House");
  }
  const handleCheckOrCall = () => {
    console.log('handleFold function called from parent component');
    setDealingFlop([dealingFlop[0],!dealingFlop[1],dealingFlop[2]]);
  }
  const handleRaise = () => {
    console.log('handleFold function called from parent component');
    setDealingFlop([dealingFlop[0],dealingFlop[1],!dealingFlop[2]]);
  }


  return (
    <div className="container-main"> 
      <div className="background"></div>
      <div className="backdrop"></div>
      <div className="comp-navbar">
        <Navbar
          exitOnClick={null}
          settingsOnClick={null}
          profileOnClick={handleProfileMenu}
        />
      </div>
      
      
      <div className="comp-table"><Table dealingFlop={dealingFlop} showCards={[0,1,2,3,4]} menuActive={profileMenu}/></div>

      <div className={`comp-bonus  ${profileMenu ? "slideDown": "slideUp"}`}><BonusPanel/></div>
      <div className={`comp-gameAction ${profileMenu ? "slideDown": "slideUp"}`}>
        <GameActionPanel
            handleFoldProp={handleFold}
            handleRaiseProp={handleRaise}
            handleCheckOrCallProp={handleCheckOrCall}
        />
        </div>

      <div className={`comp-handCards ${profileMenu ? "slideDown": "slideUp"}`}><HandCards cardType1={"hearts"} cardNumber1={"a"} cardType2={"diamonds"} cardNumber2={"a"} handGuideProp={handGuide}/></div> 

    </div>
  );
}

export default GameTable;

