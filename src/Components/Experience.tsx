import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ExpCard from "./ExpCard.tsx";

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
              "Resolved over 100 unique security vulnerabilities across more than 30 services, libraries, and ETLs. In total, over 1200 security vulnerabilities were resolved",
              "Engineered a custom Java test suite for an internal code generation tool used in 20+ projects, and integrated it into GitLab CI/CD to streamline testing and speed up deployments",
              "Migrated multiple projects from Cassandra 3 to Cassandra 4, boosting efficiency by up to 100% and creating clear migration documentation for other developers",
            ]}
          />
          <ExpCard
            title="Web Designer and Developer"
            subtitle="Sinai Foundation Canada | May 2022 - Jul 2022"
            items={[
              "Led, strategized, and executed multiple projects aimed at enhancing the user interface (UI) and accessibility of the website utilizing ReactJS",
              "Revamped the entire website by introducing a fresh theme and implementing a responsive design using Bootstrap and SCSS",
              "Refactored the codebase by incorporating modular sub-components and implementing a content parsing function to replace inline text content with JSON files",
              "Improved SEO for the website with React Snap by improving what metadata was visible to webcrawlers",
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
              2020/2021 CCC Junior Certificate of Distinction (63/75). Competed
              using Java and C++.
            </h5>
          </ExpCard>
        </Col>
      </Row>
    </Container>
  );
};

export default Experience;
