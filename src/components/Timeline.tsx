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
  link?: string;
  type?: string;
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

  const getDestination = (card: TimelineCard) => {
    if (card.link && (card.link.startsWith('http://') || card.link.startsWith('https://'))) {
      return { type: 'external' as const, href: card.link };
    }

    if (card.link && card.link.startsWith('/')) {
      return { type: 'internal' as const, to: card.link };
    }

    return { type: 'internal' as const, to: `/project/${card.id}` };
  };

  return (
    <div className={containerClass}>
      {showBackButton && <BackButton />}
      <h1 className="timeline-title">Project Timeline</h1>
      <div className="timeline">
        {sorted.length === 0 ? (
          <div className="timeline-empty">Project milestones will appear here soon.</div>
        ) : (
          sorted.map(card => {
            const destination = getDestination(card);

            const content = (
              <>
                <span className="timeline-year">{card.year}</span>
                <h3 className="timeline-header">{card.title}</h3>
                {card.description && <p>{card.description}</p>}
              </>
            );

            return (
              <div key={card.id} className="timeline-item">
                <div className="timeline-point" />
                {destination.type === 'external' ? (
                  <a
                    href={destination.href}
                    className="timeline-content"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  <Link to={destination.to} className="timeline-content">
                    {content}
                  </Link>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Timeline;
