import React from "react";
import "../styles/projects.css";

const FreelanceMusic = () => {
  const projectDetails = {
    title: "Freelance Music",
    subtitle: "Online music education scheduling platform",
    description:
      "Platform for teachers to post their music lesson schedule so students can join. A collaborative solution connecting music educators with students through an intuitive scheduling system.",
    year: "2025",
    client: "Private Music Academy",
    role: "Scrum Master / Data Engineer",
    duration: "4 months",
    technologies: [
      "C#",
      "JavaScript",
      "HTML/CSS",
      "MySQL",
      "ASP.NET Core",
      "Entity Framework",
    ],
    overview:
      "A full-stack web application that streamlines music education by allowing teachers to manage their schedules and students to book lessons effortlessly.",
    highlights: [
      "First-time database hosting success",
      "Successful implementation of Agile Methodology",
      "Client was very satisfied with overall product and architecture of the project",
      "Assignment was given an A+, and was one of two considered to present to the University's advisory board"
    ],
    challenges: [
      "Creating real-time schedule updates across user types",
      "Designing user-friendly interface for non-technical teachers",
      "Building scalable database for growing user base",
    ],
    outcomes: [
      "Streamlined lesson booking process for students",
      "Teachers given full control of their lessons and payment strategy",
      "Enabled data-driven insights for academy management",
      "Secure data transfer and password management"
    ],
  };

  return (
    <div className="project-container">
      {/* Hero Section */}
      <section className="project-hero">
        <h1 className="project-title">{projectDetails.title}</h1>
        <p className="project-subtitle">{projectDetails.subtitle}</p>
      </section>

      {/* Overview Section */}
      <section className="project-section">
        <h2 className="section-heading">Overview</h2>
        <p className="project-text">{projectDetails.overview}</p>

        <div className="project-meta">
          <div className="meta-item">
            <span className="meta-label">Role:</span>
            <span className="meta-value">{projectDetails.role}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Client:</span>
            <span className="meta-value">{projectDetails.client}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Duration:</span>
            <span className="meta-value">{projectDetails.duration}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Year:</span>
            <span className="meta-value">{projectDetails.year}</span>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="project-section">
        <h2 className="section-heading">Technologies</h2>
        <div className="tech-list">
          {projectDetails.technologies.map((tech, index) => (
            <span key={index} className="tech-item">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Highlights Section */}
      <section className="project-section">
        <h2 className="section-heading">Key Achievements</h2>
        <ul className="highlights-list">
          {projectDetails.highlights.map((highlight, index) => (
            <li key={index} className="highlight-item">
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      {/* Challenge Section */}
      <section className="project-section">
        <h2 className="section-heading">Challenges</h2>
        <div className="challenges-grid">
          {projectDetails.challenges.map((challenge, index) => (
            <div key={index} className="challenge-card">
              <span className="challenge-number">{index + 1}</span>
              <p>{challenge}</p>
            </div>
          ))}
        </div>
      </section>

      {/* My Role Section */}
      <section className="project-section">
        <h2 className="section-heading">My Contribution</h2>
        <div className="role-content">
          <div className="role-block">
            <h3>As Scrum Master</h3>
            <ul>
              <li>Facilitated sprint planning</li>
              <li>Managed product backlog with stakeholders</li>
              <li>Resolved team blockers and improved velocity</li>
              <li>Implemented agile best practices</li>
            </ul>
          </div>
          <div className="role-block">
            <h3>As Data Engineer</h3>
            <ul>
              <li>Designed and implemented MySQL database schema</li>
              <li>Optimized database queries for performance</li>
              <li>Created data migration and backup procedures</li>
              <li>Implemented caching strategies</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="project-section">
        <h2 className="section-heading">Results</h2>
        <div className="outcomes-list">
          {projectDetails.outcomes.map((outcome, index) => (
            <div key={index} className="outcome-item">
              <span className="outcome-icon">✓</span>
              <p>{outcome}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="project-cta">
        <p>Want to connect with the team behind this project?</p>
        <div className="team-grid">
          <a
            href="https://linkedin.com/in/seanhthomas"
            target="_blank"
            rel="noopener noreferrer"
            className="team-member"
          >
            <h3>Sean Thomas</h3>
            <p>Scrum Master/Data Engineer</p>
          </a>

          <a
            href="https://www.linkedin.com/in/jacob-leigeber-/"
            target="_blank"
            rel="noopener noreferrer"
            className="team-member"
          >
            <h3>Jacob Leigeber</h3>
            <p>Team Lead</p>
          </a>

          <a
            href="https://www.linkedin.com/in/waylon-anderson/"
            target="_blank"
            rel="noopener noreferrer"
            className="team-member"
          >
            <h3>Waylon Anderson</h3>
            <p>UI/UX Design Lead</p>
          </a>
        </div>
      </section>
    </div>
  );
};

export default FreelanceMusic;
