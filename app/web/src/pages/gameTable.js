// Import React and any other dependencies
import React from 'react';
import Navbar from '../components/gameTable/Navbar';
import BonusWindow from '../components/gameTable/BonusPanel';

function gameTable() {
  return (
    <div> 
      <Navbar/>
      <BonusWindow/>
    </div>
  );
}

export default gameTable;
