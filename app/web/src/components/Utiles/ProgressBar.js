import React, { useState, useEffect } from "react";

/**
 * Progressbar component that visually counts down to a specified end time and displays a filling bar.
 *
 * Props:
 *  - eventTimestamp: The end time in milliseconds since the epoch.
 */
export default function Progressbar({ eventTimestamp }) {
  const [remainingTime, setRemainingTime] = useState(0);
  const [filled, setFilled] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  // Initialize total duration and remaining time
  useEffect(() => {
    const now = Date.now();
    const initialRemainingTime = (eventTimestamp - now) / 1000;
    setRemainingTime(initialRemainingTime > 0 ? initialRemainingTime : 0);
    setTotalDuration(initialRemainingTime);
  }, [eventTimestamp]);

  // Effect to update the remaining time and filled percentage
  useEffect(() => {
    const updateRemainingTime = () => {
      const now = Date.now();
      const timeRemaining = (eventTimestamp - now) / 1000;
      setRemainingTime(timeRemaining > 0 ? timeRemaining : 0);

      // Calculate filled percentage based on total duration
      const filledPercentage = ((totalDuration - timeRemaining) / totalDuration) * 100;
      setFilled(filledPercentage > 0 ? filledPercentage : 0);
    };

    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, [eventTimestamp, totalDuration]);

  return (
    <div>
      <div className="progressBar">
        <div
          style={{
            height: "100%",
            width: `${filled}%`,
            backgroundColor: "#00a674",
            boxShadow: "inset 0 0 10px 1px rgb(0, 255, 98)",
            transition: "width 1s ease-in-out",
          }}
        ></div>
        <span className="progressPercent">{Math.floor(remainingTime)}s</span>
      </div>
    </div>
  );
}
