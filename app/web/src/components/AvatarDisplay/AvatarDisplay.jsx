import React, { useEffect, useState } from "react";
import { useAuth } from "../Utiles/AuthProvider";
import "./avatarDisplay.css";
const AvatarDisplay = ({ userId }) => {
  const { user, getAvatarById } = useAuth();
  const [avatar, setAvatar] = useState({
    baseAvatar: {},
    sunglasses: {},
    colorAvatar: "#FFFFFF",
  });

  useEffect(() => {
    const fetchAvatar = async () => {
      if (userId) {
        const avatarData = await getAvatarById(userId);
        if (avatarData) {
          setAvatar({
            baseAvatar: avatarData.baseAvatar,
            sunglasses: avatarData.sunglasses,
            colorAvatar: avatarData.colorAvatar.imgSrc || "#FFFFFF",
          });
        }
      } else if (user) {
        setAvatar({
          baseAvatar: {
            imgSrc: user.baseAvatarImgSrc,
            eyePosition: user.baseAvatar?.eyePosition || { x: 50, y: 50 },
          },
          sunglasses: {
            imgSrc: user.sunglassesImgSrc,
          },
          colorAvatar: user.colorAvatar?.imgSrc || "#FFFFFF",
        });
      }
    };

    fetchAvatar();
  }, [userId, user, getAvatarById]);

  const sunglassesStyle =
    avatar.sunglasses.imgSrc && avatar.baseAvatar.eyePosition
      ? {
          position: "absolute",
          top: `${avatar.baseAvatar.eyePosition.y}%`,
          left: `${avatar.baseAvatar.eyePosition.x}%`,
          transform: "translate(-50%, -50%)",
        }
      : {};

  return (
    <div
      className="avatarContainer"
      style={{ backgroundColor: avatar.colorAvatar }}
    >
      {avatar.baseAvatar.imgSrc && (
        <img
          src={avatar.baseAvatar.imgSrc}
          alt="Base Avatar"
          className="baseAvatar"
        />
      )}
      {avatar.sunglasses.imgSrc && (
        <img
          src={avatar.sunglasses.imgSrc}
          alt="Sunglasses"
          style={sunglassesStyle}
          className="sunglasses"
        />
      )}
    </div>
  );
};

export default AvatarDisplay;
