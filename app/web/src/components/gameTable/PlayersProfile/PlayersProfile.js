import React from "react";
import "./playersProfile.css";
import ProgressBar from "../../Utiles/ProgressBar";
import Card from "../Card/Card";
import React from "react";
import "./playersProfile.css";
import ProgressBar from "../../Utiles/ProgressBar";
import Card from "../Card/Card";

const PlayersProfile = ({
  status,
  chips,
  name,
  cards,
  flippingPlayerCards,
  gotCards,
}) => {
  const formattedChips = chips.toLocaleString();
  const dollarSign = "$";
const PlayersProfile = ({
  status,
  chips,
  name,
  cards,
  flippingPlayerCards,
  gotCards,
}) => {
  const formattedChips = chips.toLocaleString();
  const dollarSign = "$";

  return (
  return (
    <div className="container-onGameProfile">
      <div className={`box-status  ${status}`}>
      <div className={`box-status  ${status}`}>
        {status === "Waiting" ? (
          <ProgressBar
            className="progressBar progressPercentage"
            durationInSeconds={5}
          />
        ) : (
          <div className={`box-statusText  ${status}`}>{status}</div>
        )}
      </div>
          <ProgressBar
            className="progressBar progressPercentage"
            durationInSeconds={5}
          />
        ) : (
          <div className={`box-statusText  ${status}`}>{status}</div>
        )}
      </div>

      <div className={`box-playerInfo ${status}`}>
        {name}  
        <br />
        {formattedChips}{status === "Empty" ? null : dollarSign}
      </div>

      <Card
        styleClass={`showCardPlayers1 ${gotCards ? "playerCardAppear" : ""}`}
        card={["a", "clubs"]}
        flippedStyle={"flippedPlayerCards"}
        flippingCard={flippingPlayerCards}
      />
      <Card
        styleClass={`showCardPlayers2 ${gotCards ? "playerCardAppear" : ""}`}
        card={["a", "clubs"]}
        flippedStyle={"flippedPlayerCards"}
        flippingCard={flippingPlayerCards}
      />

      <img
        className={`profilePic ${status}`}
        src={
          status === "Empty"
            ? require("./../../assets/images/pp_empty.png")
            : require("./../../assets/images/pp_empty.png")
        }
        alt="profilePic"
      />
    </div>
  );
};
  );
};

export default PlayersProfile;

