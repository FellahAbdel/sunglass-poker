import React, { useState, useRef } from "react";
import Button from "../../../button/Button.tsx";
import { useTranslation } from "../../../Utiles/Translations";
import TextInputComponent from "../../../textInput/TextInput.jsx";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import useOnClickOutside from "../../../../hooks/useOnClickOutside.js";

/**
 * ListTableItem component displays a single row in a list of game tables,
 * providing options to join open or password-protected tables.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - Unique ID of the table.
 * @param {string} props.nom - Name of the table.
 * @param {string} props.rang - Security level or rank of the table.
 * @param {number} props.nombreDeJoueurs - Current number of players.
 * @param {boolean} props.ouvert - Indicates if the table is open or password-protected.
 * @param {Function} props.onJoinClick - Function to execute when joining the table.
 * @param {boolean} props.isJoining - Indicates if the join process is in progress.
 */
const ListTableItem = ({
  id,
  nom,
  rang,
  nombreDeJoueurs,
  ouvert,
  onJoinClick,
  isJoining,
}) => {
  const { verifyGamePassword } = useAuth(); // Hook to authenticate against the game's password.
  const { getTranslatedWord } = useTranslation();
  const [password, setPassword] = useState(""); // State to store the input password.
  const [passwordError, setPasswordError] = useState(""); // State to store potential password errors.
  const [showPasswordInput, setShowPasswordInput] = useState(false); // State to toggle password input visibility.
  const ref = useRef(); // Ref for the component to manage click outside behavior.

  useOnClickOutside(ref, () => setShowPasswordInput(false)); // Hook to handle click outside the component.

  /**
   * Handles the click action to join the game, which might require password validation.
   */
  const handleJoinClick = async () => {
    if (!ouvert) {
      if (!showPasswordInput) {
        setShowPasswordInput(true);
        return;
      }
      await checkPassword();
    } else {
      onJoinClick(id);
    }
  };

  /**
   * Validates the entered password against the server's password.
   */
  const checkPassword = async () => {
    if (password.trim() === "") {
      setPasswordError("Please enter the password");
      return;
    }
    const result = await verifyGamePassword(id, password);
    if (!result.success) {
      setPasswordError(result.error || "Incorrect password");
    } else {
      onJoinClick(id);
    }
  };

  /**
   * Handles the Enter key press to submit the password.
   */
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      await checkPassword();
    }
  };

  return (
    <div className="tableRow" ref={ref}>
      <div className="rowItem">{nom}</div>
      <div className="rowItem">{getTranslatedWord(`serverPanel.${rang}`)}</div>
      <div className="rowItem">{nombreDeJoueurs}/10</div>
      <div className="rowItem">
        {ouvert ? (
          <img
            src="static/media/assets/images/icons/white/unlock.png"
            alt="Open"
          />
        ) : (
          <img
            src="static/media/assets/images/icons/white/password.png"
            alt="Closed"
          />
        )}
      </div>
      <div className="rowItem">
        {nombreDeJoueurs < 10 ? (
          <>
            {!showPasswordInput && (
              <Button
                label={getTranslatedWord("serverPanel.join")}
                styleClass={`btn-list_table back-color2 ${
                  isJoining ? "loading" : ""
                }`}
                onClick={handleJoinClick}
              />
            )}
            {!ouvert && showPasswordInput && (
              <TextInputComponent
                placeholder="Enter Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                errorMessage={passwordError}
                styleClass="input-serverRoomPassword"
                styleClass2="input-serverRoomPassword2"
                onKeyDown={handleKeyDown}
              />
            )}
          </>
        ) : (
          <Button
            label={getTranslatedWord("serverPanel.full")}
            styleClass="btn-list_table btn-list_table_full"
          />
        )}
      </div>
    </div>
  );
};

export default ListTableItem;
