import React from "react";
import { Container } from "react-bootstrap";
import ExpCard from "../../../Components/ExpCard/ExpCard";
import "./Experience.css";

interface Job {
  title: string;
  subtitle: string;
  logo?: { src: string; alt: string };
  items: string[];
}

const LOGO_HEIGHT = 40;

const jobs: Job[] = [
  {
    title: "Software Engineer",
    subtitle: "Toast | Sep 2026 - Present",
    logo: { src: "images/Toast_Logo.png", alt: "Toast logo" },
    items: ["Canadian and Emerging Markets"],
  },
  {
    title: "Software Developer Intern",
    subtitle: "JD Power | May 2024 - Aug 2025",
    logo: { src: "images/JD_Power_Logo.webp", alt: "JD Power logo" },
    items: [
      "Ensured 99.9% service availability for Spring Boot microservices by resolving high-priority production defects and engineering feature enhancements for a system processing 2M+ daily requests",
      "Increased throughput by 2x across multiple services by leading a Cassandra client dependency upgrade",
      "Developed Java production hotfix scripts to correct data inconsistencies in Cassandra-backed microservices, updating more than 400k records and restoring data integrity",
      "Engineered a Java JUnit test suite for an internal code generation tool, integrating it into GitLab CI/CD to gate builds across 20+ projects",
      "Led development of AI-Powered IntelliJ and Gradle plugins to automate documentation and in-line comment generation",
    ],
  },
  {
    title: "Web Designer and Developer",
    subtitle: "Sinai Foundation Canada | May 2022 - Jul 2022",
    logo: { src: "images/sinai_logo.svg", alt: "Sinai Foundation Canada logo" },
    items: [
      "Consolidated duplicated UI patterns into reusable React components and centralized content logic, reducing total frontend codebase size by 15%",
      "Implemented responsive styling and accessibility improvements across 20+ components, enhancing cross-device usability and UI consistency",
      "Leveraged react-snap for pre-rendering to improve SEO and achieve full content indexability",
    ],
  },
  {
    title: "Programming Tutor",
    subtitle: "Western Polaris School | 2019 - 2021",
    items: [
      "Created content and taught curriculum on basic and advanced programming topics such as data types, object oriented programming, algorithms, and basic data structures using Java",
      "Created assignments and walked through solutions to help the students apply and retain knowledge",
    ],
  },
];

const ExternalLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a className="exp-link" href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const Experience: React.FC = () => {
  return (
    <Container
      as="section"
      id="experience"
      fluid
      className="m-0 section"
      aria-labelledby="experience-heading"
    >
      <h1 id="experience-heading" className="text-center my-4 section-title">
        Experience and Achievements
      </h1>

      <div className="experience-list">
        {jobs.map((job) => (
          <ExpCard
            key={`${job.title}-${job.subtitle}`}
            title={job.title}
            subtitle={job.subtitle}
            icon={
              job.logo ? (
                <img
                  className="experience-logo"
                  src={job.logo.src}
                  alt={job.logo.alt}
                  height={LOGO_HEIGHT}
                />
              ) : undefined
            }
            items={job.items}
          />
        ))}

        <ExpCard>
          <p className="experience-achievement">
            Participated in the{" "}
            <ExternalLink href="https://devpost.com/software/sketchy-studios">
              2021 Hack the North hackathon
            </ExternalLink>{" "}
            and{" "}
            <ExternalLink href="https://devpost.com/software/smart-day">
              2021 Hack the 6ix hackathon
            </ExternalLink>
            .
          </p>
        </ExpCard>
        <ExpCard>
          <p className="experience-achievement">
            2020/2021 CCC Junior and Senior Certificate of Distinction. Competed
            using Java and C++.
          </p>
        </ExpCard>
      </div>
    </Container>
  );
};

export default Experience;
