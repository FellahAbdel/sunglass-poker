import React, { useEffect, useState } from "react";
import "./profileMenu.css";
import ClientsProfile from "./../../gameTable/PlayersProfile/PlayersProfile";
import Button from "../../button/Button.tsx";
import { useAuth } from "../../AuthProvider";
import { useWindowContext } from "../../WindowContext";

const StatsContent = () => {
  const { user, fetchStats } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const getStats = async () => {
      const statsData = await fetchStats();
      setStats(statsData);
    };

    if (user?._id) {
      getStats();
    }
  }, [user?._id, fetchStats]);

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
