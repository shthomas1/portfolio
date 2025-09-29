import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';
import '../styles/timeline.css';

export interface TimelineCard {
  id: number;
  title: string;
  year?: string;
  startDate?: string;
  description?: string;
}

interface TimelineProps {
  cards?: TimelineCard[];
  showBackButton?: boolean;
  variant?: 'page' | 'section';
}

const Timeline: React.FC<TimelineProps> = ({
  cards = [],
  showBackButton = true,
  variant = 'page',
}) => {
  const sorted = useMemo(() => {
    return [...cards].sort((a, b) => {
      const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
      const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
  }, [cards]);

  const containerClass = `timeline-container timeline-container--${variant}`;

  return (
    <div className={containerClass}>
      {showBackButton && <BackButton />}
      <h1 className="timeline-title">Project Timeline</h1>
      <div className="timeline">
        {sorted.length === 0 ? (
          <div className="timeline-empty">Project milestones will appear here soon.</div>
        ) : (
          sorted.map(card => (
            <div key={card.id} className="timeline-item">
              <div className="timeline-point" />
              <Link to={`/project/${card.id}`} className="timeline-content">
                <span className="timeline-year">{card.year}</span>
                <h3 className="timeline-header">{card.title}</h3>
                {card.description && <p>{card.description}</p>}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Timeline;
