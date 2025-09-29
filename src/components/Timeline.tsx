import React, { KeyboardEvent, MouseEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from './BackButton';
import '../styles/timeline.css';
import InfoModal from './InfoModal';

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
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const knownInternalLinks = useMemo(() => new Set(['/whobrew']), []);

  const sorted = useMemo(() => {
    return [...cards].sort((a, b) => {
      const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
      const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
  }, [cards]);

  const containerClass = `timeline-container timeline-container--${variant}`;

  const isPortfolioCard = (card: TimelineCard) =>
    card.title.toLowerCase() === 'personal portfolio platform' || card.id === 5;

  const getDestination = (card: TimelineCard) => {
    if (isPortfolioCard(card)) {
      return null;
    }

    if (card.link && card.link.startsWith('http')) {
      return { type: 'external' as const, href: card.link };
    }

    if (card.link && knownInternalLinks.has(card.link)) {
      return { type: 'internal' as const, to: card.link };
    }

    return { type: 'internal' as const, to: `/project/${card.id}` };
  };

  const handleClick = (
    event: MouseEvent<HTMLAnchorElement | HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    card: TimelineCard
  ) => {
    if (isPortfolioCard(card)) {
      event.preventDefault();
      setShowPortfolioModal(true);
    }
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
                {destination?.type === 'external' && destination.href ? (
                  <a
                    href={destination.href}
                    className="timeline-content"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={event => handleClick(event, card)}
                  >
                    {content}
                  </a>
                ) : destination?.type === 'internal' && destination.to ? (
                  <Link
                    to={destination.to}
                    className="timeline-content"
                    onClick={event => handleClick(event, card)}
                  >
                    {content}
                  </Link>
                ) : (
                  <div
                    className="timeline-content"
                    role="button"
                    tabIndex={0}
                    onClick={event => handleClick(event, card)}
                    onKeyDown={event => {
                      if (["Enter", " ", "Spacebar", "Space"].includes(event.key)) {
                        handleClick(event, card);
                      }
                    }}
                  >
                    {content}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      {showPortfolioModal && (
        <InfoModal title="You're exploring it now" onClose={() => setShowPortfolioModal(false)}>
          <p>
            This personal portfolio is the project in action. The design system, routing,
            interactions, and overall polish showcase exactly what I deliver for clients.
          </p>
          <p>
            Keep navigating, inspect the code, and imagine how this craftsmanship could
            elevate your next product.
          </p>
        </InfoModal>
      )}
    </div>
  );
};

export default Timeline;
