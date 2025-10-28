import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// estilos globales
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/estilos.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
