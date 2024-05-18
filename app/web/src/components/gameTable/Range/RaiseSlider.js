import React, { useState, useEffect } from "react"; // Import useState
import Styles from "./raiseSlider.module.css";

/**
 * RaiseSlider is a controlled component that renders a slider for adjusting a numerical value.
 * It integrates with parent components via the `onSliderChange` callback.
 *
 * Props:
 *  - onSliderChange: Function to call when the slider value changes.
 *  - initialValue: Initial value for the slider.
 */
const RaiseSlider = ({ onSliderChange, initialValue }) => {
  const [sliderValue, setSliderValue] = useState(1);

  /**
   * Handles changes to the slider's position.
   * Updates internal component state and notifies parent component of the change.
   * @param {Object} event - The event object from the slider input.
   */
  const handleSliderChange = (event) => {
    const value = event.target.value;
    setSliderValue(value);
    onSliderChange(value);
  };
  // Effect hook to update the slider's value when the `initialValue` prop changes.
  useEffect(() => {
    setSliderValue(initialValue);
  }, [initialValue]);

  return (
    <div className={`${Styles.range}`}>
      <div className={`${Styles.field}`}>
        {/* <div className={`${Styles.minValue}`}></div> */}
        <input
          className={`${Styles.rangeStyle}`}
          type="range"
          min={10}
          max={100}
          step={10}
          value={sliderValue}
          onChange={handleSliderChange}
        />
        <div className={`${Styles.maxValue}`}>{sliderValue}%</div>
      </div>
    </div>
  );
};

export default RaiseSlider;
