import React from "react";
import Button from "../../../button/Button.tsx";
import { useAuth } from "../../../Utiles/AuthProvider.jsx";
import "./buyCoins.css";

const BuyCoinsWindow = () => {
  const { updateUserCoins } = useAuth();

  return (
    <div className="container-coinsWindow">
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
