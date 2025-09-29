import React, { useMemo } from 'react';
import Bio from './Bio';
import Timeline from './Timeline';
import Card, { CardData } from './Card';
import { BioData } from '../types/Bio';
import { TechnologyTag } from '../types/Technology';
import '../styles/home.css';

interface HomeProps {
  cards: CardData[];
  bioData: BioData | null;
  technologies: TechnologyTag[];
  loading?: boolean;
}

const Home: React.FC<HomeProps> = ({ cards, bioData, technologies, loading }) => {
  const projectHighlights = useMemo(() => cards.slice(0, 6), [cards]);
  const linkedinProfile = bioData?.contact?.find(
    (contact) => contact.type.toLowerCase() === 'linkedin'
  )?.url;

  const yearsOfExperience = useMemo(() => {
    const years = cards
      .map((card) => card.year)
      .filter((year): year is string => Boolean(year))
      .map((year) => parseInt(year.slice(0, 4), 10))
      .filter((year) => !Number.isNaN(year));

    if (!years.length) {
      return null;
    }

    const earliest = Math.min(...years);
    const current = new Date().getFullYear();
    return current - earliest + 1;
  }, [cards]);

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-text">
          <p className="hero-eyebrow">Hello, I'm {bioData?.name || 'Sean Thomas'}</p>
          <h1 className="hero-heading">
            Building human-centered products with disciplined execution.
          </h1>
          <p className="hero-description">
            {bioData?.title || 'Full Stack Developer'} blending software engineering,
            operational leadership, and data fluency to deliver resilient digital
            experiences.
          </p>
          <div className="hero-actions">
            <a className="hero-button" href="#projects">
              Explore projects
            </a>
            {linkedinProfile && (
              <a
                className="hero-button hero-button--secondary"
                href={linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
              </a>
            )}
          </div>
        </div>

        <div className="hero-highlights">
          <div className="highlight-card">
            <span className="highlight-label">Projects shipped</span>
            <span className="highlight-value">{cards.length || '—'}</span>
            <p className="highlight-description">
              Web apps, machine learning workflows, and secure communication tools.
            </p>
          </div>
          <div className="highlight-card">
            <span className="highlight-label">Disciplines connected</span>
            <span className="highlight-value">
              {technologies.length > 0 ? new Set(technologies.map((tech) => tech.category)).size : '—'}
            </span>
            <p className="highlight-description">
              From frontend polish to backend automation and data intelligence.
            </p>
          </div>
          <div className="highlight-card">
            <span className="highlight-label">Years in motion</span>
            <span className="highlight-value">{yearsOfExperience || '—'}</span>
            <p className="highlight-description">
              Continuous learning across classrooms, client engagements, and the field.
            </p>
          </div>
        </div>
      </section>

      <section className="home-dual-section">
        <div className="home-bio-panel">
          <h2 className="home-section-heading">Bio Snapshot</h2>
          <Bio bioData={bioData} showBackButton={false} variant="section" />
        </div>
        <div className="home-timeline-panel">
          <h2 className="home-section-heading">Timeline</h2>
          <Timeline cards={cards} showBackButton={false} variant="section" />
        </div>
      </section>

      <section className="home-technologies">
        <div className="home-technologies-header">
          <h2 className="home-section-heading">Toolbox</h2>
          <p className="home-technologies-subtitle">
            A curated mix of languages, platforms, and services that power my recent work.
          </p>
        </div>
        <div className="home-technologies-grid">
          {technologies.length > 0 ? (
            technologies.map((tech) => (
              <span
                key={tech.id}
                className={`tech-chip tech-tag-${tech.category}`}
              >
                {tech.name}
              </span>
            ))
          ) : (
            <p className="home-empty-state">Technologies will be listed soon.</p>
          )}
        </div>
      </section>

      <section className="home-projects" id="projects">
        <div className="home-projects-header">
          <h2 className="home-section-heading">Project Highlights</h2>
          <p>
            Dive into the initiatives where I bring design sense, business context, and
            engineering discipline together.
          </p>
        </div>
        {loading && projectHighlights.length === 0 ? (
          <div className="home-empty-state">Loading project highlights...</div>
        ) : (
          <div className="home-project-grid">
            {projectHighlights.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>
        )}
        {cards.length > projectHighlights.length && (
          <p className="home-projects-note">
            Looking for more? Every project tile links to a detailed case study.
          </p>
        )}
      </section>
    </div>
  );
};

export default Home;
