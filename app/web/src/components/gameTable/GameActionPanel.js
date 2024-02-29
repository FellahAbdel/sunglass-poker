import React , { useState } from 'react';
import styles from './gameActionPanel.module.css';
import RaiseSlider from './RaiseSlider';

const GameActionButtons = () => {
    const checkValue = true;
    let checkOrCall = checkValue ? 'Check' : 'Call';

    const [sliderValueText, setSliderValueText] = useState("");
    const handleSliderChange = (value) => {setSliderValueText(value)};

  return (
    <div className={`${styles.container}`}>
    <div className={`${styles.actionButtons}`}>
          <button className={`${styles.raise}`}>Raise {sliderValueText ? sliderValueText + "%" : sliderValueText}</button>
          <button className={`${styles.checkOrCall}`}>{checkOrCall}</button>
          <button className={`${styles.Fold}`}>Fold</button>
      </div>
      <div className={`${styles.raiseSlider}`}> <RaiseSlider initialValue={25} onSliderChange={handleSliderChange}/> </div>
    </div>
  )
}

export default GameActionButtons;