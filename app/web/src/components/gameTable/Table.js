import React from 'react';
import styles from './table.module.css'

const Table = () => {
  return (
    <div className={`${styles.table}`}>
        <div className={`${styles.cardsPlacement}`}>
            <div className={`${styles.sunGlassText}`}>Sun Glass Poker</div>
        </div>
        <div className={`${styles.cardDuckPlacement}`}></div>
    </div>
  )
}

export default Table;