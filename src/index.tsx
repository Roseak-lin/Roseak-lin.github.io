import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter } from "react-router-dom";
import CustomNavbar from "./Components/NavBar/Navbar";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import { ThemeProvider } from "./Components/Theme/ThemeContext";
import Particles from "./Components/Particles/Particles";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <HashRouter>
    <React.StrictMode>
      <ThemeProvider>
        <Particles />
        <CustomNavbar />
        <ScrollToTop />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </HashRouter>
);
