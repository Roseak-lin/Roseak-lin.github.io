import React, { useEffect, useState } from "react";
import './ScrollToTop.css'

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollDistance = window.pageYOffset;
      const experienceSection = document.getElementById("experience");

      if (!experienceSection) return;

      const experienceHeight = experienceSection.scrollHeight;

      // Show button if scrolled down more than 40px
      if (scrollDistance > 40) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Change color theme based on position past "experience"
      if (scrollDistance > experienceHeight + 40) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <button
        className={`to-top ${isDark ? "dark" : "light"} ${isVisible ? "d-block" : "d-none"}`}
        onClick={scrollToTop}
      >
        &#8593;
      </button>
    </>
  );
};

export default ScrollToTop;
