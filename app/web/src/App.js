// import { useAuth, getUserInfo } from "../AuthProvider";
// import React, { useState } from 'react';
import "./App.css";
// import { BrowserRouter as Router, Route, Routes }from 'react-router-dom';
import GameTable from "./pages/gameTable";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import { AuthProvider } from "./components/Utiles/AuthProvider";
import { WindowProvider } from "./components/Utiles/WindowContext";
import { SettingsProvider } from "./components/Utiles/SettingsContext";
import { GameTableProvider } from "./components/Utiles/GameTableProvider";

function App() {
  return (
    <WindowProvider>
      <Router basename=''>
        <AuthProvider>
          <SettingsProvider>
            <GameTableProvider>
              <Routes>
                <Route path="/" Component={GameTable} />
              </Routes>
            </GameTableProvider>
          </SettingsProvider>
        </AuthProvider>
      </Router>
    </WindowProvider>
  );
}

export default App;
