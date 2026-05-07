import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CardData } from "./Card";
import { getTechCategory } from "../utils/techCategories";

interface ProjectCarouselProps {
  cards: CardData[];
  intervalMs?: number;
  viewAllHref?: string;
}

const getDestination = (card: CardData) => {
  if (card.link && (card.link.startsWith("http://") || card.link.startsWith("https://"))) {
    return { type: "external" as const, href: card.link };
  }
  if (card.link && card.link.startsWith("/")) {
    return { type: "internal" as const, to: card.link };
  }
  return { type: "internal" as const, to: `/project/${card.id}` };
};

const getPrimaryTag = (card: CardData): string | null => {
  if (!card.technologies) return null;
  const first = card.technologies.split(",")[0]?.trim();
  return first || null;
};

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  cards,
  intervalMs = 5000,
  viewAllHref = "#projects",
}) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const count = cards.length;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      const wrapped = ((next % count) + count) % count;
      setIndex(wrapped);
    },
    [count]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [paused, count, intervalMs]);

  // Reset to a valid index if cards change.
  useEffect(() => {
    if (index >= count && count > 0) setIndex(0);
  }, [count, index]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
  };

  const current = useMemo(() => cards[index] || null, [cards, index]);

  if (count === 0 || !current) {
    return (
      <section className="project-carousel" aria-label="Featured project">
        <div className="project-carousel-header">
          <span className="project-carousel-eyebrow">Featured</span>
        </div>
        <p className="project-carousel-empty">Featured projects will appear here soon.</p>
      </section>
    );
  }

  const destination = getDestination(current);
  const primaryTag = getPrimaryTag(current);

  const detailContent = (
    <>
      <div className="project-carousel-card-top">
        {current.year && <span className="project-carousel-year">{current.year}</span>}
        {current.type && (
          <span className={`project-carousel-type project-type ${current.type}`}>
            {current.type}
          </span>
        )}
      </div>
      <h3 className="project-carousel-title">{current.title}</h3>
      {current.description && (
        <p className="project-carousel-description">{current.description}</p>
      )}
      {primaryTag && (
        <span className={`project-carousel-tag tech-pill tech-tag-${getTechCategory(primaryTag)}`}>
          {primaryTag}
        </span>
      )}
    </>
  );

  return (
    <section
      className="project-carousel"
      aria-label="Featured project"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="project-carousel-header">
        <span className="project-carousel-eyebrow">Featured project</span>
        <div className="project-carousel-controls" aria-label="Carousel controls">
          <button
            type="button"
            className="project-carousel-button"
            onClick={prev}
            aria-label="Previous project"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="project-carousel-button"
            onClick={next}
            aria-label="Next project"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="project-carousel-stage"
        role="group"
        aria-roledescription="carousel"
        aria-label={`Project ${index + 1} of ${count}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {destination.type === "external" ? (
          <a
            href={destination.href}
            className="project-carousel-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            {detailContent}
          </a>
        ) : (
          <Link to={destination.to} className="project-carousel-card">
            {detailContent}
          </Link>
        )}
      </div>

      <div className="project-carousel-footer">
        <div className="project-carousel-dots" role="tablist" aria-label="Select project">
          {cards.map((card, i) => (
            <button
              key={card.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show project ${i + 1}: ${card.title}`}
              className={`project-carousel-dot ${i === index ? "is-active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        {viewAllHref.startsWith("#") || viewAllHref.startsWith("http") ? (
          <a className="project-carousel-view-all" href={viewAllHref}>
            View all projects →
          </a>
        ) : (
          <Link className="project-carousel-view-all" to={viewAllHref}>
            View all projects →
          </Link>
        )}
      </div>
    </section>
  );
};

export default ProjectCarousel;
