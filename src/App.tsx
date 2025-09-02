import React from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import PhotographyPage from './Pages/Photography/PhotographyPage';

const App: React.FC = () => {
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/photography" element={<PhotographyPage />} />
    </Routes>
  );
}

export default App;
