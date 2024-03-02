import React from 'react';
import './gameTable.css';
import '../components/gameTable/animations.css'
import Navbar from '../components/gameTable/Navbar';
import BonusPanel from '../components/gameTable/BonusPanel';
import Table from '../components/gameTable/Table';
import GameActionPanel from '../components/gameTable/GameActionPanel';
import HandCards from '../components/gameTable/HandCards';

function gameTable() {
  return (
    <div className="container-main"> 
      <div className="background"></div>
      <div className="backdrop"></div>
      <div className="comp-navbar"><Navbar/></div>
      
      
      <div className="comp-table"><Table dealingFlop={true} showCards={[0,1,2,3,4]}/></div>

      <div className="comp-bonus"><BonusPanel/></div>
      <div className="comp-gameAction"><GameActionPanel/></div>

      <div className="comp-handCards slideUp"><HandCards cardType1={"hearts"} cardNumber1={"a"} cardType2={"diamonds"} cardNumber2={"a"}/></div> 

    </div>
  );
}

export default gameTable;

