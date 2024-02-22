import React, { useState } from 'react';
import logo from './logo.png';

const App = () => {
  const [isLoginVisible, setLoginVisible] = useState(false);

  const showLogin = () => {
    setLoginVisible(true);
  };

  const hideLogin = () => {
    setLoginVisible(false);
  };

  const containerStyle = {
    position: 'relative',
    height: '100vh',
    backgroundImage: 'url("background.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
    display: isLoginVisible ? 'flex' : 'none',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  };

  const loginBoxStyle = {
    backgroundColor: 'white',
    padding: '20px 100px',
    zIndex: 3,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 'auto',
    boxShadow: ' 10px 15px rgba(253, 204, 22, 1)',
  };

  const textStyle = {
    color: 'rgb(0, 0, 0)',
    fontSize: '24px',
    marginBottom: '20px',
    zIndex: 4,
    display: isLoginVisible ? 'block' : 'none'
  };

  const logoStyle = {
    width: '100px',
    marginBottom: '20px',
  };

  const handleBoxClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div style={containerStyle}>
      <button onClick={showLogin}>Connexion</button>
      <div style={overlayStyle} onClick={hideLogin}>
        <h1 style={textStyle}>Sign in to your account</h1>
        <div style={loginBoxStyle} onClick={handleBoxClick}>
          <img src={logo} alt="Logo du site" style={logoStyle} />
          <p>Username</p>
          <p>Password</p>
          <p>login</p>
          <p>I forgot my password. Click here to reset</p>
          <p>Register New Account</p>
          <p>or</p>
          <p>Sign in with google</p>
        </div>
      </div>
    </div>
  );
};

export default App;
