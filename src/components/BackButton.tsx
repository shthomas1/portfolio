import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/backButton.css";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <button onClick={handleBackClick} className="global-back-button">
      ← Back
    </button>
  );
};

export default BackButton;