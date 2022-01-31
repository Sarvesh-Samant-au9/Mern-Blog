import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthState from "./Context/Auth/AuthAction";
import AlertState from "./Context/Alert/AlertActions";

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <AlertState>
        <App />
      </AlertState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
