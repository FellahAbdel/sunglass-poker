import React, {useState} from "react";
import styles from './bonusPanel.module.css';

import Clubs from './images/card_type/Clubs.png';
import Diamonds from './images/card_type/Diamons.png';
import Hearts from './images/card_type/Hearts.png';
import Spades from './images/card_type/Spades.png';

const BonusPanel = () => {
//we can use a number divisable by all the different numbers that they need 
//to fill the bonus boxes and back-end will manage the part of the variable
//bonus numbers to show graphiquly
/*     const [HeartsNumbers, setHeartsNumber] = useState(0);
    const [DiamondNumbers, setDiamondsNumber] = useState(0);
    const [SpadesNumbers, setSpadesNumber] = useState(0);
    const [ClubsNumbers, setClubsNumber] = useState(0);

    const handleChangeHearts = (e) => {setHeartsNumber(parseInt(e.target.value));};
    const handleChangeDiamonds = (e) => {setDiamondsNumber(parseInt(e.target.value));};
    const handleChangeSpades = (e) => {setSpadesNumber(parseInt(e.target.value));};
    const handleChangeClubs = (e) => {setClubsNumber(parseInt(e.target.value));}; */

    const handleChangeHearts = 1;
    const handleChangeDiamonds = 0;
    const handleChangeSpades = 0;
    const handleChangeClubs = 3;
    return (
        <div className={`${styles.bonusPanel}`}>
            <div className={`${styles.cardPanel}`}>
                <img src={Hearts} alt="Heart" className={`${styles.box} ${styles[`box-${handleChangeHearts}`]}`}></img>
                <img src={Diamonds} alt="Diamond" className={`${styles.box} ${styles[`box-${handleChangeDiamonds}`]}`}></img>
                <img src={Spades} alt="Spade" className={`${styles.box} ${styles[`box-${handleChangeSpades}`]}`}></img>
                <img src={Clubs} alt="Club" className={`${styles.box} ${styles[`box-${handleChangeClubs}`]}`}></img>
            </div>

            <button className={`${styles.bonusButton}`}>BONUS</button>
        </div>
    );
};

export default BonusPanel;