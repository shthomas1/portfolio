import React from "react";
import "../styles/projects.css";

const S2 = () => {
  return (
    <div className="company-container">
      <div className="company-header">
      <div className="service-card">
        <img 
          src="images/S2 Black.jpg" 
          alt="Signal Surge LLC Logo" 
          className="company-logo"
        />
        <h1 className="company-name">Signal Surge LLC</h1>
        <p className="company-tagline">Digital technology consultancy focused on innovative solutions</p>
      </div>
      </div>

      <section className="company-section">
        <h2 className="section-title">My Work</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3 className="service-title">Software Development</h3>
            <p className="service-description">
              Custom application development tailored to specific business needs, 
              from concept to deployment and maintenance.
            </p>
          </div>
          <div className="service-card">
            <h3 className="service-title">IT Consulting</h3>
            <p className="service-description">
              Strategic technology guidance to optimize your business operations, 
              improve efficiency, and drive growth.
            </p>
          </div>
          <div className="service-card">
            <h3 className="service-title">Network Solutions</h3>
            <p className="service-description">
              Secure network design and implementation to keep the 
              business connected and protected.
            </p>
          </div>
          <div className="service-card">
            <h3 className="service-title">Systems Integration</h3>
            <p className="service-description">
              Seamless integration of disparate systems to create unified, 
              efficient technology ecosystems.
            </p>
          </div>
        </div>
      </section>

      <section className="company-section">
        <h2 className="section-title">My Approach - Based on military Standards, F3EAD</h2>
        <div className="approach-steps">
          <div className="approach-step">
            <h3 className="step-number">01</h3>
            <h4 className="step-title">Find</h4>
            <p className="step-description">
              Begin by understanding your business objectives, challenges, and unique requirements.
            </p>
          </div>
          <div className="approach-step">
            <h3 className="step-number">02</h3>
            <h4 className="step-title">Fix</h4>
            <p className="step-description">
              Develop a tailored strategy and solution architecture designed for your specific needs.
            </p>
          </div>
          <div className="approach-step">
            <h3 className="step-number">03</h3>
            <h4 className="step-title">Finish</h4>
            <p className="step-description">
              Build and implement solutions using the latest technologies and best practices.
            </p>
          </div>
          <div className="approach-step">
            <h3 className="step-number">04</h3>
            <h4 className="step-title">Exploit</h4>
            <p className="step-description">
              Gather intelligence for future operations.
            </p>
          </div>
          <div className="approach-step">
            <h3 className="step-number">05</h3>
            <h4 className="step-title">Analyze</h4>
            <p className="step-description">
              Determine what worked, what failed, and draw lessons from gathered data.
            </p>
          </div>
          <div className="approach-step">
            <h3 className="step-number">06</h3>
            <h4 className="step-title">Disseminate</h4>
            <p className="step-description">
              Outcomes and insights are documented to bolster future efforts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default S2;