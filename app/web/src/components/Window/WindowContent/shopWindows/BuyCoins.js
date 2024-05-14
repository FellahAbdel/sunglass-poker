import React from "react";
import Button from "../../../button/Button.tsx";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import "./buyCoins.css";
import { useWindowContext } from "../../../Utiles/WindowContext";

const BuyCoinsWindow = () => {
  const { updateUserCoins } = useAuth();
  const { openSuccessWindow } = useWindowContext();


  const handleBuyCoins = async (amount) => {
    const result = await updateUserCoins(amount);
    if (result === true) {
      openSuccessWindow("shop.coins");
    } else {
      console.error("Failed to update coins:", result.message);
    }
  };

  return (
    <div className="container-coinsWindow">
      <Button
        styleClass={"btn-coinBuy"}
        iconSrc={"static/media/assets/images/icons/white/coinStack.png"}
        label={"10 SC"}
        onClick={() => handleBuyCoins(10)}
      />
      <Button
        styleClass={"btn-coinBuy"}
        iconSrc={"static/media/assets/images/icons/white/coinStack.png"}
        label={"100 SC"}
        onClick={() => handleBuyCoins(100)}
      />
      <Button
        styleClass={"btn-coinBuy"}
        iconSrc={"static/media/assets/images/icons/white/coinStack.png"}
        label={"1,000 SC"}
        onClick={() => handleBuyCoins(1000)}
      />
      <Button
        styleClass={"btn-coinBuy"}
        iconSrc={"static/media/assets/images/icons/white/coinStack.png"}
        label={"10,000 SC"}
        onClick={() => handleBuyCoins(10000)}
      />
      <Button
        styleClass={"btn-coinBuy"}
        iconSrc={"static/media/assets/images/icons/white/coinStack.png"}
        label={"100,000 SC"}
        onClick={() => handleBuyCoins(100000)}
      />
    </div>
  );
};

export default BuyCoinsWindow;
