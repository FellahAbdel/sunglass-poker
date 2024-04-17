import React from "react";
import "./profileMenu.css";
//import ClientsProfile from "./../../gameTable/PlayersProfile/PlayersProfile";
import Button from "../../button/Button.tsx";
//import { useAuth } from "../../AuthProvider";
import { useWindowContext } from "../../Utiles/WindowContext";
import { useUserData } from "../../Utiles/useUserData";
import { useTranslation } from "../../Utiles/Translations";
import AvatarDisplay from "../../AvatarDisplay/AvatarDisplay.jsx";

const ProfileWindow = () => {
  const { getTranslatedWord } = useTranslation();

  const { openWindow } = useWindowContext();
  const { user } = useUserData();

  const date = new Date(user.createdAt);
  const formattedDate = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  
  return (
    <div className="profileMenu">
      <div className="userPP">
        <AvatarDisplay />
      </div>

      <div className="userInfo">
        <div className="userInfo-items">
          {getTranslatedWord("profil.name")}
          <br />
          {getTranslatedWord("profil.mail")}
          <br />
          {getTranslatedWord("profil.coins")}
          <br />
          {getTranslatedWord("profil.date")}
          <br />
        </div>

        <div className="vertical-line" />

        <div className="userInfo-Info">
          {user?.pseudo || "Pseudo par défaut"}
          <br />
          {user?.email || "email inconnu"}
          <br />
          {user?.coins}
          <br />
          {formattedDate}          <br />
        </div>
      </div>
    </div>
  );
};

export default ProfileWindow;
