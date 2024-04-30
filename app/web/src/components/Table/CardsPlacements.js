import React, { useState, useEffect, useRef } from "react";
import Card from "../gameTable/Card/Card";
import useAudio from "../../hooks/useAudio";
import { useGameTable } from "../Utiles/GameTableProvider";

const CardsPlacements = ({}) => {
  const { communityCards } = useGameTable();

  // Fonction pour transformer les données de la carte en tableau [number, color]
  const formatCardData = (card) => {
    return [card.number.toString(), card.color];
  };
  console.log("communityCards", communityCards);
  {
    /*DISTRIBUTION ANIMATION :
  in CardPlacements you have the distribution
  animation which gets handled with a table called 
  "playersCardDistributed" with 10 booleen members
  representing each players that gets a card*/
  }

  //default values to test ---------- have to be recived from back
  //dealingFlop for the flop river turn
  //   first three = flop  -> dealingFlop[0]
  //   forth one   = river -> dealingFlop[1]
  //   fifth one   = turn  -> dealingFlop[2]
  const [dealingFlop, setDealingFlop] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  // Function to update dealingFlop based on communityCards
  const updateDealingFlop = () => {
    // If communityCards is empty, set dealingFlop to all false
    if (!communityCards || communityCards.length === 0) {
      setDealingFlop([false, false, false, false, false]);
    } else {
      // Create a new array of booleans based on the length of communityCards
      const newDealingFlop = communityCards.map((card, index) => {
        return card !== null;
      });
      // Set the state to the new array
      setDealingFlop(newDealingFlop);
    }
  };

  // Call the update function when communityCards changes
  useEffect(() => {
    updateDealingFlop();
  }, [communityCards]);
  //playersCardDistributed for each player
  // *** also has been used in PlayersPlacements component
  // *** here only for animation purposes
  const [playersCardDistributed, setPlayersCardDistributed] = useState([
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  //Delay function for flop ; to continue later on ; ignore it now
  //   const shouldUpdate = [true, true, true, false, false];
  //   const shouldUpdate2 = [true, true, true, true, false];
  //   const shouldUpdate3 = [true, true, true, true, true];

  //   const delayTimes = [0, 500, 1000 , 1500, 2000];

  //   const testDealingFlop = () => {
  //     dealingFlop.forEach((state, index) => {
  //         if (shouldUpdate[index]) {
  //             setTimeout(() => {
  //                 setDealingFlop(prevFlop => {
  //                     let newFlop = [...prevFlop];
  //                     newFlop[index] = !state;
  //                     return newFlop;
  //                 });
  //             }, delayTimes[index]);
  //         }
  //     });
  // };

  //AUDIO -----------------------------
  const [playing0, togglePlay0] = useAudio(
    require("./../assets/sounds/soundEffect-card1.mp3")
  );
  const [playing1, togglePlay1] = useAudio(
    require("./../assets/sounds/soundEffect-card1.mp3")
  );
  const [playing2, togglePlay2] = useAudio(
    require("./../assets/sounds/soundEffect-card1.mp3")
  );
  const [playing3, togglePlay3] = useAudio(
    require("./../assets/sounds/soundEffect-card1.mp3")
  );
  const [playing4, togglePlay4] = useAudio(
    require("./../assets/sounds/soundEffect-card1.mp3")
  );

  useEffect(() => {
    dealingFlop.forEach((newFlop, index) => {
      if (newFlop === true) {
        switch (index) {
          case 0:
            togglePlay0();
            break;
          case 1:
            togglePlay1();
            break;
          case 2:
            togglePlay2();
            break;
          case 3:
            togglePlay3();
            break;
          case 4:
            togglePlay4();
            break;
          default:
            break;
        }
      }
    });
  }, [dealingFlop]);
  //----------------------------- AUDIO

  return (
    <div className={`container-cards`}>
      {/* <div className="container-tableCards">
        <Card
          card={["2", "C"]}
          styleClass={`tableCard`}
          flippedStyle={"dealingFlop0"}
          flippingCard={dealingFlop[0]}
        />
        <Card
          card={["3", "C"]}
          styleClass={"tableCard"}
          flippedStyle={"dealingFlop1"}
          flippingCard={dealingFlop[1]}
        />
        <Card
          card={["4", "C"]}
          styleClass={"tableCard"}
          flippedStyle={"dealingFlop2"}
          flippingCard={dealingFlop[2]}
        />
        <Card
          card={["5", "C"]}
          styleClass={"tableCard"}
          flippedStyle={"dealingFlop3"}
          flippingCard={dealingFlop[3]}
        />
        <Card
          card={["6", "C"]}
          styleClass={"tableCard"}
          flippedStyle={"dealingFlop4"}
          flippingCard={dealingFlop[4]}
          // flippingCard={true}
        />
      </div> */}

      <div className="container-tableCards">
        {/* first three flops -> dealingFlop[0]
            first forth flops -> dealingFlop[1]
            first fifth flops -> dealingFlop[2] */}
        {communityCards.map((card, index) => (
          <Card
            key={index}
            card={formatCardData(card)}
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

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[0] ? "transition1 profile0cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[0] ? "transition2 profile0cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[1] ? "transition1 profile1cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[1] ? "transition2 profile1cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[2] ? "transition1 profile2cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[2] ? "transition2 profile2cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[3] ? "transition1 profile3cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[3] ? "transition2 profile3cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[4] ? "transition1 profile4cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[4] ? "transition2 profile4cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[5] ? "transition1 profile5cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[5] ? "transition2 profile5cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[6] ? "transition1 profile6cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[6] ? "transition2 profile6cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[7] ? "transition1 profile7cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[7] ? "transition2 profile7cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[8] ? "transition1 profile8cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[8] ? "transition2 profile8cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[9] ? "transition1 profile9cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributed[9] ? "transition2 profile9cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
      </div>
    </div>
  );
};

export default CardsPlacements;
