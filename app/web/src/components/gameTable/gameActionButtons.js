import React  from 'react';
import styles from './gameActionButtons.module.css';
import RaiseBar from './RaiseBar';

function gameActionButtons() {
    const checkValue = true;
    let checkOrCall = checkValue ? 'Check' : 'Call';


  return (
    <div className={`${styles.actionButtons}`}>
          <button className={`${styles.raise}`}>Raise</button>
          <button className={`${styles.checkOrCall}`}>{checkOrCall}</button>
          <button className={`${styles.Fold}`}>Fold</button>
          <div className={`${styles.raiseBar}`}>
          <div className={`${styles.progressBar}`}></div>
          <RaiseBar/>
          </div>
    </div>
  )
}

export default gameActionButtons;