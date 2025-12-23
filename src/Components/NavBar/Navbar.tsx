import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./NavBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CustomNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToId: id } });
    } else {
      // Already on home — just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const openResume = () => {
    window.open("/Resume.pdf", "_blank");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="px-4">
      <Navbar.Brand
        onClick={() => scrollTo("home")}
        style={{ cursor: "pointer" }}
      >
        Roseak Lin
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick={() => scrollTo("experience")}>Experience</Nav.Link>
          <Nav.Link onClick={() => scrollTo("projects")}>Projects</Nav.Link>
          <Nav.Link onClick={openResume}>Resume</Nav.Link>
          <Nav.Link as={Link} to="/photography">
            Photography
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
