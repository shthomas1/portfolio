import React from 'react';
import { Github, Linkedin, Mail, PenSquare, Twitter, Globe, Link2 } from 'lucide-react';
import { BioData, BioContact } from '../types/Bio';
import '../styles/home.css';

interface FloatingSocialButtonsProps {
  contact?: BioData['contact'];
}

const getIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'github':
      return <Github size={18} />;
    case 'linkedin':
      return <Linkedin size={18} />;
    case 'medium':
      return <PenSquare size={18} />;
    case 'email':
      return <Mail size={18} />;
    case 'twitter':
      return <Twitter size={18} />;
    case 'website':
      return <Globe size={18} />;
    default:
      return <Link2 size={18} />;
  }
};

const getLabel = (entry: BioContact) => {
  if (entry.display) {
    return entry.display;
  }
  const type = entry.type.toLowerCase();
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const FloatingSocialButtons: React.FC<FloatingSocialButtonsProps> = ({ contact }) => {
  const linkable = (contact ?? []).filter((entry) => !!entry.url);

  if (linkable.length === 0) {
    return null;
  }

  return (
    <div className="floating-social-buttons">
      {linkable.map((entry, index) => {
        const type = entry.type.toLowerCase();
        const label = getLabel(entry);
        return (
          <a
            key={`${type}-${index}`}
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`floating-button floating-button--${type}`}
            aria-label={label}
          >
            {getIcon(type)}
            <span>{label}</span>
          </a>
        );
      })}
    </div>
  );
};

export default FloatingSocialButtons;
