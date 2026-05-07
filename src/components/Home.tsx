import React, { useMemo } from 'react';
import Card, { CardData } from './Card';
import NowPanel from './NowPanel';
import ProjectCarousel from './ProjectCarousel';
import { BioData } from '../types/Bio';
import { NowData } from '../types/Now';
import { TechnologyTag } from '../types/Technology';
import '../styles/home.css';

interface HomeProps {
  cards: CardData[];
  bioData: BioData | null;
  nowData: NowData | null;
  technologies: TechnologyTag[];
  loading?: boolean;
}

const condenseAbout = (about?: string[]): string => {
  if (!about || about.length === 0) return '';
  return about.join(' ');
};

const Home: React.FC<HomeProps> = ({ cards, bioData, nowData, technologies, loading }) => {
  const featuredCards = useMemo(() => {
    const live = cards.filter((card) => card.type === 'live');
    const others = cards.filter((card) => card.type !== 'live');
    const ordered = [...live, ...others];
    return ordered.slice(0, 6);
  }, [cards]);

  const allProjectCards = useMemo(() => cards.slice(0, 6), [cards]);
  const bioBlurb = condenseAbout(bioData?.about);

  return (
    <div className="home-page home-page--dashboard">
      <section className="home-dashboard" aria-label="Dashboard">
        <div className="home-dashboard-left">
          <NowPanel data={nowData} />
        </div>

        <div className="home-dashboard-right">
          <article className="home-bio-card">
            <span className="home-bio-eyebrow">About</span>
            <h1 className="home-bio-name">{bioData?.name || ''}</h1>
            {bioData?.title && <p className="home-bio-role">{bioData.title}</p>}
            {bioBlurb && <p className="home-bio-blurb">{bioBlurb}</p>}
          </article>

          {loading && cards.length === 0 ? (
            <div className="home-empty-state">Loading featured projects...</div>
          ) : (
            <ProjectCarousel cards={featuredCards} viewAllHref="#projects" />
          )}
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
          <h2 className="home-section-heading">All Projects</h2>
          <p>
            Each tile links to a detailed case study or the live project.
          </p>
        </div>
        {loading && allProjectCards.length === 0 ? (
          <div className="home-empty-state">Loading projects...</div>
        ) : (
          <div className="home-project-grid">
            {allProjectCards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
