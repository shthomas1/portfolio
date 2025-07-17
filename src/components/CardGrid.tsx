import React, { useState } from "react";
import "../styles/styles.css";
import Card, { CardData } from "./Card";
import BackButton from "./BackButton";

interface CardGridProps {
  cards?: CardData[];
}

const CardGrid: React.FC<CardGridProps> = ({ cards = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const displayCards = cards
    ? cards.filter(
        (card) =>
          card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (card.technologies &&
            card.technologies.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  return (
    <div className="belly-content">
      <BackButton destination="/" />
      <h1 className="projects-title">My Projects</h1>

      <div>
        <input
          type="text"
          className="search-input"
          placeholder="Search Project Names or Technologies..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="projects-grid">
          {displayCards.length > 0 ? (
            displayCards.map((card) => <Card card={card} key={card.id} />)
          ) : (
            <div className="no-results">
              <p>No projects match your search criteria.</p>
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardGrid;