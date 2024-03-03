import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home';
import Login from './pages/login';
import GameTable from './pages/gameTable';

function App() {
  return (
    <Router>
      <div className="App"><Header/></div>
      <Routes>
        <Route path="/home" Component={Home}/>
        <Route path="/login" Component={Login}/>
        <Route path="/GameTable" Component={GameTable}/>
      </Routes>
    </Router>
  )
}

export default App;