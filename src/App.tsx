import React, { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./Pages/HomePage/HomePage"));
const Photography = lazy(() => import("./Pages/Photography/PhotographyPage"));
const Admin = lazy(() => import("./cloudflare"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Suspense>
  );
};

export default App;
