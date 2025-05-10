import React from "react";
import "../styles/projects.css";

const CrediTrust = () => {
  const projectDetails = {
    title: "CrediTrust AI",
    subtitle: "Credit acceptance prediction platform for PNC Bank",
    description: "Credit acceptance prediction platform developed for PNC Bank's AIS SCLC 2025 challenge.",
    year: "2025",
    client: "PNC Bank (AIS SCLC 2025 Challenge)",
    role: "Solo Developer",
    duration: "November 2024 - January 2025",
    technologies: ["C#", "JavaScript", "HTML", "CSS"],
    overview: "An AI-powered credit decision platform that predicts loan acceptance rates with over 70% accuracy, developed as part of the AIS 2025 Fintech challenge.",
    highlights: [
      "Achieved over 70% prediction accuracy on random test sets",
      "Contender for the AIS 2025 Fintech challenge",
      "Integrated machine learning with financial data analysis",
      "Created intuitive web interface for credit assessment"
    ],
    challenges: [
      "Processing complex financial data patterns",
      "Meeting PNC Bank's regulatory compliance requirements",
      "Balancing model accuracy with transparency"
    ],
    outcomes: [
      "Built comprehensive credit risk assessment tool",
      "Recognition as AIS 2025 Fintech challenge contender",
      "Platform ready for real-world deployment scenarios"
    ]
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
            <span key={index} className="tech-item">{tech}</span>
          ))}
        </div>
      </section>

      {/* Highlights Section */}
      <section className="project-section">
        <h2 className="section-heading">Key Achievements</h2>
        <ul className="highlights-list">
          {projectDetails.highlights.map((highlight, index) => (
            <li key={index} className="highlight-item">{highlight}</li>
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
    </div>
  );
};

export default CrediTrust;