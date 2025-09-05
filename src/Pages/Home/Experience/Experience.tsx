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
            subtitle="JD Power | May 2024 - Aug 2025"
            items={[
              "Resolved over 100 unique CVEs across more than 30 services, libraries, and ETLs, resulting in an over 90% drop in vulnerabilities in projects the team managed",
              "Engineered a custom Java test suite for an internal code generation tool used in 20+ projects, and integrated it with GitLab CI/CD to streamline testing and accelerate deployments",
              "Contributed to a team-led R&D project focused on integrating AI-driven tooling into developer workflows, developing IntelliJ Gradle plugins, experimenting with Ollama models, and delivering findings to support a potential company-wide rollout",
              "Researched and refactored Java code in Spring Boot microservices and libraries to support functional and library changes from Cassandra 3 to 4; authored migration documentation adopted team-wide, enabling up to a 2x throughput increase during the production rollout",
              "Leveraged Jenkins and Rancher for Kubernetes management to deploy services, debug issues, and monitor resource usage and performance",
            ]}
          />
          <ExpCard
            title="Web Designer and Developer"
            subtitle="Sinai Foundation Canada | May 2022 - Jul 2022"
            items={[
              "Led, strategized, and executed projects aimed at enhancing the user interface (UI) and accessibility of the website utilizing ReactJS",
              "Revamped the site with a fresh theme, implementing a responsive design on over 20 components using Bootstrap and SCSS",
              "Refactored the codebase by implementing modular sub-components and integrating a content parsing function, transitioning from inline text to JSON files and generating more than 10 new JSON files for streamlined data organization",
              "Improved and optimized SEO using React Snap by refining metadata visibility for web crawlers, with a special emphasis on optimizing for Facebook crawlers, given the company’s significant activity on the platform",
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
