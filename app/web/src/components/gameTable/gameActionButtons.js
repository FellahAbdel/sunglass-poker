import React  from 'react';
import styles from './gameActionButtons.module.css';
import RaiseSlider from './RaiseSlider';

const gameActionButtons = () => {
    const checkValue = true;
    let checkOrCall = checkValue ? 'Check' : 'Call';

  return (
    <>
    <div className={`${styles.actionButtons}`}>
          <button className={`${styles.raise}`}>Raise</button>
          <button className={`${styles.checkOrCall}`}>{checkOrCall}</button>
          <button className={`${styles.Fold}`}>Fold</button>
      </div>
      <div className={`${styles.raiseSlider}`}> <RaiseSlider/> </div>
    </>
  )
}

export default gameActionButtons;