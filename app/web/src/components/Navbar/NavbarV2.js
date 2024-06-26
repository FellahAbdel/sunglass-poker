import React, { useEffect, useCallback } from "react";
import "./navbarV2.css";
import Button from "../button/Button.tsx";
import { useTranslation } from "../Utiles/Translations";
import { useAuth } from "../Utiles/AuthProvider";
import { useWindowContext } from "../Utiles/WindowContext.jsx";
import * as actions from "../../store/actions/clientInteractionsCreator.js";
import { useDispatch, useSelector } from "react-redux";
import { useGameTable } from "../Utiles/GameTableProvider.jsx";

/**
 * Navbar provides a dynamic navigation bar based on game and user session state.
 * It handles actions like logging out, leaving rooms, opening various windows, etc.
 */
const Navbar = () => {
  const { isLogged, logingOut } = useAuth();
  const { gameState } = useGameTable();
  const isPlayerLeft = useSelector((state) => state.game.playerLeft);

  const {
    isGameTableVisible,
    closeWindow,
    openWindow,
    showHome,
    windowType,
    isWindowOpen,
  } = useWindowContext();

  const dispatch = useDispatch();

  // useEffect to show the home page when the player leaves the table successfully
  useEffect(() => {
    if (isPlayerLeft) {
      showHome();
    }
  }, [isPlayerLeft, showHome]);

  const handleleaveRoom = useCallback(() => {
    // si le jeu est en cours
    if (gameState === "active") {
      // On le force à fold.
      dispatch(actions.fold());
    }
    dispatch(actions.leaveRoom());
  }, [gameState, dispatch]);

  const handleLogOutButton = useCallback(() => {
    if (windowType === "accueil") {
      openWindow("alert", {
        message: "alert.logout",
        onConfirm: () => {
          logingOut();
          showHome();
        },
        onCancel: () => {
          closeWindow();
        },
      });
    } else if (windowType === "loading") {
      closeWindow();
    } else if (windowType !== "") {
      closeWindow();
    } else if (isGameTableVisible) {
      openWindow("alert", {
        message: "alert.confirmExitMessage",
        onConfirm: () => {
          handleleaveRoom();
        },
        onCancel: () => {
          closeWindow();
        },
      });
    } else {
      openWindow("alert", {
        message: "alert.logout",
        onConfirm: () => {
          logingOut();
          showHome();
        },
        onCancel: () => {
          closeWindow();
        },
      });
    }
  }, [
    windowType,
    isGameTableVisible,
    openWindow,
    closeWindow,
    logingOut,
    showHome,
    handleleaveRoom,
  ]);

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const { getTranslatedWord } = useTranslation();

  // Defines label based on the window type
  let label;
  if (windowType === "accueil") {
    label = getTranslatedWord("navbar.logout");
  } else if (isWindowOpen) {
    label = getTranslatedWord("navbar.exit");
  } else {
    label = getTranslatedWord("navbar.exitTable");
  }

  const toAboutMe = () => {
    window.open(
      "https://mai-projet-integrateur.u-strasbg.fr/vmProjetIntegrateurgrp9-1/sunglass-studio",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="container-nav-V2" onClick={handleClick}>
      {windowType !== "loading" && (
        <div className="container-navMain-V2">
          {windowType !== "" && !isGameTableVisible && (
            <Button
              label={getTranslatedWord("navbar.home")}
              onClick={() => openWindow("")}
              iconSrc="static/media/assets/images/icons/white/home.png"
            />
          )}
          {isLogged && (
            <>
              <Button
                label={
                  isLogged
                    ? getTranslatedWord("navbar.profile")
                    : getTranslatedWord("navbar.login")
                }
                onClick={() =>
                  isLogged ? openWindow("profile") : openWindow("login")
                }
                styleClass={`${isLogged ? "btn-profile-V2 " : "btn-logIn-V2 "}`}
                iconSrc="static/media/assets/images/icons/white/profile.png"
              />
              <Button
                label={getTranslatedWord("navbar.ranking")}
                onClick={() => openWindow("ranking")}
                styleClass={`${
                  isLogged ? "btn-tutorial-V2 " : "btn-tutorial-V2 "
                }`}
                iconSrc="static/media/assets/images/icons/white/ranking.png"
              />
            </>
          )}

          <Button
            label={getTranslatedWord("navbar.settings")}
            onClick={() => openWindow("settings")}
            styleClass={`btn-settings-V2`}
            iconSrc="static/media/assets/images/icons/white/settings.png"
          />

          {isLogged && !isGameTableVisible && (
            <Button
              label={getTranslatedWord("shop.shop")}
              onClick={() => openWindow("shop")}
              styleClass="btn-shop-V2"
              iconSrc="static/media/assets/images/icons/white/shop.png"
            />
          )}
          <Button
            label={getTranslatedWord("navbar.tutorial")}
            onClick={() => openWindow("tutorial")}
            styleClass={`${isLogged ? "btn-tutorial-V2 " : "btn-tutorial-V2 "}`}
            iconSrc="static/media/assets/images/icons/white/tutorial.png"
          />
          <Button
            label={getTranslatedWord("navbar.info")}
            onClick={toAboutMe}
            styleClass={`btn-settings-V2`}
            iconSrc="static/media/assets/images/icons/white/info.png"
          />
          {isLogged && (
            <Button
              label={label}
              onClick={handleLogOutButton}
              styleClass="btn-exit-V2"
              iconSrc="static/media/assets/images/icons/white/exit.png"
            />
          )}
        </div>
      )}
      {windowType === "loading" && (
        <div className="container-navMain-V2">
          {isLogged && (
            <Button
              label={label}
              onClick={handleLogOutButton}
              styleClass="btn-exit-V2"
              iconSrc="static/media/assets/images/icons/white/exit.png"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
