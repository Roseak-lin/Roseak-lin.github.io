import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Projects.css'

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
    title: 'Programming Solutions',
    description: 'Respositories of my solved problems from the University of Waterloo computing contests (CCC and CCO) and other programming questions from dmoj.ca. All solutions written in Java and C++.',
    img: 'images/cp_image.jpg',
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
            <Card className="mb-4 proj-card" style={{ '--hover-color': project.hoverColor } as React.CSSProperties}>
              <Card.Img variant="top" src={project.img} alt={project.title} />
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <Button
                  variant="dark"
                  className="m-1"
                  onClick={() => window.open(project.repo)}
                >
                  Source Code
                </Button>
                {project.live && (
                  <Button
                    variant="dark"
                    className="m-1"
                    onClick={() => window.open(project.live)}
                  >
                    Live Demo
                  </Button>
                )}
                {project.extra && (
                  <Button
                    variant="dark"
                    className="m-1"
                    onClick={() => window.open(project.extra)}
                  >
                    More
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Projects;
