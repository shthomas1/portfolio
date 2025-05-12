import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../styles/home.css";
import CardGrid from './CardGrid';
import ProjectDetail from './ProjectDetail';

const Layout = ({ children, cards = [] }) => {
  const location = useLocation();
  const [technologies, setTechnologies] = useState([]);

  // Function to extract unique technologies from card data
  const extractTechnologies = (cards) => {
    // Extract all technologies from all projects
    const techStrings = cards.map(card => card.technologies);
    
    // Split strings into individual techs and flatten
    const techArray = techStrings.flatMap(tech => 
      tech ? tech.split(',').map(item => item.trim()) : []
    );
    
    // Create unique list
    const uniqueTechs = [...new Set(techArray)];
    
    // Map to category
    return uniqueTechs.map((tech, index) => {
      let category = "frontend";
      
      // Define categories based on tech name
      if (tech.includes("C#") || tech.includes("Rust")) {
        category = "backend";
      } else if (tech.includes("MySQL")) {
        category = "database";
      } else if (tech.includes("Machine Learning")) {
        category = "data";
      } else if (tech.includes("AES-256") || tech.includes("encryption")) {
        category = "security";
      }
      
      return {
        id: index + 1,
        name: tech,
        category: category
      };
    });
  };

  useEffect(() => {
    fetch("cardinfo.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const techList = extractTechnologies(data);
        setTechnologies(techList);
      })
      .catch((error) => {
        console.error("Error loading from /cardinfo.json:", error);
        
        // Try to use the cards prop if available
        if (cards && cards.length > 0) {
          const techList = extractTechnologies(cards);
          setTechnologies(techList);
        } else {
          // Fallback to hardcoded data
          const fallbackTechnologies = [
            { id: 1, name: "React", category: "frontend" },
            { id: 2, name: "C#", category: "backend" },
            { id: 3, name: "JavaScript", category: "frontend" },
            { id: 4, name: "HTML/CSS", category: "frontend" },
            { id: 5, name: "MySQL", category: "database" },
            { id: 6, name: "Machine Learning", category: "data" },
            { id: 7, name: "Rust", category: "backend" },
            { id: 8, name: "JSX", category: "frontend" },
            { id: 9, name: "AES-256", category: "security" }
          ];
          
          setTechnologies(fallbackTechnologies);
        }
      });
  }, [cards]);

  // Function to check if a link is active - projects stays active when viewing project details
  const isActive = (path) => {
    if (path === '/projects') {
      // Keep projects highlighted when viewing individual projects
      return location.pathname === '/projects' || location.pathname.startsWith('/project/');
    }
    return location.pathname === path;
  };

  // Determine if we're on a project detail page
  const isProjectDetail = location.pathname.startsWith('/project/');

  // Technologies component for the belly area
  const TechnologiesSection = () => (
    <div className="belly-technologies">
      <h2 className="tech-heading">Languages and Technologies</h2>
      <div className="tech-tags">
        {technologies.map(tech => (
          <span 
            key={tech.id} 
            className={`tech-tag tech-tag-${tech.category}`}
          >
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="home-container">
      <div className="tree-layout">
        {/* Main name card with ears and hat */}
        <div className="main-card-container">
          {/* Social links as hat */}
          <div className="social-hat">
            <Link 
              to="/bio" 
              className={`social-link left-hat ${isActive('/bio') ? 'active-link' : ''}`}
            >
              Read Bio
            </Link>
            <Link 
              to="/projects" 
              className={`social-link right-hat ${isActive('/projects') ? 'active-link' : ''}`}
            >
              View Projects
            </Link>
          </div>
          
          {/* Name card with attached ear buttons */}
          <div className="name-card-with-ears">
            <div className="ear left-ear">
              <a 
                href="https://medium.com/@seanthomas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ear-link"
              >
                <span className="vertical-text">Medium</span>
              </a>
            </div>
            
            <div className="name-container">
              <h1 className="name">Sean Thomas</h1>
              <h2 className="title">Full Stack Developer</h2>
            </div>
            
            <div className="ear right-ear">
              <a 
                href="https://linkedin.com/in/seanthomas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ear-link"
              >
                <span className="vertical-text">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Content area - always shown now */}
        <div className="content-area">
          {/* Conditionally render content based on route */}
          {location.pathname === '/' && <TechnologiesSection />}
          {location.pathname === '/bio' && children}
          {location.pathname === '/projects' && <CardGrid cards={cards} />}
          {isProjectDetail && <ProjectDetail cards={cards} />}
        </div>
      </div>
    </div>
  );
};

export default Layout;