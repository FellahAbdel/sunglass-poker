import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/configureStore";
import { Provider } from "react-redux";

import i18next from "./translations/i18next.js";
import { I18nextProvider } from 'react-i18next';

document.title = "SunGlassPoker"; // Remplacez 'Nouveau Titre' par le titre souhaité

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <I18nextProvider i18n={i18next}> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </I18nextProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
