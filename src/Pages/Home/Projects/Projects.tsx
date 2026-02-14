import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Projects.css'
import ProjCard from '../../../Components/ProjCard/ProjCard';

interface Project {
  title: string;
  description: string;
  img: string;
  repo: string;
  live?: string;
  extra?: string;
  hoverColor?: string;
}

const projects: Project[] = [
  {
    title: 'SpotiShare',
    description: "A real-time listening party using Spotify's API and Spotify's Web Player SDK to create a web app that allows users to listen to their favorite songs together.",
    img: 'images/Spotishare_screenshot.jpg',
    repo: 'https://github.com/Roseak-lin/Spotishare',
    hoverColor: "#00dd4a"
  },
  {
    title: 'DSA Visualizer',
    description: 'A web application built using ReactJS that gives visualizations for data structures such as stacks and algorithms such as BFS and DFS.',
    img: 'images/DSA_screenshot.jpg',
    repo: 'https://github.com/Roseak-lin/DS-and-Algorithm-Visualizer',
    live: 'https://roseak-lin.github.io/DS-and-Algorithm-Visualizer/',
    hoverColor: "#28b0ff"
  },
  {
    title: 'Competitive Programming Solutions',
    description: 'Respositories of my solved problems from the University of Waterloo computing contests (CCC and CCO) and other programming questions from dmoj.ca. All solutions written in Java and C++.',
    img: 'images/compprog_image.jpg',
    repo: 'https://github.com/Roseak-lin/CCC-CCO-Solutions',
    extra: 'https://github.com/Roseak-lin/DMOJ-solutions',
    hoverColor: "#ffd700"
  },
  {
    title: 'Smart Day',
    description: "This project was created for the 2021 Hack the 6ix hackathon. This project used the OpenWeatherMap API to retrieve data about a user's local weather and suggestions to the user regarding clothing and accessories (umbrellas, water bottles, heavy coats etc.)",
    img: 'images/smartday_screenshot.jpg',
    repo: 'https://github.com/p-han-tom/hack6-weather-app',
    live: 'https://p-han-tom.github.io/hack6-weather-app/',
    hoverColor: "#28b0ff"
  },
  {
    title: 'Sketchy Studios',
    description: 'This project was created for the 2021 Hack the North Hackathon. Sketchy Studios is a live, interactive party game where you can create a lobby for your friends to join! Built using ReactJS and NodeJS in just 36 hours and features multiple game phases and a full point system!',
    img: 'images/sketchystudios_screenshot.jpg',
    repo: 'https://github.com/JerryLin1/sketchy-studio',
    hoverColor: "#d22999"
  }
];

const Projects: React.FC = () => {
  return (
    <Container id="projects" fluid className="m-0 section">
      <h1 className="text-center my-4 section-title">Projects</h1>
      <Row className='g-4 m-0 justify-content-center'>
        {projects.map((project, key) => (
          <Col md={12} lg={6} xxl={4} key={key} className="d-flex align-items-stretch">
            <ProjCard
              title={project.title}
              description={project.description}
              img={project.img}
              repo={project.repo}
              live={project.live}
              extra={project.extra}
              hoverColor={project.hoverColor}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Projects;
