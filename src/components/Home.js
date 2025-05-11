import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    // Generate stars
    const generateStars = () => {
      const starArray = [];
      const starCount = 150;
      
      for (let i = 0; i < starCount; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          animationDuration: Math.random() * 3 + 2,
          animationDelay: Math.random() * 2,
          opacity: Math.random() * 0.8 + 0.2
        });
      }
      
      setStars(starArray);
    };
    
    generateStars();
  }, []);
  
  return (
    <div>
    <div className="home-container">
      {/* Starfield background */}
      <div className="starfield">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.animationDuration}s`,
              animationDelay: `${star.animationDelay}s`,
              opacity: star.opacity
            }}
          />
        ))}
      </div>
      
      <div className="content-wrapper">
        <h1 className="hero-title">Sean Thomas</h1>
        <div className="hero-subtitle">Full Stack Developer</div>
        
        {/* Floating navigation icons */}
        <div className="floating-icons">
          <Link to="/projects" className="floating-icon projects-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <span className="icon-label">Projects</span>
          </Link>
          
          <Link to="/bio" className="floating-icon bio-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="icon-label">About</span>
          </Link>
          
          <Link to="/portfolio" className="floating-icon contact-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span className="icon-label">Give feedback for this app!</span>
          </Link>
          
          <a 
            href="https://medium.com/@sean.h.thomas2" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="floating-icon medium-icon"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"></path>
              <path d="M8 9h1v6H8V9z"></path>
              <path d="M12 9h1v6h-1V9z"></path>
              <path d="M16 9h1v6h-1V9z"></path>
              <path d="M8 6h8"></path>
              <path d="M8 18h8"></path>
            </svg>
            <span className="icon-label">Technical Blog</span>
          </a>
        </div>
      </div>
      
      <div className="hero-year">System Updated 10 May 2025</div>
    </div>
    </div>
  );
};

export default Home;