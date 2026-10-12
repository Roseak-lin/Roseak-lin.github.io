import { memo, useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { type Engine, type ISourceOptions } from "@tsparticles/engine";

import "./Particles.css";
import { useTheme } from "../../context/ThemeContext";

// Must be a stable reference: ParticlesProvider throws if init changes
const initEngine = async (engine: Engine) => {
  await loadFull(engine);
};

export default memo(function ParticlesComponent() {
  const { theme } = useTheme();

  const particleColor = theme === "dark" ? "#ffffff" : "#000000";

  // memoize the options so tsparticles doesn't re-draw on every theme toggle
  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      particles: {
        number: {
          value: 60,
          density: { enable: true },
        },
        // v4: color moved from particles.color to particles.paint
        paint: {
          fill: {
            enable: true,
            color: { value: particleColor },
          },
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
    }),
    [particleColor],
  );

  return (
    <ParticlesProvider init={initEngine}>
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
});