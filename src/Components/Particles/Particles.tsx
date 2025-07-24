import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { Container, Engine } from "@tsparticles/engine";
import React from "react";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => { 
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  if (!init) {
    return null; // nothing until particles are ready
  }

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: false,
        },
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
            },
          },
          color: {
            value: "#000000",
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 0.75,
            animation: {
              enable: false,
              speed: 1,
              sync: false,
            },
          },
          size: {
            value: 3,
            animation: {
              enable: false,
              speed: 40,
              sync: false,
            },
          },
          links: {
            enable: true,
            distance: 200,
            color: "#000000",
            opacity: 0.5,
            width: 0.5,
          },
          move: {
            enable: true,
            speed: 10,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
            attract: {
              enable: false
            },
          },
        },
        detectRetina: false,
      }}      
    />
  );
};

export default ParticlesBackground;
