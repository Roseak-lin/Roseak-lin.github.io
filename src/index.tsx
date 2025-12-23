import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter } from "react-router-dom";
import CustomNavbar from "./Components/NavBar/Navbar";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <HashRouter>
    <React.StrictMode>
      <CustomNavbar />
      <ScrollToTop />
      <App />
    </React.StrictMode>
  </HashRouter>
);
