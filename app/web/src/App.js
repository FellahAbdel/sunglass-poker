import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home";
import gameTable from "./pages/gameTable";
import { accueil } from "./pages/login";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
      </div>
      <Routes>
        <Route path="/home" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/gameTable" Component={gameTable} />
      </Routes>
    </Router>
  );
}

export default App;
