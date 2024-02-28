import React from 'react';
import styles from './gameTable.module.css';

import Navbar from '../components/gameTable/Navbar';
import BonusPanel from '../components/gameTable/BonusPanel';
import Table from '../components/gameTable/Table';
import GameActionButtons from '../components/gameTable/GameActionButtons';
import HandCards from '../components/gameTable/HandCards'
import ClientsProfile from '../components/gameTable/ClientsProfile'

function gameTable() {
  return (
    <div className={`${styles.mainContainer}`}> 
{/*       <div className={`${styles.background}`}></div>
      <div className={`${styles.backdrop}`}></div>
      <div className={`${styles.navbar}`}><Navbar/></div>
      
      
      <div className={`${styles.table}`}><Table/></div>

      <div className={`${styles.bonusPanel}`}><BonusPanel/></div>
      <div className={`${styles.gameActionButtons}`}><GameActionButtons/></div>

      <div className={`${styles.handCards}`}><HandCards cardType1={"hearts"} cardNumber1={"a"} cardType2={"diamonds"} cardNumber2={"a"}/></div> */}
      <div className={`${styles.ClientsProfile}`}><ClientsProfile status={"waiting"} chips={9999999} name={"Mostafa"}/></div>
    </div>
  );
}

export default gameTable;
