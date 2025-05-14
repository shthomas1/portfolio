import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/backButton.css";

const BackButton = ({ destination = "/" }) => {
  const navigate = useNavigate();

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate(destination);
  };

  return (
    <button onClick={handleBackClick} className="global-back-button">
      ← Back
    </button>
  );
};

export default BackButton;