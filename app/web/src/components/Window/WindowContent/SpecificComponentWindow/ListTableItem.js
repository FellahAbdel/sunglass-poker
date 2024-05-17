// TableItem.js ou TableItem.jsx
import React, { useState, useRef } from "react";
import Button from "../../../button/Button.tsx";
import { useTranslation } from "../../../Utiles/Translations";
import TextInputComponent from "../../../textInput/TextInput.jsx";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import useOnClickOutside from "../../../../hooks/useOnClickOutside.js";

const ListTableItem = ({
  id,
  nom,
  rang,
  nombreDeJoueurs,
  ouvert,
  onJoinClick,
  isJoining,
}) => {
  const { verifyGamePassword } = useAuth();
  const { getTranslatedWord } = useTranslation();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => setShowPasswordInput(false));

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
                styleClass={`btn-list_table back-color2 ${isJoining ? 'loading' : ''}`}
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
