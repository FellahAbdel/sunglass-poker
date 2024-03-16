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

function App() {
  return (
    <WindowProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/GameTable" Component={GameTable} />
          </Routes>
        </AuthProvider>
      </Router>
    </WindowProvider>
  );
}

export default App;
