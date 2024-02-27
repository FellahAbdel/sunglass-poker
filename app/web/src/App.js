import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home';
import Login from './pages/login';
import gameTable from './pages/gameTable';
import io from 'socket.io-client';
const socket = io("<http://localhost:3001>");

socket.emit('hello', {data: 'Hello world'});
socket.on('world', (data) => {
  console.log(data);
})
function App() {
  return (
    <Router>
      <div className="App"><Header/>
      </div>
      <Routes>
        <Route path="/home" Component={Home}/>
        <Route path="/login" Component={Login}/>
        <Route path="/gameTable" Component={gameTable}/>
      </Routes>
    </Router>
  )
}

export default App;