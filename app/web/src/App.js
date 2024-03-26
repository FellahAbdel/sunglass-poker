// import { useAuth, getUserInfo } from "../AuthProvider";
// import React, { useState } from 'react';
import "./App.css";
// import { BrowserRouter as Router, Route, Routes }from 'react-router-dom';
import GameTable from "./pages/gameTable";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { AuthProvider } from "./components/AuthProvider";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { WindowProvider } from "./components/WindowContext";
import { SettingsProvider } from "./components/SettingsContext";
import comm from './services/socket.js';

comm.Init();
comm.joinRoom(2);
function App() {
  return (
    <WindowProvider>
      <Router>
        <AuthProvider>
          <SettingsProvider>
            <Routes>
              <Route path="/" Component={GameTable} />
            </Routes>
          </SettingsProvider>
        </AuthProvider>
      </Router>
    </WindowProvider>
  );
}

export default App;
