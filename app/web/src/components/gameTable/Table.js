import React from 'react';
import styles from './table.module.css'
import ClientsProfile from './ClientsProfile';

const Table = () => {
  return (
    <div className={`${styles.table}`}>
        <div className={`${styles.cardsPlacement}`}>
          <div className={`${styles.tableCards}`}>
          <div className={`${styles.sunGlassText}`}>Sun Glass Poker</div>

          </div>
          <div className={`${styles.dealerCards}`}></div>
        </div>

        <div className={`${styles.profile} ${styles.clientsProfile0}`}><ClientsProfile status={"Waiting"} chips={9999999} name={"Mostafa0"}/></div>
        <div className={`${styles.profile} ${styles.clientsProfile1}`}><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa1"}/></div>
        <div className={`${styles.profile} ${styles.clientsProfile2}`}><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa2"}/></div>
        <div className={`${styles.profile} ${styles.clientsProfile3}`}><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa3"}/></div>
        <div className={`${styles.profile} ${styles.clientsProfile4}`}><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa4"}/></div>
        <div className={`${styles.profile} ${styles.clientsProfile5}`}><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa5"}/></div>
        <div className={`${styles.profile} ${styles.clientsProfile6}`}><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa6"}/></div>
        <div className={`${styles.profile} ${styles.clientsProfile7}`}><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa7"}/></div>
        <div className={`${styles.profile} ${styles.clientsProfile8}`}><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa8"}/></div>
        <div className={`${styles.profile} ${styles.clientsProfile9}`}><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa9"}/></div>
    </div>
  )
}

export default Table;