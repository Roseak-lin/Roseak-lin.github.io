import React, { lazy, useEffect } from "react";
import Home from "./Home/Home";
import { useLocation } from "react-router-dom";

const Experience = lazy(() => import("./Experience/Experience"));
const Projects = lazy(() => import("./Projects/Projects"));

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
      <Home />
      <Experience />
      <Projects />
    </div>
  );
};

export default HomePage;
