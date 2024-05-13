import React from "react";
import "./bonusPanel.css";
import * as actions from "../../../store/actions/clientInteractionsCreator.js";
import Button from "../../button/Button.tsx";
import Clubs from "./../../assets/images/icons/white/club.png";
import Diamonds from "./../../assets/images/icons/white/diamon.png";
import Hearts from "./../../assets/images/icons/white/heart.png";
import Spades from "./../../assets/images/icons/white/spade.png";
import { useTranslation } from "../../Utiles/Translations";
import { useDispatch } from "react-redux";

const BonusPanel = ({nbHearts, nbDiamonds, nbSpades, nbClubs}) => {
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

  const { getTranslatedWord } = useTranslation();

  const dispatch = useDispatch();

  // Function to handle the bonus activation action
  const handleActivateBonus = () => {
    dispatch(actions.activateBonus());
  };

  return (
    <div className="panel-bonus">
      <div className="container-bonusCards">
        <img src={Hearts} alt="Heart" className={`box-${nbHearts}`} />
        <img
          src={Diamonds}
          alt="Diamond"
          className={`box-${nbDiamonds}`}
        />
        <img src={Spades} alt="Spade" className={`box-${nbSpades}`} />
        <img src={Clubs} alt="Club" className={`box-${nbClubs}`} />
      </div>

      <Button
        styleClass={"btn-bonus back-color1"}
        onClick={handleActivateBonus}
        label={getTranslatedWord("bonus.bonus")}
      />
    </div>
  );
};

export default BonusPanel;
