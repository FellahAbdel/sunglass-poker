import React from 'react';
import './handCards.css';
import Card from '../Card/Card.js'

const HandCards = ({card1 , card2 , handGuideProp , showHandCardProp}) => {

    return (
    <div className="container-hand">
        {handGuideProp ? <div className="hand-guide slideUp">{handGuideProp}!</div> : null }
        <div className="container-handCard">     
            {/* <img className="handCard" src={require(`./images/card_front/${cardNumber1}_of_${cardType1}.png`)} alt="Card1"/>
            <img className="handCard" src={require(`./images/card_front/${cardNumber2}_of_${cardType2}.png`)} alt="Card2"/> */}
            <Card styleClass="handCard" card={card1} flippingCard={showHandCardProp}/>
            <Card styleClass="handCard" card={card2} flippingCard={showHandCardProp}/>
        </div>  
    </div>
    )
}

export default HandCards