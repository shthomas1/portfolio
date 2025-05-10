import React from "react";
import "../styles/styles.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer-text">
        © {currentYear} Signal Surge LLC, All rights reserved.
      </p>
    </footer>
  );
}