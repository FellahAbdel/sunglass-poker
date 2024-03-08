import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Header from "./components/header/Header";
import Acceuil from "./components/acceuil/Acceuil";

function App() {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [windowType, setWindowType] = useState(null);

  const openWindow = (type) => {
    setIsWindowOpen(true);
    setWindowType(type);
  };

  const closeWindow = () => {
    setIsWindowOpen(false);
  };

  const [isLogged, setIsLogged] = useState(false);

  const logingIn = () => {
    setIsLogged(true);
  };

  const logingOut = () => {
    setIsLogged(false);
  };

  return (
    <Router>
      <Header
        isLogged={isLogged}
        logingIn={logingIn}
        logingOut={logingOut}
        openWindow={openWindow}
        closeWindow={closeWindow}
        isWindowOpen={isWindowOpen}
        windowType={windowType}
      />

      <Acceuil isLogged={isLogged} openWindow={openWindow} />
    </Router>
  );
}

export default App;
