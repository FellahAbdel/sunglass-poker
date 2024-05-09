import React, { useState, useEffect } from "react";

export default function Progressbar({ durationInSeconds }) {
  // const [filled, setFilled] = useState(0);
  // const [timeToFinish, setTimeToFinish] = useState(durationInSeconds);

  // useEffect(() => {
  //   let timeout;
  //   if (filled < 100) {
  //     timeout = setTimeout(
  //       () => setFilled((prev) => prev + 1),
  //       (durationInSeconds * 10) 
  //     );
  //   }
  //   return () => clearTimeout(timeout);
  // }, [filled]);

  // useEffect(() => {
  //   setTimeToFinish(Math.ceil(((100 - filled) * durationInSeconds) / 100));
  // }, [filled, durationInSeconds]);


  const [count, setCount] = useState(durationInSeconds);
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount - 1);
    }, 1000);

    // Clear the interval when count reaches 0
    if (count === 0) {
      clearInterval(interval);
    }

    setFilled(((durationInSeconds - count) / durationInSeconds) * 100);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [count, durationInSeconds]); // Dependency array includes count and durationInSeconds


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
