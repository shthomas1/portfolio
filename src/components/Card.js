import React from "react";
import "../styles.css";
import { Link } from "react-router-dom";

export default function Card({ card }) {
  if (!card) {
    return <div className="error-card">Card data is missing</div>;
  }

  // The card content that's the same regardless of whether there's a link
  const cardContent = (
    <>

      <div className="project-info">
        <h3 className="project-title">{card.title}</h3>

        {card.description && (
          <p className="project-description">{card.description}</p>
        )}

        {card.role && (
          <div className="project-detail">
            <span className="detail-label">My Role:</span> {card.role}
          </div>
        )}

        {card.technologies && (
          <div className="project-detail">
            <span className="detail-label">Technologies:</span>{" "}
            {card.technologies}
          </div>
        )}

        {card.year && (
          <div className="project-detail">
            <span className="detail-label">Year:</span> {card.year}
          </div>
        )}

        {card.results && (
          <div className="project-detail">
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
