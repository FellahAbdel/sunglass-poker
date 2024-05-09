import React, { useState, useEffect } from "react";

export default function Progressbar({ durationInSeconds }) {
  const [count, setCount] = useState(durationInSeconds);
  const [filled, setFilled] = useState(0);

  //counting from durationInSeconds to 0 and calculating filled as a percentage of durationInSeconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(interval);
    }

    setFilled(((durationInSeconds - count) / durationInSeconds) * 100);

    return () => clearInterval(interval);
  }, [count, durationInSeconds]);

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
        <span className="progressPercent">{count}s</span>
      </div>
    </div>
  );
}
