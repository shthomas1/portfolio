import React, { useState } from "react";
import "../styles.css";
import Card from "./Card";

export default function CardGrid({ cards = [] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Find cards that match the search term
  const displayCards = cards
    ? cards.filter(
        (card) =>
          card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (card.technologies &&
            card.technologies.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search Project Names or Technologies..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="projects-grid">
        {displayCards.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </div>
    </div>
  );
}
