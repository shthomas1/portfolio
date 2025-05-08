import React from "react";
import "../styles.css";

const RevPred = () => {
  // Mock data for project details - in a real implementation, you might fetch this from an API
  const projectDetails = {
    title: "Revenue Prediction Application",
    description:
      "Command line interface application for predicting daily and weekly sales for a bar in Tuscaloosa, Alabama.",
    year: "2024",
    client: "Local Tuscaloosa Bar (Intentionally unnamed because of data used)",
    role: "Solo Developer",
    duration: "3 weeks",
    technologies: ["C#", ".NET Core"],
    challenges: [
      "Create an accurate prediction model with limited historical data",
      "Account for special events and game days that significantly impact revenue",
      "Build a user-friendly CLI for non-technical staff",
      "Implement real-time data updates for continuous model improvement",
    ],
    results: [
      "Achieved 98% prediction accuracy (±2% error margin)",
      "Reduced inventory waste on game days by 15%",
      "Optimized staffing schedules based on predicted customer volume",
      "Created a self-improving model that changes predictions over time",
    ],
  };

  return (
    <div className="project-page-container">
      <div className="project-header">
        <h1>{projectDetails.title}</h1>
        <p className="project-tagline">
          Leveraging machine learning to predict bar sales with high accuracy
        </p>
      </div>

      <section className="project-section">
        <h2>Project Overview</h2>
        <p>
          {projectDetails.description} This application uses a Gradient Boosting
          machine learning algorithm to analyze historical sales data, and
          betting trends to forecast daily revenue with remarkable precision.
        </p>

        <div className="project-meta">
          <div className="meta-item">
            <span className="meta-label">Year:</span>
            <span className="meta-value">{projectDetails.year}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Client:</span>
            <span className="meta-value">{projectDetails.client}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Role:</span>
            <span className="meta-value">{projectDetails.role}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Duration:</span>
            <span className="meta-value">{projectDetails.duration}</span>
          </div>
        </div>
      </section>

      <section className="project-section">
        <h2>Technologies Used</h2>
        <div className="tech-stack">
          {projectDetails.technologies.map((tech, index) => (
            <span key={index} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
        <p>
          I chose C# for this project because it was part of a challenge to
          build something that helps someone- the project's goal was to show
          proficiency with C#. I won the "Best-Logic Award" in this challenge.
        </p>
      </section>

      <section className="project-section">
        <h2>The Challenge</h2>
        <p>
          Bars and restaurants in Tuscaloosa experience dramatic fluctuations in
          customer traffic based on University of Alabama football games, local
          events, and seasonal patterns. Predicting these fluctuations is
          crucial for staffing, inventory management, and financial planning.
        </p>

        <div className="challenges-list">
          {projectDetails.challenges.map((challenge, index) => (
            <div key={index} className="challenge-item">
              <span className="challenge-marker">!</span>
              <p>{challenge}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="project-section">
        <h2>The Solution</h2>
        <p>
          I developed a machine learning model that analyzes multiple factors
          affecting bar revenue, including:
        </p>
        <ul className="solution-features">
          <li>Day of week and time patterns</li>
          <li>University of Alabama football schedule (home vs. away games)</li>
          <li>Other sporting events and local activities</li>
          <li>Historical sales data from previous years</li>
          <li>Weather forecasts and seasonal trends</li>
          <li>Holidays and special promotions</li>
        </ul>
      </section>

      <section className="project-section">
        <h2>Results & Impact</h2>
        <div className="results-grid">
          {projectDetails.results.map((result, index) => (
            <div key={index} className="result-card">
              <div className="result-icon">✓</div>
              <p>{result}</p>
            </div>
          ))}
        </div>
        <p className="impact-statement">
          The Revenue Prediction Application has transformed how the client
          approaches daily operations, enabling data-driven decisions that have
          improved profitability and customer experience.
        </p>
      </section>

      <section className="project-section">
        <h2>Technical Implementation</h2>
        <div className="implementation-details">
          <div className="implementation-item">
            <h3>Data Collection</h3>
            <p>
              I scraped data from the Client's quickbooks account which shows
              daily sales. I pulled data for all of the Alabama Football Game
              Days from 2018 - 2024 for this project.
            </p>
          </div>
          <div className="implementation-item">
            <h3>Gradient Boosting</h3>
            <p>
              I created my own Gradient-Boosting model instead of utilizing
              pre-developed systems just to prove I could. I'm a big fan of
              learning every step along the way, and this is my favorite project
              I've ever done for this reason.
            </p>
          </div>
          <div className="implementation-item">
            <h3>User Interface</h3>
            <p>
              The interface, admittedly, did not win any awards.
              It was a command-line interface that was easy to understand, which
              fit my own requirements. In the future, I will be creating a
              portal for the business owner to access his Bar's predictions.
            </p>
          </div>
        </div>
      </section>

      <section className="project-section">
        <h2>Lessons Learned</h2>
        <p>
          This project reinforced the importance of domain knowledge when
          building prediction models. Understanding the specific factors that
          influence bar revenue in a college town was crucial for feature
          selection.
        </p>
        <p>
          I also learned valuable lessons about balancing model complexity with
          usability. While more complex models sometimes offered marginal
          accuracy improvements, they came at the cost of interpretability and
          maintenance complexity.
        </p>
      </section>

      <div className="project-footer">
        <p>
          Want to learn more about my approach to this project or discuss
          similar solutions for your business?
        </p>
        <a href="/bio" className="contact-link">
          Get in touch
        </a>
      </div>
    </div>
  );
};

export default RevPred;
