// import React from "react";
// import "./login.css";
// import logo from "./logo.png";

// const Login = ({ onClose, onSignupClick }) => {
//   const handleBoxClick = (event) => {
//     event.stopPropagation();
//   };

//   return (
//     <div className="container" id="login-box">
//       <div className="overlay" onClick={onClose}>
//         <h1 className="text">Sign in to your account</h1>
//         <div className="login-box" id="login-box" onClick={handleBoxClick}>
//           <img src={logo} alt="Logo du site" className="logo" />
//           <input type="text" placeholder="Username" className="input" />
//           <input type="password" placeholder="Password" className="input" />
//           <button className="button login-button">Login</button>
//           <button className="forgot-button">
//             I forgot my password. Click here to reset
//           </button>
//           <button className="button register-button" onClick={onSignupClick}>
//             Register New Account
//           </button>
//           <p>or</p>
//           <button className="button login-button google-button">
//             Sign in with google
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React from "react";
import "./login.css";
import LoginBox from "./LoginBox";

const Login = ({ onClose, onSignupClick }) => {
  return (
    <div className="container" id="login-box">
      <div className="overlay" onClick={onClose}>
        <h1 className="text">Sign in to your account</h1>
        <LoginBox onSignupClick={onSignupClick} />
      </div>
    </div>
  );
};

export default Login;
