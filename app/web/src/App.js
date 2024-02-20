import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header.js';
import Home from './pages/home.js';
import Mael from './pages/mael';
import Login from './pages/login';
import Autre from './pages/autre';

function App() {
  return (
    <Router>
      <div className="App"><Header /></div>
      <Routes>
        <Route path="/UrlHome" Component={Home}/>
        <Route path="/NomURLMael" Component={Mael}/>
        <Route path="/ebl" Component={Autre}/>
        <Route path="/logi" Component={Login}/>
      </Routes>
    </Router>
  )
}

export default App;