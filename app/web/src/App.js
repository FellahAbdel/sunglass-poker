import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import acceuil from './components/acceuil/Acceuil';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
      </div>
      <Routes>
        <Route path="/" Component={acceuil}/>
    
      </Routes>
    </Router>
  );
}

export default App;
