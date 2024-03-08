// ProfilePicture.jsx
import React from "react";
import "./profilPicture.css";
import picture1 from "../assets/avatar/1.png";
import picture2 from "../assets/avatar/2.png";
import picture3 from "../assets/avatar/3.png";
import picture4 from "../assets/avatar/4.png";
import picture5 from "../assets/avatar/5.png";

const PictureComponent = ({ className, indexAvatar }) => {
  // Utilisez un tableau pour stocker les images
  const avatars = [picture1, picture2, picture3, picture4, picture5];

  // Vérifiez si l'indexAvatar est valide
  const isValidIndex = indexAvatar >= 0 && indexAvatar < avatars.length;

  // Utilisez une image par défaut si l'indexAvatar n'est pas valide
  const selectedAvatar = isValidIndex ? avatars[indexAvatar] : avatars[0];

  return <img src={selectedAvatar} className={`${className}`} alt="Avatar" />;
};

export default PictureComponent;
