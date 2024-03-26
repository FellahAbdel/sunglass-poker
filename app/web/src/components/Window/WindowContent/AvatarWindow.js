// SuccessWindow.jsx
import React, { useState, useEffect } from "react";
import Button from "../../button/Button.tsx";
import { useAuth } from "../../AuthProvider";

const AvatarWindow = () => {
  const { updateUserData, getUserInfo } = useAuth();
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);

  useEffect(() => {
    const userInfo = getUserInfo();

    if (userInfo && userInfo.avatar !== undefined) {
      setCurrentAvatarIndex(userInfo.avatar);
    }
  }, [getUserInfo]);

  const handlePrevAvatar = () => {
    setCurrentAvatarIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : totalAvatars - 1
    );
  };

  const handleNextAvatar = () => {
    setCurrentAvatarIndex((prevIndex) =>
      prevIndex < totalAvatars - 1 ? prevIndex + 1 : 1
    );
  };

  const handleSave = () => {
    //Sauvegarder l'avatar
    updateUserData("avatar", currentAvatarIndex);
  };

  const totalAvatars = 6 ; // Mettez le nombre total d'avatars que vous avez

  return (
    <div className="box">

      <div className="avatar-container">
      </div>

      <div className="avatar-nav">
        <Button
          onClick={handlePrevAvatar}
          label="Previous"
          styleClass="Next-Previous"
        />
        <Button
          onClick={handleNextAvatar}
          label="Next"
          styleClass="Next-Previous"
        />
      </div>

      <Button
        onClick={handleSave}
        label="Save"
        styleClass="buttonconnexion login-button"
      />
    </div>
  );
};

export default AvatarWindow;
