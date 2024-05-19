import React, { useState, useEffect, useRef, useCallback } from "react";
import Card from "../gameTable/Card/Card";
import { useGameTable } from "../Utiles/GameTableProvider";
import useDeepEffect from "../../hooks/useDeepEffect";

/**
 * CardsPlacements manages the display and animation of community cards and
 * transition animations for player cards during a game. It also handles sound effects
 * associated with card placements.
 */
const CardsPlacements = () => {
  const { communityCards } = useGameTable();
  const [flipped, setFlipped] = useState(communityCards.map(() => false)); // to stop the transition animation to happend more than once
  //playersCardDistributed for each player
  // *** also has been used in PlayersPlacements component
  // *** here only for animation purposes
  const timeoutRefs = useRef([]);

  /*DISTRIBUTION ANIMATION :
  in CardPlacements you have the distribution
  animation which gets handled with a table called 
  "playersCardDistributed" with 10 booleen members
  representing each players that gets a card*/

  // Initialize dealingFlop from local storage or set to default if not available
  const [dealingFlop, setDealingFlop] = useState(() => {
    const saved = localStorage.getItem("dealingFlop");
    return saved ? JSON.parse(saved) : [false, false, false, false, false];
  });

  useDeepEffect(() => {
    localStorage.setItem("dealingFlop", JSON.stringify(dealingFlop));
    setFlipped(flipped.map((f, index) => f || dealingFlop[index]));
  }, [dealingFlop]);

  const updateDealingFlopSequentially = useCallback(() => {
    communityCards.forEach((card, index) => {
      const timeout = setTimeout(() => {
        setDealingFlop((prev) =>
          prev.map((item, idx) => (idx === index ? card !== null : item))
        );
      }, 1000 * index);
      timeoutRefs.current.push(timeout);
    });
  }, [communityCards]);

  // Update dealingFlop based on communityCards with sequential timing
  useEffect(() => {
    if (communityCards && communityCards.length > 0) {
      updateDealingFlopSequentially();
      console.log("communityCards: ", communityCards);
    }
  }, [communityCards, updateDealingFlopSequentially]);

  // Clear timeouts on component unmount
  useEffect(() => {
    const timeouts = timeoutRefs.current;
    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Helper function to format card data for rendering
  const formatCardData = (card) => {
    return card ? [card.number.toString(), card.color] : null;
  };

  return (
    <div className={`container-cards`}>
      <div className="container-fiveCards">
        {new Array(5).fill(null).map((_, index) => (
          <Card
            key={index}
            card={formatCardData(communityCards[index])}
            styleClass={`tableCard ${flipped[index] && "flipped"}`}
            flippedStyle={`dealingFlop${index}`}
            flippingCard={dealingFlop[index]}
          />
        ))}
      </div>

      <div className="container-dealerDuck">
        <Card
          styleClass="cardDuck"
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
      </div>
    </div>
  );
};

export default CardsPlacements;
