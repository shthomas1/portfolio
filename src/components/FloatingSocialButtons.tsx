import React from 'react';
import { Linkedin, PenSquare } from 'lucide-react';
import '../styles/home.css';

const FloatingSocialButtons: React.FC = () => {
  return (
    <div className="floating-social-buttons">
      <a
        href="https://www.linkedin.com/in/seanhthomas"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-button floating-button--linkedin"
        aria-label="Connect on LinkedIn"
      >
        <Linkedin size={18} />
        <span>LinkedIn</span>
      </a>
      <a
        href="https://medium.com/@sean.h.thomas2"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-button floating-button--medium"
        aria-label="Read on Medium"
      >
        <PenSquare size={18} />
        <span>Medium</span>
      </a>
    </div>
  );
};

export default FloatingSocialButtons;
