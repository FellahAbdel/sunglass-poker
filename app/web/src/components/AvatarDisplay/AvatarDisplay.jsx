import React, { useEffect, useState } from "react";
import { useAuth } from "../Utiles/AuthProvider";
import "./avatarDisplay.css";

const AvatarDisplay = ({ user: propUser }) => {
  const { user: authUser } = useAuth();
  const user = propUser || authUser; // Utiliser propUser s'il est fourni, sinon authUser
  const [baseAvatar, setBaseAvatar] = useState({});
  const [sunglasses, setSunglasses] = useState({});

  useEffect(() => {
    if (user && user.baseAvatarImgSrc && user.colorAvatar) {
      console.log("User data:", user);
      setBaseAvatar({
        imgSrc: user.baseAvatarImgSrc,
        eyePosition: user.baseAvatar.eyePosition,
      });
      setSunglasses({
        imgSrc: user.sunglassesImgSrc,
      });
    }
  }, [user]);

  const sunglassesStyle =
    sunglasses.imgSrc && baseAvatar.eyePosition
      ? {
          position: "absolute",
          top: `${baseAvatar.eyePosition.y}%`,
          left: `${baseAvatar.eyePosition.x}%`,
          transform: "translate(-50%, -50%)",
        }
      : {};

  const backgroundColor =
    user && user.colorAvatar ? user.colorAvatar.imgSrc : "#FFFFFF";

  return (
    <div className="avatarContainer" style={{ backgroundColor }}>
      {baseAvatar.imgSrc && (
        <img src={baseAvatar.imgSrc} alt="Base Avatar" className="baseAvatar" />
      )}
      {sunglasses.imgSrc && (
        <img
          src={sunglasses.imgSrc}
          alt="Sunglasses"
          style={sunglassesStyle}
          className="sunglasses"
        />
      )}
    </div>
  );
};

export default AvatarDisplay;
