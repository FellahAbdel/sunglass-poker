import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Header from "./components/header/Header";
import Acceuil from "./components/acceuil/Acceuil";
import { AuthProvider } from "./components/AuthProvider";

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

  return (
    <Router>
      <AuthProvider>
        <Header
          openWindow={openWindow}
          closeWindow={closeWindow}
          isWindowOpen={isWindowOpen}
          windowType={windowType}
        />

        <Acceuil openWindow={openWindow} />
      </AuthProvider>
    </Router>
  );
}

export default App;
