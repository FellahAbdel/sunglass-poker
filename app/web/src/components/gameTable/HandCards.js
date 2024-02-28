import React from 'react';
import Styles from './handCards.module.css';

const HandCards = ({cardType1 , cardNumber1 , cardType2, cardNumber2}) => {
    const handGuide = "Full House";



    return (
    <div className={`${Styles.container}`}>
        <div className={`${Styles.handGuide}`}>{handGuide}!</div>
        <div className={`${Styles.cardDuo}`}>     
            <img className={`${Styles.card}`} src={require(`./images/card_front/${cardNumber1}_of_${cardType1}.png`)} alt="Card1"/>
            <img className={`${Styles.card}`} src={require(`./images/card_front/${cardNumber2}_of_${cardType2}.png`)} alt="Card2"/>
        </div>  
    </div>
    )
}

export default HandCards