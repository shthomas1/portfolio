import React, { KeyboardEvent, MouseEvent, useMemo, useState } from "react";
import "../styles/styles.css";
import { Link } from "react-router-dom";
import { getTechCategory } from "../utils/techCategories";
import InfoModal from "./InfoModal";

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
  link?: string;
}

interface CardProps {
  card: CardData;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);

  const isPortfolioCard = useMemo(
    () =>
      card.title.toLowerCase() === "personal portfolio platform" ||
      card.id === 5 ||
      card.link === "/portfolio",
    [card.id, card.link, card.title]
  );

  const knownInternalLinks = useMemo(() => new Set(["/whobrew"]), []);

  const destination = useMemo(() => {
    if (isPortfolioCard) {
      return null;
    }

    if (card.link && card.link.startsWith("http")) {
      return card.link;
    }

    if (card.link && knownInternalLinks.has(card.link)) {
      return card.link;
    }

    return `/project/${card.id}`;
  }, [card.id, card.link, isPortfolioCard, knownInternalLinks]);

  const handleCardClick = (
    event: MouseEvent<HTMLAnchorElement | HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  ) => {
    if (isPortfolioCard) {
      event.preventDefault();
      setShowPortfolioModal(true);
    }
  };

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

  const cardBody = (
    <div className="project-card">{cardContent}</div>
  );

  const renderLinkWrapper = () => {
    if (isPortfolioCard) {
      return (
        <div
          className="card-link"
          role="button"
          tabIndex={0}
          onClick={handleCardClick}
          onKeyDown={(event) => {
            if (["Enter", " ", "Spacebar", "Space"].includes(event.key)) {
              handleCardClick(event);
            }
          }}
        >
          {cardBody}
        </div>
      );
    }

    if (destination && destination.startsWith("http")) {
      return (
        <a
          href={destination}
          className="card-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCardClick}
        >
          {cardBody}
        </a>
      );
    }

    return (
      <Link to={destination || `/project/${card.id}`} className="card-link" onClick={handleCardClick}>
        {cardBody}
      </Link>
    );
  };

  return (
    <>
      {renderLinkWrapper()}
      {showPortfolioModal && (
        <InfoModal
          title="You're already here"
          onClose={() => setShowPortfolioModal(false)}
        >
          <p>
            This personal portfolio is the project itself. Every interaction, animation,
            and detail you see represents the level of polish I bring to my work.
          </p>
          <p>
            Feel free to explore the sections, inspect the code, and imagine how the
            same attention to craft can support your next idea.
          </p>
        </InfoModal>
      )}
    </>
  );
};

export default Card;