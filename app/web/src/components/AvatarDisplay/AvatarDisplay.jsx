import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../Utiles/AuthProvider";
import "./avatarDisplay.css";

const AvatarDisplay = () => {
  const { user } = useAuth();
  const [baseAvatar, setBaseAvatar] = useState(null);
  const [sunglasses, setSunglasses] = useState(null);
  const [colorAvatar, setColorAvatar] = useState("#FFFFFF");

  useEffect(() => {
    if (user) {
      console.log("user.baseAvatarImgSrc:", user.baseAvatarImgSrc);
      console.log("user.sunglassesImgSrc:", user.sunglassesImgSrc);
      console.log("user.colorAvatar:", user.colorAvatar);

      setBaseAvatar(user.baseAvatarImgSrc);
      setSunglasses(user.sunglassesImgSrc);
      setColorAvatar(user.colorAvatar);
    }
  }, [user]);

  return (
    <div
      className="avatarContainer"
      style={{ backgroundColor: colorAvatar }}
    >
      {baseAvatar && (
        <img src={baseAvatar} alt="Base Avatar" className="baseAvatar" />
      )}
      {sunglasses && (
        <img src={sunglasses} alt="Sunglasses" className="sunglasses" />
      )}
    </div>
  );
};

export default AvatarDisplay;
