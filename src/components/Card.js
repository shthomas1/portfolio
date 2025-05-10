import React from "react";
import "../styles/styles.css";
import { Link } from "react-router-dom";

export default function Card({ card }) {
  if (!card) {
    return <div className="error-card">Card data is missing</div>;
  }

  const cardContent = (
    <>
      {/* Project type badge */}
      {card.type && (
        <div className={`project-type ${card.type}`}>{card.type}</div>
      )}

      <div className="card-info">
        <h3 className="card-title">{card.title}</h3>

        {card.description && (
          <p className="card-description">{card.description}</p>
        )}

        {card.role && (
          <div className="card-detail">
            <span className="detail-label">My Role:</span> {card.role}
          </div>
        )}

        {card.technologies && (
          <div className="card-tech-stack">
            {card.technologies.split(", ").map((tech, index) => (
              <span key={index} className="tech-pill">
                {tech.trim()}
              </span>
            ))}
          </div>
        )}

        {card.year && (
          <div className="card-detail">
            <span className="detail-label">Year:</span> {card.year}
          </div>
        )}

        {card.results && (
          <div className="card-detail">
            <span className="detail-label">Key Results:</span> {card.results}
          </div>
        )}
      </div>
    </>
  );

  // Return either a linked card or regular card based on whether link exists
  return card.link ? (
    <Link to={card.link} className="card-link">
      <div className="project-card">{cardContent}</div>
    </Link>
  ) : (
    <div className="project-card">{cardContent}</div>
  );
}
