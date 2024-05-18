import React, { useEffect, useState } from "react";
import { useAuth } from "../Utiles/AuthProvider";
import "./avatarDisplay.css";

/**
 * AvatarDisplay is a component that displays the user's avatar based on the userId prop. 
 * It fetches avatar data either for the specified userId or the logged-in user, and 
 * displays elements like base avatar, sunglasses, and a background color.
 * 
 * Props:
 * - userId: String or Number representing the ID of the user whose avatar should be displayed.
 */
const AvatarDisplay = ({ userId }) => {
  const { user, getAvatarById } = useAuth();

  // State for storing avatar data
  const [avatar, setAvatar] = useState({
    baseAvatar: {}, 
    sunglasses: {},
    colorAvatar: "#FFFFFF",
  });

  useEffect(() => {
    // Asynchronous function to fetch avatar data
    const fetchAvatar = async () => {
      if (userId) {
        const avatarData = await getAvatarById(userId);
        if (avatarData) {
          // Fetch avatar by userId if provided
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

  // Calculate style for positioning the sunglasses on the avatar
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
