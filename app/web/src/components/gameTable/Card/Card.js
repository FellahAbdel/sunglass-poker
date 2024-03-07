import React from 'react';
import './card.css';
import cardBack from './../../assets/images/card-design.png';


const Card = ({card,style,flippingCard, flippedStyle}) => {
  return (
    <div className={`${style} ${flippingCard ? `flippedCard ${flippedStyle}` : ""}`}>
        <img className="CardBack" src={cardBack} alt="card"/>
        <img className="CardFront" src={require(`./../../assets/images/card_front/${card[0]}_of_${card[1]}.png`)} alt="card"/>
    </div>
  )
}

export default Card;