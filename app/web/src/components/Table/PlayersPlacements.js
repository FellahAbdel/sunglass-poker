import React from "react";
import PlayersProfile from "../gameTable/PlayersProfile/PlayersProfile";

const PlayersPlacements = ({
  playersCardsShowProp,
  playersCardDistributedProp,
  disappear,
}) => {
  return (
    <span className={`profiles ${disappear ? "disappear" : ""}`}>
      <div className="profile profile0">
        <PlayersProfile
          status={"Checked"}
          chips={9999999}
          name={"Mostafa0"}
          flippingPlayerCards={playersCardsShowProp[0]}
          gotCards={playersCardDistributedProp[0]}
        />
      </div>
      <div className="profile profile1">
        <PlayersProfile
          status={"Fold"}
          chips={9999999}
          name={"Mostafa1"}
          flippingPlayerCards={playersCardsShowProp[1]}
          gotCards={playersCardDistributedProp[1]}
        />
      </div>
      <div className="profile profile2">
        <PlayersProfile
          status={"Waiting"}
          chips={9999999}
          name={"Mostafa2"}
          flippingPlayerCards={playersCardsShowProp[2]}
          gotCards={playersCardDistributedProp[2]}
        />
      </div>
      <div className="profile profile3">
        <PlayersProfile
          status={"Raised"}
          chips={9999999}
          name={"Mostafa3"}
          flippingPlayerCards={playersCardsShowProp[3]}
          gotCards={playersCardDistributedProp[3]}
        />
      </div>
      <div className="profile profile4">
        <PlayersProfile
          status={"Raised"}
          chips={9999999}
          name={"Mostafa4"}
          flippingPlayerCards={playersCardsShowProp[4]}
          gotCards={playersCardDistributedProp[4]}
        />
      </div>
      <div className="profile profile5">
        <PlayersProfile
          status={"Checked"}
          chips={9999999}
          name={"Mostafa5"}
          flippingPlayerCards={playersCardsShowProp[5]}
          gotCards={playersCardDistributedProp[5]}
        />
      </div>
      <div className="profile profile6">
        <PlayersProfile
          status={"Fold"}
          chips={9999999}
          name={"Mostafa6"}
          flippingPlayerCards={playersCardsShowProp[6]}
          gotCards={playersCardDistributedProp[6]}
        />
      </div>
      <div className="profile profile7">
        <PlayersProfile
          status={"Checked"}
          chips={9999999}
          name={"Mostafa7"}
          flippingPlayerCards={playersCardsShowProp[7]}
          gotCards={playersCardDistributedProp[7]}
        />
      </div>
      <div className="profile profile8">
        <PlayersProfile
          status={"Empty"}
          chips={""}
          name={""}
          flippingPlayerCards={playersCardsShowProp[8]}
          gotCards={playersCardDistributedProp[8]}
        />
      </div>
      <div className="profile profile9">
        <PlayersProfile
          status={"Called"}
          chips={9999999}
          name={"Mostafa9"}
          flippingPlayerCards={playersCardsShowProp[9]}
          gotCards={playersCardDistributedProp[9]}
        />
      </div>
    </span>
  );
};
export default PlayersPlacements;

