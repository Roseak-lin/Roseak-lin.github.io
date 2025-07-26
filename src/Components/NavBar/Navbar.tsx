import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './NavBar.css'

const CustomNavbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openResume = () => {
    window.open('/Resume.pdf', '_blank');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container className='px-0 mx-4'>
        <Navbar.Brand onClick={() => scrollTo('home')} style={{ cursor: 'pointer' }}>
          Roseak Lin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => scrollTo('home')}>Home</Nav.Link>
            <Nav.Link onClick={() => scrollTo('experience')}>Experience</Nav.Link>
            <Nav.Link onClick={() => scrollTo('projects')}>Projects</Nav.Link>
            <Nav.Link onClick={openResume}>Resume</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
