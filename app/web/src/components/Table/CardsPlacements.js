import React from "react";
import Card from "../gameTable/Card/Card";
import TextGlitch from "./../TextGlitch/TextGlitch";
import { useTranslation } from "../Utiles/Translations";


const CardsPlacements = ({
  dealingFlop,
  disappear,
  playersCardDistributedProp,
}) => {

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
          flippingCard={dealingFlop[0]}
        />
        <Card
          card={["3", "clubs"]}
          styleClass={"tableCard"}
          flippedStyle={"dealingFlop1"}
          flippingCard={dealingFlop[0]}
        />
        <Card
          card={["4", "clubs"]}
          styleClass={"tableCard"}
          flippedStyle={"dealingFlop2"}
          flippingCard={dealingFlop[0]}
        />
        <Card
          card={["5", "clubs"]}
          styleClass={"tableCard"}
          flippedStyle={"dealingFlop3"}
          flippingCard={dealingFlop[1]}
        />
        <Card
          card={["6", "clubs"]}
          styleClass={"tableCard"}
          flippedStyle={"dealingFlop4"}
          flippingCard={dealingFlop[2]}
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
