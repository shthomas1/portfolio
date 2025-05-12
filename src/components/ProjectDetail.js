import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/projects.css";
import { getTechCategory } from "../utils/techCategories"; // Import the utility

const ProjectDetail = ({ cards = [] }) => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProject = async () => {
      try {
        console.log("ProjectDetail: Loading project with ID:", id);
        
        // First try to find the project in the cards prop
        const projectId = parseInt(id);
        const foundProject = cards.find(card => card.id === projectId);
        
        if (foundProject) {
          console.log("ProjectDetail: Found project in cards:", foundProject);
          setProject(foundProject);
          setLoading(false);
          return;
        }
        
        // If cards is empty or project not found, fetch from projects.json
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

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate('/projects');
  };

  // Render loading state
  if (loading) {
    return <div className="loading-message">Loading project details...</div>;
  }

  // Render error state
  if (error || !project) {
    return (
      <div className="error-container">
        <div className="error-message">{error || "Project not found"}</div>
        <button onClick={handleBackClick} className="back-button">
          ← Back to Projects
        </button>
      </div>
    );
  }

  // Helper function to render a section if data exists
  const renderSection = (title, content) => {
    if (!content) return null;
    
    return (
      <section className="project-section">
        <h2 className="section-heading">{title}</h2>
        {content}
      </section>
    );
  };

  // Helper function to render technologies
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
            className={`tech-item tech-tag-${getTechCategory(tech)}`} // Add tech-tag-{category} class
          >
            {tech}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="project-detail-container">
      {/* Back button */}
      <button onClick={handleBackClick} className="back-button">
        ← Back to Projects
      </button>

      {/* Title */}
      <section className="project-hero">
        <h1 className="project-title">{project.title}</h1>
        {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
      </section>

      {/* Overview Section */}
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

      {/* Technologies Section */}
      {renderSection("Technologies", renderTechnologies())}

      {/* Highlights Section */}
      {project.highlights && project.highlights.length > 0 && renderSection(
        "Key Achievements",
        <ul className="highlights-list">
          {project.highlights.map((highlight, index) => (
            <li key={index} className="highlight-item">{highlight}</li>
          ))}
        </ul>
      )}

      {/* Challenge Section */}
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

      {/* Features Section */}
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

      {/* Approach Section */}
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

      {/* My Role Section */}
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

      {/* Outcomes Section */}
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

      {/* Results Section from simple projects */}
      {project.results && !project.outcomes && renderSection(
        "Results",
        <div className="outcomes-list">
          <div className="outcome-item">
            <span className="outcome-icon">✓</span>
            <p>{project.results}</p>
          </div>
        </div>
      )}

      {/* Team Section */}
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