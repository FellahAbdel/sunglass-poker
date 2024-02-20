import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header.js';
import Home from './pages/home.js';
import Login from './pages/login';

function App() {
  return (
    <Router>
      <div className="App"><Header /></div>
      <Routes>
        <Route path="/UrlHome" Component={Home}/>
        <Route path="/logi" Component={Login}/>
      </Routes>
    </Router>
  )
}

export default App;