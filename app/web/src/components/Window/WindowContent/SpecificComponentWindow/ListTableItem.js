// TableItem.js ou TableItem.jsx
import React, { useState } from "react";
import Button from "../../../button/Button.tsx";
import locked from "../../../assets/images/icons/white/password.png";
import unlocked from "../../../assets/images/icons/white/unlock.png";
import { useTranslation } from "../../../Utiles/Translations";
import TextInputComponent from "../../../textInput/TextInput.jsx";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";

const ListTableItem = ({ id, nom, rang, nombreDeJoueurs, ouvert, onJoinClick }) => {
  const { verifyGamePassword } = useAuth();
  const { getTranslatedWord } = useTranslation();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleJoinClick = async () => {
    if (!ouvert) {
      if (password.trim() === "") {
        setPasswordError("Please enter the password");
        return;
      }
      const result = await verifyGamePassword(id, password);
      if (!result.success) {
        setPasswordError(result.error || "Incorrect password");
        return;
      }
    }
    onJoinClick(id);
  };
  return (
    <div className="tableRow">
      <div className="rowItem">{nom}</div>
      <div className="rowItem">{rang}</div>
      <div className="rowItem">{nombreDeJoueurs}/10</div>
      <div className="rowItem">
        {ouvert ? (
          <img src={unlocked} alt="Open" />
        ) : (
          <img src={locked} alt="Closed" />
        )}
      </div>
      <div className="rowItem">
        {nombreDeJoueurs < 10 ? (
          <>
            <Button
              label={getTranslatedWord("serverPanel.join")}
              styleClass="btn-list_table btn-list_table_join back-color2"
              onClick={handleJoinClick}
            />
            {!ouvert && (
              <TextInputComponent
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                errorMessage={passwordError}
                styleClass="input-password"
              />
            )}
          </>
        ) : (
          <Button
            label={getTranslatedWord("serverPanel.full")}
            styleClass="btn-list_table btn-list_table_full"
            disabled
          />
        )}
      </div>
    </div>
  );
};

export default ListTableItem;
