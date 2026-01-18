import React from "react";
import ReactDOM from "react-dom/client"; // ✅ must be /client in React 18
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ createRoot
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
