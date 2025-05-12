import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/projects.css";

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
        console.log("ProjectDetail: Available cards:", cards);
        
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
        console.log("ProjectDetail: Fetch response:", response);
        
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

  if (loading) {
    return (
      <div className="loading-message">Loading project details...</div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="error-message">{error}</div>
        <button onClick={handleBackClick} className="back-button">
          ← Back to Projects
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div>
        <div className="error-message">Project not found</div>
        <button onClick={handleBackClick} className="back-button">
          ← Back to Projects
        </button>
      </div>
    );
  }

  // Debug output of what we're rendering
  console.log("ProjectDetail: Rendering project:", project);
  console.log("ProjectDetail: Project has highlights:", project.highlights ? project.highlights.length : 'none');
  console.log("ProjectDetail: Project has challenges:", project.challenges ? project.challenges.length : 'none');
  console.log("ProjectDetail: Project has features:", project.features ? project.features.length : 'none');

  return (
    <div>
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
      {project.technologies && (
        <section className="project-section">
          <h2 className="section-heading">Technologies</h2>
          <div className="tech-list">
            {typeof project.technologies === 'string' ? 
              project.technologies.split(", ").map((tech, index) => (
                <span key={index} className="tech-item">{tech.trim()}</span>
              )) :
              project.technologies.map((tech, index) => (
                <span key={index} className="tech-item">{tech}</span>
              ))
            }
          </div>
        </section>
      )}

      {/* Highlights Section */}
      {project.highlights && project.highlights.length > 0 && (
        <section className="project-section">
          <h2 className="section-heading">Key Achievements</h2>
          <ul className="highlights-list">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="highlight-item">{highlight}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Challenge Section */}
      {project.challenges && project.challenges.length > 0 && (
        <section className="project-section">
          <h2 className="section-heading">Challenges</h2>
          <div className="challenges-grid">
            {project.challenges.map((challenge, index) => (
              <div key={index} className="challenge-card">
                <span className="challenge-number">{index + 1}</span>
                <p>{challenge}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features Section for S2/Signal Surge */}
      {project.features && project.features.length > 0 && (
        <section className="project-section">
          <h2 className="section-heading">Services</h2>
          <div className="features-grid">
            {project.features.map((feature, index) => (
              <div key={index} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Approach Section for S2/Signal Surge */}
      {project.approach && project.approach.length > 0 && (
        <section className="project-section">
          <h2 className="section-heading">My Approach - Based on military Standards, F3EAD</h2>
          <div className="challenges-grid">
            {project.approach.map((step, index) => (
              <div key={index} className="challenge-card">
                <div className="challenge-number">{step.step}</div>
                <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* My Role Section for Freelance Music */}
      {project.roleDetails && (
        <section className="project-section">
          <h2 className="section-heading">My Contribution</h2>
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
        </section>
      )}

      {/* Outcomes Section */}
      {project.outcomes && project.outcomes.length > 0 && (
        <section className="project-section">
          <h2 className="section-heading">Results</h2>
          <div className="outcomes-list">
            {project.outcomes.map((outcome, index) => (
              <div key={index} className="outcome-item">
                <span className="outcome-icon">✓</span>
                <p>{outcome}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Team Section for Freelance Music */}
      {project.team && project.team.length > 0 && (
        <section className="project-section">
          <h2 className="section-heading">Team Members</h2>
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
        </section>
      )}
    </div>
  );
};

export default ProjectDetail;