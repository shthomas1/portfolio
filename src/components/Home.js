import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

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
          opacity: Math.random() * 0.8 + 0.2,
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
          {stars.map((star) => (
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
                opacity: star.opacity,
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span className="icon-label">Projects</span>
            </Link>
            <Link to="/bio" className="floating-icon bio-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="icon-label">About</span>
            </Link>
            <Link to="/portfolio" className="floating-icon contact-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span className="icon-label">Give feedback for this app!</span>
            </Link>

            {/* Hourglass Twins container */}
            <div className="hourglass-twins-container">
              {/* Sand column that connects the twins */}
              <div className="sand-column-container">
                <div className="sand-column"></div>
              </div>

              {/* Sand particles flowing from Ash to Ember */}
              <div className="sand-flow-container">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="sand-particle"
                    style={{
                      top: `${40 + Math.random() * 20}%`,
                      animationDelay: `${i * 0.25}s`,
                      animationDuration: `${2.5 + Math.random() * 1}s`,
                    }}
                  />
                ))}
              </div>

              {/* Ash Twin - Medium */}
              <a
                href="https://medium.com/@sean.h.thomas2"
                target="_blank"
                rel="noopener noreferrer"
                className="floating-icon medium-icon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
                <span className="icon-label">My Medium Page</span>
              </a>

              {/* Ember Twin - LinkedIn */}
              <a
                href="https://www.linkedin.com/in/seanhthomas/"
                target="_blank"
                rel="noopener noreferrer"
                className="floating-icon linkedin-icon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="icon-label">My LinkedIn Page</span>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-year">System Updated 10 May 2025</div>
      </div>
    </div>
  );
};

export default Home;
