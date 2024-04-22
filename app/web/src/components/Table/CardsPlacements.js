import React, { useState, useEffect, useRef } from "react";
import Card from "../gameTable/Card/Card";
import useAudio from '../../hooks/useAudio';


const CardsPlacements = ({
  dealingFlop,
  disappear,
  playersCardDistributedProp,
}) => {
  const [playing0, togglePlay0] = useAudio(require("./../assets/sounds/soundEffect-card1.mp3"));
  const [playing1, togglePlay1] = useAudio(require("./../assets/sounds/soundEffect-card1.mp3"));
  const [playing2, togglePlay2] = useAudio(require("./../assets/sounds/soundEffect-card1.mp3"));
  const [playing3, togglePlay3] = useAudio(require("./../assets/sounds/soundEffect-card1.mp3"));
  const [playing4, togglePlay4] = useAudio(require("./../assets/sounds/soundEffect-card1.mp3"));

  const [delayedDealingFlop, setDelayedDealingFlop] = useState([false, false, false, false, false]);

  useEffect(() => {
    const delays = [500, 1000, 1500, 2000, 2500]; // Individual delays for each card

    dealingFlop.forEach((newFlop, index) => {
      if (newFlop === true && delayedDealingFlop[index] === false) {
        setTimeout(() => {
          setDelayedDealingFlop(current => {
            const newStates = [...current];
            newStates[index] = true;
            // Trigger the corresponding sound play
            switch(index) {
              case 0: togglePlay0(); break;
              case 1: togglePlay1(); break;
              case 2: togglePlay2(); break;
              case 3: togglePlay3(); break;
              case 4: togglePlay4(); break;
              default: break;
            }
            return newStates;
          });
        }, delays[index]);
      } else if (newFlop === false) {
        setDelayedDealingFlop(current => {
          const newStates = [...current];
          newStates[index] = false;
          return newStates;
        });
      }
    });
  }, [dealingFlop]);

  return (
    <div className={`container-cards ${disappear ? "disappear" : ""}`}>

      <div className="container-tableCards">
        {/* first three flops -> dealingFlop[0]
            first forth flops -> dealingFlop[1]
            first fifth flops -> dealingFlop[2] */}
        <Card
          card={["2", "clubs"]}
          styleClass={`tableCard`}
          flippedStyle={"dealingFlop0"}
          flippingCard={delayedDealingFlop[0]}
        />
        <Card
          card={["3", "clubs"]}
          styleClass={"tableCard"}
          flippedStyle={"dealingFlop1"}
          flippingCard={delayedDealingFlop[1]}
        />
        <Card
          card={["4", "clubs"]}
          styleClass={"tableCard"}
          flippedStyle={"dealingFlop2"}
          flippingCard={delayedDealingFlop[2]}
        />
        <Card
          card={["5", "clubs"]}
          styleClass={"tableCard"}
          flippedStyle={"dealingFlop3"}
          flippingCard={delayedDealingFlop[3]}
        />
        <Card
          card={["6", "clubs"]}
          styleClass={"tableCard"}
          flippedStyle={"dealingFlop4"}
          flippingCard={delayedDealingFlop[4]}
        />
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
            playersCardDistributedProp[0] ? "transition1 profile0cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[0] ? "transition2 profile0cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[1] ? "transition1 profile1cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[1] ? "transition2 profile1cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[2] ? "transition1 profile2cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[2] ? "transition2 profile2cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[3] ? "transition1 profile3cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[3] ? "transition2 profile3cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[4] ? "transition1 profile4cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[4] ? "transition2 profile4cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[5] ? "transition1 profile5cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[5] ? "transition2 profile5cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[6] ? "transition1 profile6cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[6] ? "transition2 profile6cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[7] ? "transition1 profile7cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[7] ? "transition2 profile7cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[8] ? "transition1 profile8cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[8] ? "transition2 profile8cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />

        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[9] ? "transition1 profile9cards" : ""
          }`}
          card={null}
          flippedStyle={null}
          flippingCard={false}
        />
        <Card
          styleClass={`cardPlayer ${
            playersCardDistributedProp[9] ? "transition2 profile9cards" : ""
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
