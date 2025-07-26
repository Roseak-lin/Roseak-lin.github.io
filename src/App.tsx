import React from 'react';
import './App.css'
import NavBar from './Components/NavBar/Navbar'
import ScrollToTopButton from './Components/ScrollToTop/ScrollToTop'
import Particles from './Components/Particles/Particles'
import Home from './Components/Home/Home'
import Experience from './Components/Experience/Experience'
import Projects from './Components/Projects/Projects'

const App: React.FC = () => {
  
  return (
    <div className="App">
      <NavBar />
      <ScrollToTopButton />
      <Particles />
      <Home />
      <Experience />
      <Projects />
    </div>
  );
}

export default App;
