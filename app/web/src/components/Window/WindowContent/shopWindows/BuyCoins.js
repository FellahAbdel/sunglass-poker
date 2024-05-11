import React, { useState } from "react";
import Button from "../../../button/Button.tsx";
import TextInputComponent from "../../../textInput/TextInput.jsx";
import { useUserData } from "../../../Utiles/useUserData";
import { useWindowContext } from "../../../Utiles/WindowContext";
import { useTranslation } from "../../../Utiles/Translations.jsx";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";

const BuyCoinsWindow = () => {
  const { updateUserCoins } = useAuth();
  const [amount, setAmount] = useState("");
  const [validationError, setValidationError] = useState("");
  const { user } = useUserData();
  const { closeWindow, openSuccessWindow } = useWindowContext();
  const { getTranslatedWord } = useTranslation();

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      setValidationError("Please enter a valid amount");
      return;
    }
  
    const success = await updateUserCoins(parseInt(amount));
    if (success) {
      openSuccessWindow("purchase.successMessage");
      closeWindow();
    } else {
      setValidationError("Failed to purchase coins. Please try again.");
    }
  };

  return (
    <div className="buy-coins-window">
      <form onSubmit={handlePurchase} className="buy-coins-form">
        <TextInputComponent
          name="coin-amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={getTranslatedWord("shop.enterAmount")}
          errorMessage={validationError}
          styleClass={"input-connectionDefault input-icon-profile"}
          type="number"
        />
        <Button
          styleClass="btn-connectionDefault login-button back-color1"
          type="submit"
          label={getTranslatedWord("shop.buy")}
        />

        <Button
          styleClass="btn-connectionDefault login-button back-color1"
          onClick={closeWindow}
          label={getTranslatedWord("general.close")}
        />
      </form>
    </div>
  );
};

export default BuyCoinsWindow;
