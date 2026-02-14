import { Button, Card } from "react-bootstrap";
import "./ProjCard.css";
import { useTheme } from "../Theme/ThemeContext";

type ProjCardProps = {
  title: string;
  description: string;
  img: string;
  repo: string;
  live?: string;
  extra?: string;
  hoverColor?: string;
};

export default function ProjCard({
  title,
  description,
  img,
  repo,
  live,
  extra,
  hoverColor,
}: ProjCardProps) {
  const { theme } = useTheme();
  const buttonTheme = theme === "light" ? "dark" : "light";
  return (
    <Card
      className="mb-4 proj-card"
      style={{ "--hover-color": hoverColor } as React.CSSProperties}
    >
      <Card.Img variant="top" src={img} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button
          variant={buttonTheme}
          className="m-1"
          onClick={() => window.open(repo)}
        >
          Source Code
        </Button>
        {live && (
          <Button
            variant={buttonTheme}
            className="m-1"
            onClick={() => window.open(live)}
          >
            Live Demo
          </Button>
        )}
        {extra && (
          <Button
            variant={buttonTheme}
            className="m-1"
            onClick={() => window.open(extra)}
          >
            More
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
