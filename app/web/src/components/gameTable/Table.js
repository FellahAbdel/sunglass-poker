import React from 'react';
import styles from './table.module.css'
import ClientsProfile from './ClientsProfile';

const Table = () => {
  return (
    <div className={`${styles.table}`}>
        <div className={`${styles.cardsPlacement}`}>
            <div className={`${styles.sunGlassText}`}>Sun Glass Poker</div>
        </div>
        <div className={`${styles.cardDuckPlacement}`}></div>

        <div className={`${styles.clientsProfile0}`}><ClientsProfile status={"Waiting"} chips={9999999} name={"Mostafa"}/></div>
        <div className={`${styles.clientsProfile1}`}><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa"}/></div>
        <div className={`${styles.clientsProfile2}`}><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa"}/></div>
        <div className={`${styles.clientsProfile3}`}><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa"}/></div>
        <div className={`${styles.clientsProfile4}`}><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa"}/></div>
        <div className={`${styles.clientsProfile5}`}><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa"}/></div>
        <div className={`${styles.clientsProfile6}`}><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa"}/></div>
        <div className={`${styles.clientsProfile7}`}><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa"}/></div>
        <div className={`${styles.clientsProfile8}`}><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa"}/></div>
        <div className={`${styles.clientsProfile9}`}><ClientsProfile status={"Checked"} chips={9999999} name={"Mostafa"}/></div>
    </div>
  )
}

export default Table;