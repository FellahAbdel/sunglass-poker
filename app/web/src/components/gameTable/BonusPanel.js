import React from "react";
import styles from './BonusPanel.module.css';

import Clubs from './images/card_type/Clubs.png';
import Diamonds from './images/card_type/Diamons.png';
import Hearts from './images/card_type/Hearts.png';
import Spades from './images/card_type/Spades.png';

function BonusPanel(){
    return (
        <div className={`${styles.bonusPanel}`}>
            <div className={`${styles.cardPanel}`}>
                <img src={Hearts} alt="Heart" className={`${styles.box}`}></img>
                <img src={Diamonds} alt="Diamond" className={`${styles.box}`}></img>
                <img src={Spades} alt="Spade" className={`${styles.box}`}></img>
                <img src={Clubs} alt="Club" className={`${styles.box}`}></img>
            </div>

            <div className={`${styles.bonusButton}`}>
                <button class={`${styles.buttonPushable}`}>
                <span class={`${styles.buttonShadow}`}></span>
                <span class={`${styles.buttonEdge}`}></span>
                <span class={`${styles.buttonFront}`}>
                    Bonus
                </span>
                </button>
            </div>
        </div>
    );
};

export default BonusPanel;