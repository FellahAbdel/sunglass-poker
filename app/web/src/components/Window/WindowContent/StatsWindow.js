import React from "react";
import "./profileMenu.css";
// import ClientsProfile from "./../../gameTable/PlayersProfile/PlayersProfile";
// import Button from "../../button/Button.tsx";
// import { useAuth } from "../../AuthProvider";
// import { useWindowContext } from "../../WindowContext";
import { useUserData } from "../../Utiles/useUserData";

const StatsContent = () => {
    const { user, stats } = useUserData();
  
    return (
      <div className="profileMenu">
        <img
          className="userPP"
          src={require("./../../assets/images/pp_simple.jpg")}
          alt="User Profile"
        />
        <div className="userInfo">
          {stats ? (
            <>
              <h3>Stats for {user?.pseudo}</h3>
              <p>Max Coins: {stats.maxCoins}</p>
              <p>Max Gain: {stats.maxGain}</p>
              <p>Total Gain: {stats.totalGain}</p>
              <p>Experience: {stats.experience}</p>
            </>
          ) : (
            <p>Loading stats...</p>
          )}
        </div>
      </div>
    );
  };
  
  export default StatsContent;