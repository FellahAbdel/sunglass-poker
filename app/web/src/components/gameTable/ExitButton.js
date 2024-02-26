import React from 'react';
import styles from './ExitButton.module.css';

function ExitButton() {
    const handleClick = () => {}
    return (
        <div className={`${styles.exitButton}`} onClick={handleClick}>
            Exit
        </div>
    )
}

export default ExitButton;