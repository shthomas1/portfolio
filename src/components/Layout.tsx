import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/home.css';
import ProjectDetail from './ProjectDetail';
import FloatingSocialButtons from './FloatingSocialButtons';
import { CardData } from './Card';
import { Project } from '../types/Project';

interface LayoutProps {
  children?: ReactNode;
  cards?: CardData[];
  projects?: Project[];
}

const Layout: React.FC<LayoutProps> = ({ children, cards = [], projects = [] }) => {
  const location = useLocation();
  const isProjectDetail = location.pathname.startsWith('/project/');
  const projectSource = projects.length > 0 ? projects : cards;

  return (
    <div className="layout-shell">
      <FloatingSocialButtons />
      <div className="layout-surface">
        <div className="layout-gradient" />
        <div className="layout-content container">
          {isProjectDetail ? (
            <ProjectDetail cards={projectSource} />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
