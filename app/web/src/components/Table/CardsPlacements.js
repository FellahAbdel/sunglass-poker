import React, { useState, useEffect, useRef } from "react";
import Card from "../gameTable/Card/Card";
import useAudio from "../../hooks/useAudio";
import { useGameTable } from "../Utiles/GameTableProvider";
import useDeepEffect from "../../hooks/useDeepEffect"

/**
 * CardsPlacements manages the display and animation of community cards and
 * transition animations for player cards during a game. It also handles sound effects
 * associated with card placements.
 */
const CardsPlacements = () => {
  // const playersInTable = useSelector((state) => state.game.activePlayers);
  const { communityCards } = useGameTable();
  const [flipped, setFlipped] = useState(communityCards.map(() => false)); // to stop the transition animation to happend more than once
  //playersCardDistributed for each player
  // *** also has been used in PlayersPlacements component
  // *** here only for animation purposes
  // const [playing, togglePlay] = useAudio("static/media/assets/sounds/soundEffect-card1.mp3");
  const timeoutRefs = useRef([]);

  // useEffect(() => {
  //   console.log("playersInTable",playersInTable);
  // }, [playersInTable]);

  // const initialDistribution = Array.from({length: 10}, (_, i) => i < playersInTable.length);
  // const playersCardDistributed = useState(initialDistribution);

  const [playersCardDistributed] = useState([
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  // const updateDealingFlopIfChanged = (newFlop) => {
  //   setDealingFlop((prevFlop) => {
  //     // Check if the new flop is different from the previous
  //     const isDifferent = newFlop.some((item, index) => item !== prevFlop[index]);
  //     return isDifferent ? newFlop : prevFlop;
  //   });
  // };
  // {
  /*DISTRIBUTION ANIMATION :
  in CardPlacements you have the distribution
  animation which gets handled with a table called 
  "playersCardDistributed" with 10 booleen members
  representing each players that gets a card*/

  //default values to test ---------- have to be recived from back
  //dealingFlop for the flop river turn
  //   first three = flop  -> dealingFlop[0]
  //   forth one   = river -> dealingFlop[1]
  //   fifth one   = turn  -> dealingFlop[2]
  // const [dealingFlop, setDealingFlop] = useState([false,false,false,false,false]);

  // Audio control for flipping card sound effects
  const cardFlipSounds = [
    "static/media/assets/sounds/soundEffect-card1.mp3",
    "static/media/assets/sounds/soundEffect-card1.mp3",
    "static/media/assets/sounds/soundEffect-card1.mp3",
    "static/media/assets/sounds/soundEffect-card1.mp3",
    "static/media/assets/sounds/soundEffect-card1.mp3"  ];

  const [playing, togglePlay] = useAudio(cardFlipSounds);


  // Initialize dealingFlop from local storage or set to default if not available
  const [dealingFlop, setDealingFlop] = useState(() => {
    const saved = localStorage.getItem("dealingFlop");
    return saved ? JSON.parse(saved) : [false, false, false, false, false];
  });

  // useDeepEffect(() => {
  //   dealingFlop.forEach((flop, index) => {
  //       if (flop) {
  //           togglePlay(index); 
  //       }
  //   });
  // }, [dealingFlop]); 


  useDeepEffect(() => {
    localStorage.setItem("dealingFlop", JSON.stringify(dealingFlop));
    setFlipped(flipped.map((f, index) => f || dealingFlop[index]));
  }, [dealingFlop]);

  // Update dealingFlop based on communityCards with sequential timing
  useEffect(() => {
    if (communityCards && communityCards.length > 0) {
      updateDealingFlopSequentially();
      console.log("communityCards: ", communityCards);
    }
  }, [communityCards]);

  const updateDealingFlopSequentially = () => {
    communityCards.forEach((card, index) => {
      const timeout = setTimeout(() => {
        setDealingFlop((prev) =>
          prev.map((item, idx) => (idx === index ? card !== null : item))
        );
      }, 1000 * index);
      timeoutRefs.current.push(timeout);
    });
  };

  // Clear timeouts on component unmount
  useEffect(() => {
    return () => timeoutRefs.current.forEach(clearTimeout);
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

        {/* Unused Animation for card distribution */}
        {/* 
        {new Array(10).fill(null).map((_, index) => (
          <React.Fragment key={index}>
            <Card
              key={`player-${index}-transition1`}
              styleClass={`cardPlayer ${
                playersCardDistributed[index]
                  ? `transition1 profile${index}cards`
                  : ""
              }`}
              card={null}
              flippedStyle={null}
              flippingCard={false}
            />
            <Card
              key={`player-${index}-transition2`}
              styleClass={`cardPlayer ${
                playersCardDistributed[index]
                  ? `transition2 profile${index}cards`
                  : ""
              }`}
              card={null}
              flippedStyle={null}
              flippingCard={false}
            />
          </React.Fragment>
        ))} */}
      </div>
    </div>
  );
};

export default CardsPlacements;
