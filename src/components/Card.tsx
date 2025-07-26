import React from "react";
import "../styles/styles.css";
import { Link } from "react-router-dom";
import { getTechCategory } from "../utils/techCategories";

export interface CardData {
  id: number;
  title: string;
  description?: string;
  overview?: string;
  role?: string;
  technologies?: string;
  year?: string;
  startDate?: string;
  results?: string;
  type?: string;
}

interface CardProps {
  card: CardData;
}

const Card: React.FC<CardProps> = ({ card }) => {
  if (!card) {
    return <div className="error-card">Card data is missing</div>;
  }

  const cardContent = (
    <>
      {card.year && (
        <span className="year-pill">{card.year}</span>
      )}
      
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
              <span 
                key={index} 
                className={`tech-pill tech-tag-${getTechCategory(tech)}`}
              >
                {tech.trim()}
              </span>
            ))}
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

  const projectDetailLink = `/project/${card.id}`;
  
  return (
    <Link to={projectDetailLink} className="card-link">
      <div className="project-card">{cardContent}</div>
    </Link>
  );
};

export default Card;