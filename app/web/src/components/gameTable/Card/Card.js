import React from 'react';
import './card.css';
import cardBack from './../images/card-design.png';


const Card = ({card,style,flippingCard}) => {
  return (
    <div className={`card ${style} ${flippingCard ? "flippedCard" : ""}`}>
        <img className="CardBack " src={cardBack} alt="card"/>
        <img className="CardFront" src={require(`./../images/card_front/${card[0]}_of_${card[1]}.png`)} alt="card"/>
    </div>
  )
}

export default Card;