import React, { useState } from 'react';
import logo from './logo.png';

const App = () => {
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isSignUpVisible, setSignUpVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);


  const showLogin = () => {
    setLoginVisible(true);
    setSignUpVisible(false);
  };

  const hideLogin = () => {
    setLoginVisible(false);
  };

  const showSignUp = () => {
    setLoginVisible(false);
    setSignUpVisible(true);
  };
  
  const hideSignUp = () => {
    setSignUpVisible(false);
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  };

  const loginBoxStyle = {
    backgroundColor: 'white',
    width: '400px',
    padding: '20px 40px',
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
    display: 'block'
  };

  const logoStyle = {
    width: '100px',
    marginBottom: '20px',
  };

  const baseStyle = {
    width: '100%',
    height: '40px',
    fontSize: '16px',
    padding: '5px 10px',
    borderRadius: '5px',
  };


  const inputStyle = {
    ...baseStyle,
    border: '1px solid #ccc',
    backgroundColor: 'rgba(237, 242, 247, 1)',
    borderBottom: '2px solid rgba(253, 204, 22, 1)',
    marginBottom: '10px',
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const loginButtonStyle = {
    ...baseStyle,
    color: 'black',
    border: '1px solid #ccc',
    cursor: 'pointer',
    fontSize: '20px',
    fontWeight: 'bold',
    backgroundColor: isHovered ? 'rgba(150, 150, 100, 1)' : 'rgba(253, 204, 22, 1)',
  };

  const forgotButtonStyle = {
    ...baseStyle,
    color: 'grey',
    border: '1px solid #ccc',
    cursor: 'pointer',
    fontSize: '20px',
    backgroundColor: isHovered ? 'rgba(237, 242, 247, 1)' : 'white',
  };

  const signGoogleStyle = {
    ...baseStyle,
    color: 'black',
    border: '1px solid #ccc',
    cursor: 'pointer',
    fontSize: '20px',
    fontWeight: 'bold',
    backgroundColor: isHovered ? 'rgba(237, 242, 247, 1)' : 'white',
  };
  

  const handleBoxClick = (e) => {
    e.stopPropagation();
  };



  const signUpContent = (
    <div style={containerStyle}>
    <div style={overlayStyle} onClick={hideSignUp}>
      <h1 style={textStyle}>Create a new account</h1>
      <div style={loginBoxStyle} onClick={handleBoxClick}>
        <img src={logo} alt="Logo du site" style={logoStyle} />
        <input type="text" placeholder="Username" style={inputStyle} />
        <input type="email" placeholder="Email" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />
        <input type="passwordRepeated" placeholder="Repeat your password" style={inputStyle} />
        <button style={loginButtonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Register</button>
        <p>I forgot my password. Click here to reset</p>
        <button style={forgotButtonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={showLogin}>Login</button>
        <p>or</p>
        <button style={signGoogleStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Register with google</button>
      </div>
    </div>
  </div>
  );

  const loginContent = (
    <div style={containerStyle}>
    <div style={overlayStyle} onClick={hideLogin}>
      <h1 style={textStyle}>Sign in to your account</h1>
      <div style={loginBoxStyle} onClick={handleBoxClick}>
        <img src={logo} alt="Logo du site" style={logoStyle} />
        <input type="text" placeholder="Username" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />
        <button style={loginButtonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Login</button>
        <p>I forgot my password. Click here to reset</p>
        <button style={forgotButtonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={showSignUp}>Register New Account</button>
        <p>or</p>
        <button style={signGoogleStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Sign in with google</button>
      </div>
    </div>
  </div>
  );

  return (
    <div>
      <button onClick={showSignUp}>Creer un compte</button>
      <button onClick={showLogin}>Connexion</button>
      {isSignUpVisible ? signUpContent : null}
      {isLoginVisible ? loginContent : null}
      
    </div>
  );
};


export default App;
