import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './Home.css';

interface ProfileLink {
  label: string;
  href: string;
  icon: string;
  variant: string;
}

const PROFILES: ProfileLink[] = [
  { label: 'GitHub', href: 'https://github.com/Roseak-lin', icon: 'images/github.avif', variant: 'outline-dark' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/roseak-lin', icon: 'images/linkedin.avif', variant: 'outline-primary' },
];

const Home: React.FC = () => {
  return (
    <Container id="home" fluid className="m-0">
      <header id="hero">
        <h1 id="name">Roseak Lin</h1>
        <p id="tagline">Software Engineer @ Toast</p>
      </header>

      <nav id="links" aria-label="Profiles">
        {PROFILES.map(({ label, href, icon, variant }) => (
          <Button
            key={label}
            as="a"
            variant={variant}
            className="profile-link"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} profile`}
            data-label={label}
          >
            <img src={icon} alt="" />
          </Button>
        ))}
      </nav>
    </Container>
  );
};

export default Home;