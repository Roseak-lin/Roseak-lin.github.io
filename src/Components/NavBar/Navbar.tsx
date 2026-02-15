import React from "react";
import { Navbar, Nav, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../Theme/ThemeContext";
import { BrightnessHighFill, MoonFill } from "react-bootstrap-icons";

const CustomNavbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
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

  const themeTooltip = (props: any) => {
    return (
      <Tooltip id="theme-tooltip" {...props}>
        Lights {theme === "light" ? "off" : "on"}!
      </Tooltip>
    );
  };

  return (
    <Navbar
      data-bs-theme={theme}
      expand="lg"
      fixed="top"
      className="px-4 bg-body-tertiary"
    >
      <Navbar.Brand
        className="justify-content-start"
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
        <Nav className="ms-auto">
          <Nav.Link
            onClick={() => {
              toggleTheme();
            }}
          >
            <OverlayTrigger placement="bottom" overlay={themeTooltip}>
              {theme === "light" ? <MoonFill /> : <BrightnessHighFill />}
            </OverlayTrigger>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
