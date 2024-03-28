import React from 'react';
import './card.css';
import cardBackLight from './../../assets/images/card-design-light.png';
import cardBackDark from './../../assets/images/card-design-dark.png';

import { useSettings } from '../../Utiles/SettingsContext';


const Card = ({card,styleClass,flippingCard, flippedStyle}) => {
  const {theme} = useSettings();
  return (
    <div className={`${styleClass} ${flippingCard ? `flippedCard ${flippedStyle}` : ""}`}>
        <img className="CardBack" src={theme === "light" ? cardBackLight : cardBackDark} alt="card"/> 
        {card ? <img className="CardFront" src={require(`./../../assets/images/card_front/${card[0]}_of_${card[1]}.png`)} alt="card"/> : null}
    </div>
  )
}

export default Card;