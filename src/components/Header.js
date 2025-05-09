// In Header.js
import React from "react";
import "../styles.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
        <div className="banner-container">
          <img
            src="/logo.png"
            alt="Football Stadium"
            className="banner-image"
          />
          <div className="banner-content">
            <a
            href="https://www.linkedin.com/in/seanhthomas/"
            className="banner-link"
            >
            <div className="profile-photo">
              <img
                src="/linkedinprofilephoto.jpg"
                alt="Sean Thomas"
                className="round-image2"
              />
              <div className="linkedin-logo">
                <img
                  src="/linkedinlogo.png"
                  alt="Sean Thomas"
                  className="linkedinlogo"
                />
              </div>
            </div>
            </a>
            <div className="banner-title">
              <span className="bracket">&lt;</span>
              <span className="name">Sean Thomas</span>
              <span className="bracket">/&gt;</span>
            </div>
          </div>
        </div>

      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link home-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/bio" className="nav-link bio-link">
              Bio
            </Link>
          </li>
          <li>
            <Link to="/S2" className="nav-link s2-link">
              My Company
            </Link>
          </li>
          <li>
            <Link
              to="https://medium.com/@sean.h.thomas2"
              className="nav-link blog-link"
            >
              Technical Journal
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
