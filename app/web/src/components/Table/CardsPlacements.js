import React from "react";
import Card from "../gameTable/Card/Card";
import TextGlitch from "./../TextGlitch/TextGlitch";

// Redux
import { useSelector } from "react-redux";

const CardsPlacements = ({
  moneyPot,
  dealingFlop,
  disappear,
  playersCardDistributedProp,
}) => {
  // We got the communtiy cards from the redux store
  const communityCards = useSelector(
    (state) => state.game.gameClass.pokerTable.communityCards
  );

  return (
    <div className={`container-cards ${disappear ? "disappear" : ""}`}>
      <div className={`container-moneyPot`}>{moneyPot.toLocaleString()}$</div>

      {/* {dealingFlop[0] ? false : 
          
            <TextGlitch children={"SunGlassPoker"}/>
          } */}

      <div className="container-tableCards">
        {/* first three flops -> dealingFlop[0]
            first forth flops -> dealingFlop[1]
            first fifth flops -> dealingFlop[2] */}
        {communityCards.map((card, index) => (
          <Card
            key={index}
            card={card.getNumberAndColor()}
            styleClass={`tableCard`}
            flippedStyle={`dealingFlop${index}`}
            flippingCard={dealingFlop[index]}
          />
        ))}
      </div>

      <div className="container-dealerDuck">
        <Card
          styleClass={"cardDuck"}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        {playersCardDistributedProp.map((player, index) => (
          <React.Fragment key={index}>
            <Card
              styleClass={`cardPlayer ${
                player ? `transition1 profile${index}cards` : ""
              }`}
              card={null}
              flippedStyle={null}
              flippingCard={false}
            />
            <Card
              styleClass={`cardPlayer ${
                player ? `transition2 profile${index}cards` : ""
              }`}
              card={null}
              flippedStyle={null}
              flippingCard={false}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CardsPlacements;
