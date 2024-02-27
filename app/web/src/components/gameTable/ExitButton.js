import React from 'react';
import styles from './exitButton.module.css';

const ExitButton=() =>{
    const handleClick = () => {}
    return (
        <div className={`${styles.exitButton}`} onClick={handleClick}>
            Exit
        </div>
    )
}

export default ExitButton;