import React, { useState } from "react";
import "../styles.css";

const Feedback = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    usability: 5,
    design: 5,
    content: 5,
    comments: "",
  });

  // State for form status
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!formData.name || !formData.email) {
      setFormStatus({
        submitted: false,
        error: "Please fill out all required fields.",
      });
      return;
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: false,
        error: "Please enter a valid email address.",
      });
      return;
    }
  
    try {
      const response = await fetch('https://feedbackapi-fff7d5099600.herokuapp.com/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Don't try to parse JSON if the response might be empty
        // For 201 Created, the body might be empty or not valid JSON
        let responseData = null;
        const contentType = response.headers.get("content-type");
        
        if (contentType && contentType.includes("application/json")) {
          try {
            responseData = await response.json();
          } catch (jsonError) {
            console.log('Response is not valid JSON, but request was successful');
          }
        } else {
          // If not JSON, just read as text (but don't parse)
          try {
            const text = await response.text();
            console.log('Response text:', text);
          } catch (textError) {
            console.log('Could not read response text');
          }
        }
        
        // Show success message
        setFormStatus({
          submitted: true,
          error: null,
        });
  
        // Reset form after submission
        setFormData({
          name: "",
          email: "",
          rating: 5,
          usability: 5,
          design: 5,
          content: 5,
          comments: "",
        });
      } else {
        let errorMessage = "Error submitting feedback. Please try again.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If error response isn't JSON, use default message
          console.log('Error response is not JSON');
        }
        
        setFormStatus({
          submitted: false,
          error: errorMessage,
        });
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setFormStatus({
        submitted: false,
        error: "Network error. Please try again later.",
      });
    }
  };
  
  // Render a thank you message if the form has been submitted
  if (formStatus.submitted) {
    return (
      <div className="feedback-container">
        <div className="feedback-success">
          <h2>Thank You for Your Feedback!</h2>
          <p>
            I appreciate you taking the time to provide feedback on my portfolio
            platform.
          </p>
          <button
            className="feedback-button"
            onClick={() => setFormStatus({ submitted: false, error: null })}
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h1>Portfolio Feedback</h1>
        <p>
          Thank you for checking out my portfolio platform! I'd love to hear
          your thoughts on how it can be improved.
        </p>
      </div>

      {formStatus.error && (
        <div className="feedback-error">{formStatus.error}</div>
      )}

      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Overall Rating</label>
          <div className="rating-slider">
            <input
              type="range"
              id="rating"
              name="rating"
              min="1"
              max="10"
              value={formData.rating}
              onChange={handleChange}
            />
            <span className="rating-value">{formData.rating}/10</span>
          </div>
        </div>

        <div className="form-group">
          <h3>Rate Specific Aspects</h3>

          <div className="aspect-rating">
            <label htmlFor="usability">Usability</label>
            <div className="rating-slider">
              <input
                type="range"
                id="usability"
                name="usability"
                min="1"
                max="10"
                value={formData.usability}
                onChange={handleChange}
              />
              <span className="rating-value">{formData.usability}/10</span>
            </div>
          </div>

          <div className="aspect-rating">
            <label htmlFor="design">Visual Design</label>
            <div className="rating-slider">
              <input
                type="range"
                id="design"
                name="design"
                min="1"
                max="10"
                value={formData.design}
                onChange={handleChange}
              />
              <span className="rating-value">{formData.design}/10</span>
            </div>
          </div>

          <div className="aspect-rating">
            <label htmlFor="content">Content Quality</label>
            <div className="rating-slider">
              <input
                type="range"
                id="content"
                name="content"
                min="1"
                max="10"
                value={formData.content}
                onChange={handleChange}
              />
              <span className="rating-value">{formData.content}/10</span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="comments">Additional Comments</label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Share any additional thoughts, suggestions, or ideas for improvement..."
            rows="5"
          ></textarea>
        </div>

        <button type="submit" className="feedback-button">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;