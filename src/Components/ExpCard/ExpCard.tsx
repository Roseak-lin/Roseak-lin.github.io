import React from "react";
import "./ExpCard.css";
import { Col, Container, Row } from "react-bootstrap";

interface ExpCardProps {
  title?: string;
  subtitle?: string;
  items?: string[];
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const ExpCard: React.FC<ExpCardProps> = ({
  title,
  subtitle,
  icon,
  items,
  children,
}) => {
  return (
    <div className="exp-card">
      <Container fluid>
        <Row className="align-items-center">
          <Col xs="auto" className="p-0">{title && <h3>{title}</h3>}</Col>
          <Col fluid>{icon}</Col>
        </Row>
        <Row>{subtitle && <h5 className="text-muted">{subtitle}</h5>}</Row>
        {items && (
          <ul>
            {items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
        {children}
      </Container>
    </div>
  );
};

export default ExpCard;
