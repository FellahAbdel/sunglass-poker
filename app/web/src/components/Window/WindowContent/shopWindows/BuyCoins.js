import React from "react";
import Button from "../../../button/Button.tsx";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import "./buyCoins.css";
import { useWindowContext } from "../../../Utiles/WindowContext";

/**
 * BuyCoinsWindow provides a user interface for purchasing virtual coins.
 * It displays various purchasing options and handles the purchase transactions.
 */
const BuyCoinsWindow = () => {
  const { updateUserCoins } = useAuth();
  const { openSuccessWindow } = useWindowContext();

  /**
   * Initiates the purchase of coins and handles the result.
   * @param {number} amount - The amount of coins to buy.
   */
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
        label={"100 SC - 1€"}
        onClick={() => handleBuyCoins(100)}
      />
      <Button
        styleClass={"btn-coinBuy"}
        iconSrc={"static/media/assets/images/icons/white/coinStack.png"}
        label={"1,000 SC - 10€"}
        onClick={() => handleBuyCoins(1000)}
      />
      <Button
        styleClass={"btn-coinBuy"}
        iconSrc={"static/media/assets/images/icons/white/coinStack.png"}
        label={"10,000 SC - 100€"}
        onClick={() => handleBuyCoins(10000)}
      />
      <Button
        styleClass={"btn-coinBuy"}
        iconSrc={"static/media/assets/images/icons/white/coinStack.png"}
        label={"5,000 SC - 500€"}
        onClick={() => handleBuyCoins(50000)}
      />
      <Button
        styleClass={"btn-coinBuy"}
        iconSrc={"static/media/assets/images/icons/white/coinStack.png"}
        label={"100,000 SC - 1000€"}
        onClick={() => handleBuyCoins(100000)}
      />
    </div>
  );
};

export default BuyCoinsWindow;
