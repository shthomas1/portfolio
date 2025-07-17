import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/backButton.css";

interface BackButtonProps {
  destination?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ destination = "/" }) => {
  const navigate = useNavigate();

  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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