import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';
import '../styles/timeline.css';

interface Card {
  id: number;
  title: string;
  year?: string;
  description?: string;
}

const Timeline: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    fetch('/cardinfo.json')
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(() => setCards([]));
  }, []);

  const sorted = [...cards].sort((a, b) => {
    const yearA = parseInt(a.year || '0', 10);
    const yearB = parseInt(b.year || '0', 10);
    return yearB - yearA;
  });

  return (
    <div className="timeline-container">
      <BackButton />
      <h1 className="timeline-title">Project Timeline</h1>
      <div className="timeline">
        {sorted.map(card => (
          <div key={card.id} className="timeline-item">
            <div className="timeline-point" />
            <Link to={`/project/${card.id}`} className="timeline-content">
              <span className="timeline-year">{card.year}</span>
              <h3 className="timeline-header">{card.title}</h3>
              {card.description && <p>{card.description}</p>}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
