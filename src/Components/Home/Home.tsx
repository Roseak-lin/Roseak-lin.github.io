import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './Home.css'

const Home: React.FC = () => {
  return (
    <Container id="home" fluid className="m-0">
      <h1 id="name">Roseak Lin</h1>
      <div id="links" className="my-4">
        <strong>My profiles:</strong><br />
        <Button
          variant="outline-warning"
          className="m-2"
          onClick={() => window.open('https://dmoj.ca/user/chopstick')}
        >
          <img src="images/dmoj.png" alt="DMOJ" />
        </Button>
        <Button
          variant="outline-dark"
          className="m-2"
          onClick={() => window.open('https://github.com/Roseak-lin')}
        >
          <img src="images/github.jpg" alt="GitHub" />
        </Button>
        <Button
          variant="outline-primary"
          className="m-2"
          onClick={() => window.open('https://linkedin.com/in/roseak-lin')}
        >
          <img src="images/linkedin.png" alt="LinkedIn" />
        </Button>
      </div>
    </Container>
  );
};

export default Home;
