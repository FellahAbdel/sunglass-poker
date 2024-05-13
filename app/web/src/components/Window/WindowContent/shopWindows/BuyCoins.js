import React, { useState } from "react";
import Button from "../../../button/Button.tsx";
import TextInputComponent from "../../../textInput/TextInput.jsx";
import { useUserData } from "../../../Utiles/useUserData";
import { useWindowContext } from "../../../Utiles/WindowContext";
import { useTranslation } from "../../../Utiles/Translations.jsx";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import "./buyCoins.css";

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
      openSuccessWindow("shop.success");
    } else {
      setValidationError("Failed to purchase coins. Please try again.");
    }
  };

  return (
    <div className="container-coinsWindow">
      {/* <form onSubmit={handlePurchase} className="buy-coins-form">
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
          styleClass=""
          type="submit"
          label={getTranslatedWord("shop.purchase")}
        />
      </form> */}
      <Button 
        styleClass={"btn-coinBuy"}
        iconSrc={require("./../../../assets/images/icons/white/coinStack.png")}
        label={"10 SC"}
        onClick={() => updateUserCoins(10)}
        />
      <Button 
        styleClass={"btn-coinBuy"}
        iconSrc={require("./../../../assets/images/icons/white/coinStack.png")}
        label={"100 SC"}
        onClick={() => updateUserCoins(100)}
        />      
      <Button 
        styleClass={"btn-coinBuy"}
        iconSrc={require("./../../../assets/images/icons/white/coinStack.png")}
        label={"1,000 SC"}
        onClick={() => updateUserCoins(1000)}
        />      
      <Button 
        styleClass={"btn-coinBuy"}
        iconSrc={require("./../../../assets/images/icons/white/coinStack.png")}
        label={"10,000 SC"}
        onClick={() => updateUserCoins(10000)}
        />
      <Button 
        styleClass={"btn-coinBuy"}
        iconSrc={require("./../../../assets/images/icons/white/coinStack.png")}
        label={"100,000 SC"}
        onClick={() => updateUserCoins(100000)}
        />
    </div>
  );
};

export default BuyCoinsWindow;
