import React, {useState} from "react";
import './bonusPanel.css';
import Button from "../../button/Button.tsx";
import Clubs from './../../assets/images/card_type/Clubs.png';
import Diamonds from './../../assets/images/card_type/Diamons.png';
import Hearts from './../../assets/images/card_type/Hearts.png';
import Spades from './../../assets/images/card_type/Spades.png';

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
    const handleChangeSpades = 2;
    const handleChangeClubs = 3;
    return (
        <div className="panel-bonus">
            <div className="container-bonusCards">
                <img src={Hearts} alt="Heart" className={`container-cardType box-${handleChangeHearts}`}/>
                <img src={Diamonds} alt="Diamond" className={`container-cardType box-${handleChangeDiamonds}`}/>
                <img src={Spades} alt="Spade" className={`container-cardType box-${handleChangeSpades}`}/>
                <img src={Clubs} alt="Club" className={`container-cardType box-${handleChangeClubs}`}/>
            </div>

            <Button style={"btn-bonus"} label={"BONUS"}/>
        </div>
    );
};

export default BonusPanel;