import React from 'react';
import './handCards.css';

const HandCards = ({cardType1 , cardNumber1 , cardType2, cardNumber2}) => {
    const handGuide = "Full House";



    return (
    <div className="container-hand-cards">
        <div className="hand-guide">{handGuide}!</div>
        <div className="container-card">     
            <img className="card" src={require(`./images/card_front/${cardNumber1}_of_${cardType1}.png`)} alt="Card1"/>
            <img className="card" src={require(`./images/card_front/${cardNumber2}_of_${cardType2}.png`)} alt="Card2"/>
        </div>  
    </div>
    )
}

export default HandCards