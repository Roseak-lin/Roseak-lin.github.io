import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { type Engine } from "@tsparticles/engine";

import "./Particles.css";
import { useTheme } from "../Theme/ThemeContext";

export default function () {
  const [init, setInit] = useState(false);
  const { theme } = useTheme(); // Access current theme

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  const particleColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: false },
        particles: {
          number: {
            value: 80,
            density: { enable: true },
          },
          color: {
            value: particleColor, // Dynamic color
          },
          shape: { type: "circle" },
          opacity: {
            value: 0.75,
          },
          size: {
            value: 3,
          },
          links: {
            enable: true,
            distance: 200,
            color: particleColor,
            opacity: 0.5,
            width: 0.5,
          },
          move: {
            enable: true,
            speed: 8,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
        },
        detectRetina: false,
      }}
    />
  );
};