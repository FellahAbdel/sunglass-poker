import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
<<<<<<< HEAD
<<<<<<< HEAD
import Home from "./pages/home";
import gameTable from "./pages/gameTable";
import { accueil } from "./pages/login";
=======
import acceuil from './components/acceuil/Acceuil';
>>>>>>> 2b2aff5 (réarrangement des fichiers)
=======
import acceuil from './components/acceuil/Acceuil';
>>>>>>> c06bbfca646406c6bcc332b41c73f6eb62083343

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
      </div>
      <Routes>
<<<<<<< HEAD
        <Route path="/home" Component={Home} />
        <Route path="/acceuil" Component={acceuil}/>
        <Route path="/login" Component={Login} />
        <Route path="/gameTable" Component={gameTable} />
=======
        <Route path="/" Component={acceuil}/>
    
>>>>>>> c06bbfca646406c6bcc332b41c73f6eb62083343
      </Routes>
    </Router>
  );
}

export default App;
