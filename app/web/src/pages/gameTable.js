import React from 'react';
import styles from './gameTable.module.css';
import Navbar from '../components/gameTable/Navbar';
import BonusPanel from '../components/gameTable/BonusPanel';
import Table from '../components/gameTable/Table';

function gameTable() {
  return (
    <div className={`${styles.mainContainer}`}> 
      <div className={`${styles.backdrop}`}></div>
      <div className={`${styles.Navbar}`}><Navbar/></div>
      <div className={`${styles.BonusPanel}`}><BonusPanel/></div>
      <div className={`${styles.Table}`}><Table/></div>

    </div>
  );
}

export default gameTable;
