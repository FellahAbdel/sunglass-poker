// import { useAuth, getUserInfo } from "../AuthProvider";
// import React, { useState } from 'react';
import store from "./store/configureStore";
import { Provider } from "react-redux";
import "./App.css";
// import { BrowserRouter as Router, Route, Routes }from 'react-router-dom';
import GameTable from "./pages/gameTable";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { AuthProvider } from "./components/Utiles/AuthProvider";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { WindowProvider } from "./components/Utiles/WindowContext";
import { SettingsProvider } from "./components/Utiles/SettingsContext";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
