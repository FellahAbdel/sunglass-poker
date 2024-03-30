import React, { useState, useEffect } from 'react';


export default function Progressbar({ durationInSeconds }) {
    const [filled, setFilled] = useState(0);
    const [isRunning] = useState(true);

    useEffect(() => {
        let timeout;
        if (filled < 100 && isRunning) {
            timeout = setTimeout(() => setFilled(prev => prev + 2), durationInSeconds * 1000 / 50);
        }
        return () => clearTimeout(timeout);
    }, [filled, isRunning, durationInSeconds]);

    const getTimeToFinish = () => {
        const remainingPercent = 100 - filled;
        const timeToFinishInSeconds = remainingPercent * durationInSeconds / 50 / 2; // Each step takes 50 milliseconds, and each step covers 2%
        return timeToFinishInSeconds;
    };

    return (
        <div>
            <div className="progressBar">
                <div style={{
                    height: "100%",
                    width: `${filled}%`,
                    backgroundColor: "#00a674",
                    boxShadow: "inset 0 0 10px 1px rgb(0, 255, 98)",
                    transition: "width 0.5s"    
                }}></div>
                <span className="progressPercent">{getTimeToFinish()}s</span>
            </div>
        </div>
    );
}
