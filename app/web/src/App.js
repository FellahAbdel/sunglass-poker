// Importations...
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameTable from "./pages/gameTable";
import Acceuil from "./pages/Acceuil";
import { WindowProvider } from "./components/WindowContext";
import { AuthProvider } from "./components/AuthProvider";
import Header from "./components/header/Header";
import "./App.css";

function App() {
  return (
    <WindowProvider>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Acceuil />} />
            <Route path="/GameTable" element={<GameTable />} />
          </Routes>
        </AuthProvider>
      </Router>
    </WindowProvider>
  );
}

export default App;
