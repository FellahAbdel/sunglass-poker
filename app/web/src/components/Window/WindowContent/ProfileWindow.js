import React from "react";
import "./profileMenu.css";
//import ClientsProfile from "./../../gameTable/PlayersProfile/PlayersProfile";
import Button from "../../button/Button.tsx";
//import { useAuth } from "../../AuthProvider";
import { useWindowContext } from "../../Utiles/WindowContext";
import { useUserData } from "../../Utiles/useUserData";

const ProfileWindow = () => {
    const { openWindow } = useWindowContext();
    const { user } = useUserData();

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

      <div className="userInfo-items">
        Name
        <br />
        Mail
        <br />
        Coins
        <br />
        Joined Date
        <br />
      </div>

      <div className="vertical-line"/>

      <div className="userInfo-Info">{user?.pseudo || "Pseudo par défaut"}
        <br />
        {user?.email || "email inconnu"}
        <br />
        {user?.coins || "0"}
        <br />
        {user?.joinedDate || "Date inconnue"} 
        <br />
      </div>


      </div>
      <Button
          styleClass={"btn-gameStart"}
          label={"User Stats"}
          onClick={() => openWindow("stats")}
        />
    </div>
  );
};

export default ProfileWindow;
