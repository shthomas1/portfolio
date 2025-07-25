import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/projects.css";
import { getTechCategory } from "../utils/techCategories";
import BackButton from "./BackButton";
import { CardData } from "./Card";

interface Project extends CardData {
  subtitle?: string;
  client?: string;
  duration?: string;
  highlights?: string[];
  challenges?: string[];
  features?: { title: string; description: string }[];
  approach?: { step: string; title: string; description: string }[];
  roleDetails?: {
    scrumMaster?: string[];
    dataEngineer?: string[];
  };
  outcomes?: string[];
  team?: { name: string; role: string; linkedIn: string }[];
}

interface ProjectDetailProps {
  cards?: Project[];
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ cards = [] }) => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        console.log("ProjectDetail: Loading project with ID:", id);
        
        const projectId = parseInt(id as string);
        const foundProject = cards.find(card => card.id === projectId);
        
        if (foundProject) {
          console.log("ProjectDetail: Found project in cards:", foundProject);
          setProject(foundProject);
          setLoading(false);
          return;
        }
        
        console.log("ProjectDetail: Project not found in cards, fetching from JSON...");
        
        const response = await fetch("/projects.json");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("ProjectDetail: Loaded JSON data:", data);
        
        const projectFromJson = data.find(p => p.id === projectId);
        
        if (projectFromJson) {
          console.log("ProjectDetail: Found project in JSON:", projectFromJson);
          setProject(projectFromJson);
        } else {
          console.error(`Project with ID ${projectId} not found in any source`);
          setError(`Project with ID ${projectId} not found`);
        }
      } catch (error) {
        console.error("Error loading project details:", error);
        setError(`Error loading project: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id, cards]);

  if (loading) {
    return <div className="loading-message">Loading project details...</div>;
  }

  if (error || !project) {
    return (
      <div className="error-container">
        <div className="error-message">{error || "Project not found"}</div>
        <BackButton />
      </div>
    );
  }

  const renderSection = (title, content) => {
    if (!content) return null;
    
    return (
      <section className="project-section">
        <h2 className="section-heading">{title}</h2>
        {content}
      </section>
    );
  };

  const renderTechnologies = () => {
    if (!project.technologies) return null;
    
    const techArray = typeof project.technologies === 'string' 
      ? project.technologies.split(",").map(tech => tech.trim())
      : project.technologies;
    
    return (
      <div className="tech-list">
        {techArray.map((tech, index) => (
          <span 
            key={index} 
            className={`tech-item tech-tag-${getTechCategory(tech)}`}
          >
            {tech}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="project-detail-container">
      <BackButton />

      <section className="project-hero">
        <h1 className="project-title">{project.title}</h1>
        {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
      </section>

      <section className="project-section">
        <h2 className="section-heading">Overview</h2>
        <div className="overview-content">
          <p className="project-text">
            {project.overview || project.description}
          </p>
          
          <div className="project-meta">
            {project.role && (
              <div className="meta-item">
                <span className="meta-label">ROLE:</span>
                <span className="meta-value">{project.role}</span>
              </div>
            )}
            {project.year && (
              <div className="meta-item">
                <span className="meta-label">YEAR:</span>
                <span className="meta-value">{project.year}</span>
              </div>
            )}
            {project.client && (
              <div className="meta-item">
                <span className="meta-label">CLIENT:</span>
                <span className="meta-value">{project.client}</span>
              </div>
            )}
            {project.duration && (
              <div className="meta-item">
                <span className="meta-label">DURATION:</span>
                <span className="meta-value">{project.duration}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {renderSection("Technologies", renderTechnologies())}

      {project.highlights && project.highlights.length > 0 && renderSection(
        "Key Achievements",
        <ul className="highlights-list">
          {project.highlights.map((highlight, index) => (
            <li key={index} className="highlight-item">{highlight}</li>
          ))}
        </ul>
      )}

      {project.challenges && project.challenges.length > 0 && renderSection(
        "Challenges",
        <div className="challenges-grid">
          {project.challenges.map((challenge, index) => (
            <div key={index} className="challenge-card">
              <span className="challenge-number">{index + 1}</span>
              <p>{challenge}</p>
            </div>
          ))}
        </div>
      )}

      {project.features && project.features.length > 0 && renderSection(
        "Services",
        <div className="features-grid">
          {project.features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      )}

      {project.approach && project.approach.length > 0 && renderSection(
        "My Approach - Based on military Standards, F3EAD",
        <div className="challenges-grid">
          {project.approach.map((step, index) => (
            <div key={index} className="challenge-card">
              <div className="challenge-number">{step.step}</div>
              <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      )}

      {project.roleDetails && renderSection(
        "My Contribution",
        <div className="role-content">
          {project.roleDetails.scrumMaster && (
            <div className="role-block">
              <h3>As Scrum Master</h3>
              <ul>
                {project.roleDetails.scrumMaster.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {project.roleDetails.dataEngineer && (
            <div className="role-block">
              <h3>As Data Engineer</h3>
              <ul>
                {project.roleDetails.dataEngineer.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {project.outcomes && project.outcomes.length > 0 && renderSection(
        "Results",
        <div className="outcomes-list">
          {project.outcomes.map((outcome, index) => (
            <div key={index} className="outcome-item">
              <span className="outcome-icon">✓</span>
              <p>{outcome}</p>
            </div>
          ))}
        </div>
      )}

      {project.results && !project.outcomes && renderSection(
        "Results",
        <div className="outcomes-list">
          <div className="outcome-item">
            <span className="outcome-icon">✓</span>
            <p>{project.results}</p>
          </div>
        </div>
      )}

      {project.team && project.team.length > 0 && renderSection(
        "Team Members",
        <div className="team-grid">
          {project.team.map((member, index) => (
            <a
              key={index}
              href={member.linkedIn}
              target="_blank" 
              rel="noopener noreferrer"
              className="team-member"
            >
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;