import React, { useState } from "react";
import "./profileMenu.css";
import ClientsProfile from "./../../gameTable/PlayersProfile/PlayersProfile";
import Button from "../../button/Button.tsx";
import { useAuth } from "../../AuthProvider";
import { useWindowContext } from "../../WindowContext";

const ProfileWindow = ({}) => {
  const { openWindow } = useWindowContext();

  const { user } = useAuth();

  const userInfoProp = [
    user?.pseudo || "Pseudo par défaut",
    user?.email || "email inconnu",
    user?.coins || "0",
    user?.joinedDate || "Date inconnue", 
  ];

  // const handleEditName = () => {
  //     setEditingName(true);
  // }

  // const handleSaveName = () => {
  //     // Here you would typically update the user's name in your state or database
  //     setEditingName(false);
  // }

  // const handleNameChange = (event) => {
  //     setName(event.target.value);
  // }

  return (
    <div className="profileMenu">
      <img
        className="userPP"
        src={require("./../../assets/images/pp_simple.jpg")}
        alt="User Profile"
      />

      <div className="userInfo">
        <span>Name: {userInfoProp[0]}</span>
        <br />
        Mail: {userInfoProp[1]}
        <br />
        Coins: {userInfoProp[2]}
        <br />
        Joined Date: {userInfoProp[3]}
        <br />
        <Button
          style={"btn-gameStart"}
          label={"User Stats"}
          onClick={() => openWindow("stats")}
        />
      </div>
    </div>
  );
};

export default ProfileWindow;
