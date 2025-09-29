import React from "react";
import { Mail, Github, Linkedin, MapPin, Globe } from "lucide-react";
import "../styles/bio.css";
import BackButton from "./BackButton";
import { BioData } from "../types/Bio";

interface BioProps {
  bioData: BioData | null;
  showBackButton?: boolean;
  variant?: "page" | "section";
}

const Bio: React.FC<BioProps> = ({
  bioData,
  showBackButton = true,
  variant = "page",
}) => {
  const getContactIcon = (type: string, size = 18) => {
    switch (type.toLowerCase()) {
      case "github":
        return <Github size={size} className="contact-link-icon" />;
      case "linkedin":
        return <Linkedin size={size} className="contact-link-icon" />;
      case "email":
        return <Mail size={size} className="contact-link-icon" />;
      case "location":
        return <MapPin size={size} className="contact-link-icon" />;
      default:
        return <Globe size={size} className="contact-link-icon" />;
    }
  };

  if (!bioData) {
    return (
      <div className={`bio-container bio-container--${variant}`}>
        {showBackButton && <BackButton />}
        <p className="bio-empty-state">Bio information will be updated soon.</p>
      </div>
    );
  }

  return (
    <div className={`bio-container bio-container--${variant}`}>
      {showBackButton && <BackButton />}

      <div className="bio-header">
        <div className="profile-image-container">
          <img
            src={bioData.profileImage}
            alt={`${bioData.name} profile`}
            className="round-image"
          />
        </div>

        <div className="bio-header-content">
          <h1 className="bio-name">{bioData.name}</h1>
          <p className="bio-title">{bioData.title}</p>
          {bioData.skills && bioData.skills.length > 0 && (
            <div className="skill-tags">
              {bioData.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`skill-tag skill-tag-${skill.color}`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {bioData.about && bioData.about.length > 0 && (
        <section className="bio-section">
          <h2 className="section-title">About Me</h2>
          {bioData.about.map((paragraph, index) => (
            <p key={index} className="bio-paragraph">
              {paragraph}
            </p>
          ))}
        </section>
      )}

      {bioData.experience && bioData.experience.length > 0 && (
        <section className="bio-section">
          <h2 className="section-title">Experience</h2>
          {bioData.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h3 className="experience-title">{exp.title}</h3>
                <span className="experience-period">{exp.period}</span>
              </div>
              <p className="experience-description">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {(bioData.technicalSkills || bioData.militarySkills || bioData.certificates) && (
        <section className="bio-section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            {bioData.technicalSkills && bioData.technicalSkills.length > 0 && (
              <div className="skills-column">
                <h3 className="skills-category">Technical</h3>
                <ul className="skills-list">
                  {bioData.technicalSkills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}

            {bioData.militarySkills && bioData.militarySkills.length > 0 && (
              <div className="skills-column">
                <h3 className="skills-category">Military</h3>
                <ul className="skills-list">
                  {bioData.militarySkills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}

            {bioData.certificates && bioData.certificates.length > 0 && (
              <div className="skills-column">
                <h3 className="skills-category">Credentials</h3>
                <ul className="skills-list">
                  {bioData.certificates.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {bioData.education && bioData.education.length > 0 && (
        <section className="bio-section">
          <h2 className="section-title">Education</h2>
          {bioData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="education-header">
                <h3 className="education-degree">{edu.degree}</h3>
                <span className="education-period">{edu.period}</span>
              </div>
              <p className="education-description">{edu.description}</p>
            </div>
          ))}
        </section>
      )}

      {bioData.contact && bioData.contact.length > 0 && (
        <section className="bio-section">
          <h2 className="section-title">Connect With Me</h2>
          <div className="contact-container">
            {bioData.contact.map((contactItem, index) => {
              const icon = getContactIcon(contactItem.type);
              const label = contactItem.display || contactItem.type;

              return contactItem.url ? (
                <a
                  key={index}
                  href={contactItem.url}
                  className="contact-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {icon}
                  <span className="contact-link-label">{label}</span>
                </a>
              ) : (
                <div key={index} className="contact-link">
                  {icon}
                  <span className="contact-link-label">{label}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default Bio;
