import React, { useEffect } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import ScrollToTopButton from './Components/ScrollToTop';
import Experience from './Components/Experience';
import Projects from "./Components/Projects"
import Particles from "./Components/Particles"
import './App.css'

const App: React.FC = () => {
  
  return (
    <div className="App">
      <Navbar />
      <ScrollToTopButton />
      <Particles />
      <Home />
      <Experience />
      <Projects />
    </div>
  );
}

export default App;
