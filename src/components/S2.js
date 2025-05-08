import React from "react";
import "../styles.css";

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
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3 className="service-title">Software Development</h3>
            <p className="service-description">
              Custom application development tailored to your specific business needs, 
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
              Secure, reliable network design and implementation to keep your 
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
        <h2 className="section-title">Our Approach - Based on military Standards, F3EAD</h2>
        <div className="approach-steps">
          <div className="approach-step">
            <h3 className="step-number">01</h3>
            <h4 className="step-title">Find</h4>
            <p className="step-description">
              We begin by understanding your business objectives, challenges, and unique requirements.
            </p>
          </div>
          <div className="approach-step">
            <h3 className="step-number">02</h3>
            <h4 className="step-title">Fix</h4>
            <p className="step-description">
              Our team develops a tailored strategy and solution architecture designed for your specific needs.
            </p>
          </div>
          <div className="approach-step">
            <h3 className="step-number">03</h3>
            <h4 className="step-title">Finish</h4>
            <p className="step-description">
              We build and implement solutions using the latest technologies and best practices.
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
              Determine what worked, what failed, and draw lessons from our data.
            </p>
          </div>
          <div className="approach-step">
            <h3 className="step-number">06</h3>
            <h4 className="step-title">Disseminate</h4>
            <p className="step-description">
              Outcomes and insights are shared across teams to bolster future efforts.
            </p>
          </div>
        </div>
      </section>

      <section className="company-section">
        <h2 className="section-title">Why Choose Signal Surge?</h2>
        <div className="benefits-list">
          <div className="benefit-item">
            <h3 className="benefit-title">Technical Expertise</h3>
            <p className="benefit-description">
              Our team brings deep technical knowledge across numerous platforms and technologies.
            </p>
          </div>
          <div className="benefit-item">
            <h3 className="benefit-title">Military-Grade Precision</h3>
            <p className="benefit-description">
              Founded by a military professional, we bring discipline and attention to detail to every project.
            </p>
          </div>
          <div className="benefit-item">
            <h3 className="benefit-title">Client-Focused Approach</h3>
            <p className="benefit-description">
              We prioritize your business needs and goals, not just the technology.
            </p>
          </div>
          <div className="benefit-item">
            <h3 className="benefit-title">Innovative Solutions</h3>
            <p className="benefit-description">
              We stay at the forefront of technology to bring you cutting-edge solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="company-section contact-section">
        <h2 className="section-title">Contact Us</h2>
        <p className="contact-text">
          Ready to transform your business with technology solutions that work?
          Get in touch with Signal Surge LLC today.
        </p>
        <div className="contact-info">
          <a href="mailto:contact@signalsurgellc.com" className="contact-link">
            contact@signalsurgellc.com
          </a>
          <a href="tel:+1234567890" className="contact-link">
            (123) 456-7890
          </a>
          <a href="https://www.idonthaveoneyet.com" className="contact-link">
            www.signalsurgellc.com
          </a>
        </div>
        <button className="contact-button">Schedule a Consultation</button>
      </section>
    </div>
  );
};

export default S2;