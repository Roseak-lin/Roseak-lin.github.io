import React, { useEffect } from "react";
import CustomNavbar from "../../Components/NavBar/Navbar";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Particles from "../../Components/Particles/Particles";
import Home from "../Home/Home";
import Experience from "../Home/Experience/Experience";
import Projects from "../Home/Projects/Projects";
import { useLocation } from "react-router-dom";

const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if a scrollToId was passed in the navigation state
    if (location.state && location.state.scrollToId) {
      const element = document.getElementById(location.state.scrollToId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state]); // This effect runs whenever the navigation state changes

  return (
    <div className="App">
      <CustomNavbar />
      <ScrollToTop />
      <Particles />
      <Home />
      <Experience />
      <Projects />
    </div>
  );
};

export default HomePage;
