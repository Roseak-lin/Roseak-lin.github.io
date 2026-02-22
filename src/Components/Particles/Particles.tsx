import { useEffect, useState, memo, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { type Engine } from "@tsparticles/engine";

import "./Particles.css";
import { useTheme } from "../Theme/ThemeContext";

export default memo(function ParticlesComponent() {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particleColor = theme === "dark" ? "#ffffff" : "#000000";

  // memoize the options so tsparticles doesn't re-draw on every theme toggle
  const options = useMemo(() => ({
    fullScreen: { enable: false },
    particles: {
      number: {
        value: 60,
        density: { enable: true },
      },
      color: {
        value: particleColor,
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
  }), [particleColor]); 

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options as any}
    />
  );
});