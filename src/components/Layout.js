import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../styles/home.css";
import CardGrid from './CardGrid';
import ProjectDetail from './ProjectDetail';
import { getTechCategory } from "../utils/techCategories";
import '../styles/backButton.css';

const Layout = ({ children, cards = [] }) => {
  const location = useLocation();
  const [technologies, setTechnologies] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [cardsData, setCardsData] = useState([]);
  const [, setLoading] = useState(true);

  const extractTechnologies = (cards) => {
    const techStrings = cards.map(card => card.technologies);
    
    const techArray = techStrings.flatMap(tech => 
      tech ? tech.split(',').map(item => item.trim()) : []
    );
    
    const uniqueTechs = [...new Set(techArray)];
    
    const categorizedTechs = uniqueTechs.map((tech, index) => {
      return {
        id: index + 1,
        name: tech,
        category: getTechCategory(tech)
      };
    });

    const categoryOrder = ["frontend", "backend", "database", "data", "security", "service"];
    
    return categorizedTechs.sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.category);
      const indexB = categoryOrder.indexOf(b.category);
      return indexA - indexB;
    });
  };

  useEffect(() => {
    setLoading(true);
    
    fetch("/cardinfo.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Successfully loaded card data:", data);
        setCardsData(data);
        
        const techList = extractTechnologies(data);
        setTechnologies(techList);
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading from /cardinfo.json:", error);
        
        if (cards && cards.length > 0) {
          console.log("Using cards prop as fallback:", cards);
          setCardsData(cards);
          
          const techList = extractTechnologies(cards);
          setTechnologies(techList);
        } else {
          console.log("Using hardcoded fallback data");
          const fallbackData = [
            {
              "id": 1,
              "title": "CrediTrust AI",
              "image": "6.jpg",
              "description": "Credit acceptance prediction platform for PNC Bank's AIS SCLC 2025 challenge.",
              "role": "Solo Developer",
              "technologies": "C#, Javascript, html, css, Random Forest",
              "year": "2025",
              "results": "Contender for the AIS 2025 Fintech challenge. Prediction model was just over 70% accurate when testing against a random test set.",
              "link": "/credit",
              "type": "demo"
            },
            {
              "id": 2,
              "title": "Freelance Music",
              "image": "FM Logo.png",
              "description": "Platform for teachers to post their music lesson schedule online for students to join. This was a school assignment.",
              "role": "Scrum Master/Data Engineer",
              "technologies": "C#, Javascript, html, MySQL",
              "year": "2025",
              "results": "Client was satisfied with app outcome, and we got a perfect grade in the course.",
              "link": "/freelance-music",
              "type": "demo"
            },
            {
              "id": 3,
              "title": "Revenue Prediction App",
              "image": "revpred.png",
              "description": "Command line interface for predicting sales for a Bar in Tuscaloosa",
              "role": "Solo Developer",
              "technologies": "C#, Machine Learning, Gradient Boosting",
              "year": "2024",
              "results": "Predicted sales with a maximum of 2% error on real sales",
              "link": "/RevPred",
              "type": "demo"
            },
            {
              "id": 4,
              "title": "Secure Communications App",
              "image": "5.jpg",
              "description": "This application was a demo for using AES-256 encryption and one-time pads for a Business Programming course.",
              "role": "Solo Developer",
              "technologies": "C#, Rust, AES-256 encryption, Javascript, html",
              "year": "2025",
              "results": "Prototype used successfully in training with Army Special Forces.",
              "link": "/military-comms",
              "type": "archived"
            }
          ];
          
          setCardsData(fallbackData);
          const techList = extractTechnologies(fallbackData);
          setTechnologies(techList);
        }
        
        setLoading(false);
      });
  }, [cards]);

  useEffect(() => {
    const isProjectDetail = location.pathname.startsWith('/project/');
    
    if (isProjectDetail) {
      fetch("/projects.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Successfully loaded project data:", data);
          setProjectsData(data);
        })
        .catch((error) => {
          console.error("Error loading from /projects.json:", error);
          setProjectsData(cardsData.length > 0 ? cardsData : []);
        });
    }
  }, [location.pathname, cardsData]);

  const isActive = (path) => {
    if (path === '/projects') {
      return location.pathname === '/projects' || location.pathname.startsWith('/project/');
    }
    return location.pathname === path;
  };

  const isProjectDetail = location.pathname.startsWith('/project/');

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
        <div className="main-card-container">
          <div className="social-hat">
            <Link 
              to="/bio" 
              className={`social-link hat ${isActive('/bio') ? 'active-link' : ''}`}
            >
              Read Bio
            </Link>
            <Link 
              to="/projects" 
              className={`social-link hat ${isActive('/projects') ? 'active-link' : ''}`}
            >
              View Projects
            </Link>
          </div>
          
          <div className="name-card-with-ears">
            <div className="ear left-ear">
              <a 
                href="https://medium.com/@sean.h.thomas2" 
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
                href="https://linkedin.com/in/seanhthomas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ear-link"
              >
                <span className="vertical-text">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        <div className="content-area">
          {location.pathname === '/' && <TechnologiesSection />}
          {location.pathname === '/bio' && children}
          {location.pathname === '/projects' && <CardGrid cards={cardsData} />}
          {isProjectDetail && <ProjectDetail cards={projectsData.length > 0 ? projectsData : cardsData} />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
