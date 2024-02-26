import React from 'react';
import styles from './gameTable.module.css';
import Navbar from '../components/gameTable/Navbar';
import BonusPanel from '../components/gameTable/BonusPanel';

function gameTable() {
  return (
    <div className={`${styles.mainContainer}`}> 
      <div className={`${styles.Navbar}`}><Navbar/></div>
      {/* <div className={`${styles.BonusPanel}`}><BonusPanel/></div> */}
    </div>
  );
}

export default gameTable;
