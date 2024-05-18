import React from "react";
import "./profileMenu.css";
//import ClientsProfile from "./../../gameTable/PlayersProfile/PlayersProfile";
import Button from "../../button/Button.tsx";
import { useWindowContext } from "../../Utiles/WindowContext";
import { useTranslation } from "../../Utiles/Translations";
import { useAuth } from "../../Utiles/AuthProvider.jsx";
import TextGlitch from "./../../TextGlitch/TextGlitch.js";

import { useDispatch } from "react-redux";
import {
  createGame,
  joinRoom,
} from "../../../store/actions/clientInteractionsCreator.js";

/**
 * AcceuilWindow component serves as the home screen for users to start or join games.
 * It provides different functionalities based on the user's authentication status.
 */
const AcceuilWindow = () => {
  const { isLogged, getAvailableRooms } = useAuth();
  const { closeWindow, openWindow, showGameTable, setWindowType } =
    useWindowContext();
  const { getTranslatedWord } = useTranslation();
  const dispatch = useDispatch();

  /**
   * Handles the logic to start or join a game based on the availability of game rooms.
   */
  const onClickStartGame = async () => {
    if (isLogged) {
      try {
        const availableRooms = await getAvailableRooms();
        if (availableRooms && availableRooms.length > 0) {
          const roomId = availableRooms[0]._id; // Supposons que vous voulez rejoindre la première room disponible
          dispatch(joinRoom(roomId));
          // Informer l'utilisateur que sa demande a bien été prise en compte et qu'il est en attente de la réponse du serveur
        } else {
          dispatch(createGame());
        }
        console.log("Utilisateur connecté, on montre la table");
        showGameTable();
        closeWindow();
        setWindowType("");
      } catch (error) {
        console.error("Error while starting the game:", error);
      }
    } else {
      console.error("User not connected trying to start a game");
    }
  };

  return (
    <div className="profileMenu">
      <TextGlitch
        children={"SunGlassPoker"}
        styleClass={"glitch-accueil"}
        glitchStyle={"glitchStyle-accueil"}
      />
      <div className="container-startButtons">
        {isLogged ? (
          <>
            <Button
              styleClass={"btn-gameStart btn-gameJoin back-color1"}
              label={getTranslatedWord("game.quickGame")}
              onClick={() => onClickStartGame()}
            />
            <Button
              styleClass={"btn-gameStart btn-gameJoin back-color1"}
              label={getTranslatedWord("game.joinGame")}
              onClick={() => openWindow("servers")}
            />
            <Button
              styleClass={"btn-gameStart btn-gameJoin back-color1"}
              label={getTranslatedWord("game.createAgame")}
              onClick={() => openWindow("create_table")}
            />
          </>
        ) : (
          <>
            <Button
              styleClass={"btn-gameStart btn-gameJoin back-color2"}
              label={getTranslatedWord("game.loginPlay")}
              onClick={() => openWindow("login")}
            />
            <Button
              styleClass={"btn-gameStart btn-gameJoin back-color2"}
              label={getTranslatedWord("game.signupPlay")}
              onClick={() => openWindow("register")}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AcceuilWindow;
