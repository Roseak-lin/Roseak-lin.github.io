import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ExpCard from "../../../Components/ExpCard/ExpCard";
import "./Experience.css";

const Experience: React.FC = () => {
  return (
    <Container id="experience" fluid className="m-0 section">
      <h1 className="text-center my-4 section-title">
        Experience and Achievements
      </h1>

      <Row className="justify-content-center m-0">
        <Col>
          <ExpCard
            title="Software Developer Intern"
            icon={<img src="images/JD_Power_Logo.webp" alt="JD Power Logo" height={40} />}
            subtitle="JD Power | May 2024 - Aug 2025"
            items={[
              "Ensured 99.9% service availability for Spring Boot microservices by resolving high-priority production defects and engineering feature enhancements for a system processing 2M+ daily requests",
              "Increased throughput by 2x across multiple services by leading a Cassandra client dependency upgrade",
              "Developed Java production hotfix scripts to correct data inconsistencies in Cassandra-backed microservices, updating more than 400k records and restoring data integrity",
              "Engineered a Java JUnit test suite for an internal code generation tool, integrating it into GitLab CI/CD to gate builds across 20+ projects",
              "Led development of AI-Powered IntelliJ and Gradle plugins to automate documentation and in-line comment generation",
            ]}
          />
          <ExpCard
            title="Web Designer and Developer"
            icon={<img src="images/sinai_logo.svg" height={50}/>}
            subtitle="Sinai Foundation Canada | May 2022 - Jul 2022"
            items={[
              "Consolidated duplicated UI patterns into reusable React components and centralized content logic, reducing total frontend codebase size by 15%",
              "Implemented responsive styling and accessibility improvements across 20+ components, enhancing cross-device usability and UI consistency",
              "Leveraged react-snap for pre-rendering to improve SEO and achieve full content indexability",
           ]}
          />
          <ExpCard
            title="Programming Tutor"
            subtitle="Western Polaris School | 2019 - 2021"
            items={[
              "Created content and taught curriculum on basic and advanced programming topics such as data types, object oriented programming, algorithms, and basic data structures using Java",
              "Created assignments and walked through solutions to help the students apply and retain knowledge",
            ]}
          />
          <ExpCard>
            <h5>
              Participation in the{" "}
              <a
                href="https://devpost.com/software/sketchy-studios"
                target="_blank"
                rel="noopener noreferrer"
              >
                2021 Hack the North hackathon
              </a>{" "}
              and{" "}
              <a
                href="https://devpost.com/software/smart-day"
                target="_blank"
                rel="noopener noreferrer"
              >
                2021 Hack the 6ix hackathon
              </a>
              .
            </h5>
          </ExpCard>
          <ExpCard>
            <h5>
              2020/2021 CCC Junior and Senior Certificate of Distinction.
              Competed using Java and C++.
            </h5>
          </ExpCard>
        </Col>
      </Row>
    </Container>
  );
};

export default Experience;
