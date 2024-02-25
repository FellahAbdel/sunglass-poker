import React from "react";
import './BonusPanel.css';

function BonusPanel(){
    return (
        <div className="bonus-panel">
            <div className="card-boxes">
                <img src="images/card_type/Hearts.png" alt="Heart" className="box"></img>
                <img src="images/card_type/Diamonds.png" alt="Diamond" className="box"></img>
                <img src="images/card_type/Spades.png" alt="Spade" className="box"></img>
                <img src="images/card_type/Clubs.png" alt="Club" className="box"></img>
            </div>
            <div className="bonus-button">
                <button class="button-82-pushable">
                <span class="button-82-shadow"></span>
                <span class="button-82-edge"></span>
                <span class="button-82-front text">
                    Bonus
                </span>
                </button>
            </div>
        </div>
    );
};

export default BonusPanel;