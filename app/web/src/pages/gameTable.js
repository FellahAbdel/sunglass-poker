import React from 'react';
import styles from './gameTable.module.css';

import Navbar from '../components/gameTable/Navbar';
import BonusPanel from '../components/gameTable/BonusPanel';
import Table from '../components/gameTable/Table';
import GameActionButtons from '../components/gameTable/GameActionButtons.js';

function gameTable() {
  return (
    <div className={`${styles.mainContainer}`}> 
      <div className={`${styles.backdrop}`}></div>
      <div className={`${styles.navbar}`}><Navbar/></div>
      
      
      <div className={`${styles.table}`}><Table/></div>

      <div className={`${styles.bonusPanel}`}><BonusPanel/></div>
      <div className={`${styles.gameActionButtons}`}><GameActionButtons/></div>
    </div>
  );
}

export default gameTable;
