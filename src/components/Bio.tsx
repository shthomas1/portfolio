import React, { useState, useEffect } from "react";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import "../styles/bio.css";
import BackButton from "./BackButton";

interface BioData {
  name: string;
  title: string;
  profileImage: string;
  skills: { name: string; color: string }[];
  about: string[];
  experience: { title: string; period: string; description: string }[];
  technicalSkills: string[];
  militarySkills: string[];
  certificates: string[];
  education: { degree: string; period: string; description: string }[];
  contact: { type: string; url?: string }[];
}

const Bio: React.FC = () => {
  const [bioData, setBioData] = useState<BioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Attempting to fetch bioinfo.json...");

    fetch("bioinfo.json")
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Successfully loaded bio data:", data);
        setBioData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading from bioinfo.json:", error);
        setError("Failed to load bio data. Check console for details.");
        setLoading(false);
      });
  }, []);

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
        return null;
    }
  };

  if (loading) return <div>Loading bio information...</div>;
  if (error) return <div>{error}</div>;
  if (!bioData) return <div>No bio information available.</div>;

  return (
    <div className="bio-container">
      <BackButton />
      
      <div className="bio-header">
        <div className="profile-image-container">
          <img
            src={bioData.profileImage}
            alt="Profile"
            className="round-image"
          />
        </div>

        <div className="bio-header-content">
          <h1 className="bio-name">{bioData.name}</h1>
          <p className="bio-title">{bioData.title}</p>
          <div className="skill-tags">
            {bioData.skills &&
              bioData.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`skill-tag skill-tag-${skill.color}`}
                >
                  {skill.name}
                </span>
              ))}
          </div>
        </div>
      </div>

      <section className="bio-section">
        <h2 className="section-title">About Me</h2>
        {bioData.about.map((paragraph, index) => (
          <p key={index} className="bio-paragraph">
            {paragraph}
          </p>
        ))}
      </section>

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

      <section className="bio-section">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          <div className="skills-column">
            <h3 className="skills-category">Technical</h3>
            <ul className="skills-list">
              {bioData.technicalSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="skills-column">
            <h3 className="skills-category">Military</h3>
            <ul className="skills-list">
              {bioData.militarySkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="skills-column">
            <h3 className="skills-category">Credentials</h3>
            <ul className="skills-list">
              {bioData.certificates.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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

      <section className="bio-section">
        <h2 className="section-title">Connect With Me!</h2>
        <div className="contact-container">
          {bioData.contact.map((contactItem, index) =>
            contactItem.url ? (
              <a
                key={index}
                href={contactItem.url}
                className="contact-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {getContactIcon(contactItem.type)}
              </a>
            ) : (
              <div key={index} className="contact-link">
                {getContactIcon(contactItem.type)}
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Bio;