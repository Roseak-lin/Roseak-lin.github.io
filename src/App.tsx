import React, { lazy } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./Pages/HomePage/HomePage"));
const Photography = lazy(() => import("./Pages/Photography/PhotographyPage"));

const App: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photography" element={<Photography />} />
      </Routes>
  );
};

export default App;
