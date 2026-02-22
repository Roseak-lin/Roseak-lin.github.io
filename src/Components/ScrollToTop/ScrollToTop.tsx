import React, { useEffect, useState } from "react";
import './ScrollToTop.css'

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollDistance = window.pageYOffset;

      // Show button if scrolled down more than 40px
      if (scrollDistance > 40) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
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
        className={`to-top ${isVisible ? "d-block" : "d-none"}`}
        onClick={scrollToTop}
        aria-label="Scroll To Top"
      >
        &#8593;
      </button>
    </>
  );
};

export default ScrollToTop;
