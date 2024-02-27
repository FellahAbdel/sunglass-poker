// login.jsx
import React, { useState } from "react";
import Window from "../components/connectionWindow/Window";

const Login = () => {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [windowType, setWindowType] = useState(null);

  const openWindow = (type) => {
    setIsWindowOpen(true);
    setWindowType(type);
  };

  const closeWindow = () => {
    setIsWindowOpen(false);
  };

  return (
    <div>
      <button onClick={() => openWindow("signup")}>Create an account</button>
      <button onClick={() => openWindow("login")}>Login</button>

      {isWindowOpen && <Window onClose={closeWindow} windowType={windowType} />}
    </div>
  );
};

export default Login;
