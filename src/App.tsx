import React from 'react';
import Navbar from './Components/Navbar.tsx';
import Home from './Components/Home.tsx';
import ScrollToTopButton from './Components/ScrollToTop.tsx';
import Experience from './Components/Experience.tsx';
import Projects from "./Components/Projects.tsx"
import Particles from "./Components/Particles.tsx"
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
