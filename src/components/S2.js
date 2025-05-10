import React from "react";
import "../styles/projects.css";

const S2 = () => {
  return (
    <div className="project-container">
      <div className="project-section">
        <div style={{ textAlign: 'center' }}>
          <img 
            src="images/S2 Black.jpg" 
            alt="Signal Surge LLC Logo" 
            style={{ width: '120px', height: '120px', marginBottom: '15px', borderRadius: '50%' }}
          />
          <h1 className="project-title">Signal Surge LLC</h1>
          <p className="project-subtitle">Digital technology consultancy focused on innovative solutions</p>
        </div>
      </div>

      <section className="project-section">
        <h2 className="section-heading">My Work</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3 className="feature-card h3">Software Development</h3>
            <p className="feature-card p">
              Custom application development tailored to specific business needs, 
              from concept to deployment and maintenance.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-card h3">IT Consulting</h3>
            <p className="feature-card p">
              Strategic technology guidance to optimize your business operations, 
              improve efficiency, and drive growth.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-card h3">Network Solutions</h3>
            <p className="feature-card p">
              Secure network design and implementation to keep the 
              business connected and protected.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-card h3">Systems Integration</h3>
            <p className="feature-card p">
              Seamless integration of disparate systems to create unified, 
              efficient technology ecosystems.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-card h3">Design</h3>
            <p className="feature-card p">
              Creating intuitive user interfaces and engaging experiences that align with business goals and user needs.
            </p>
          </div>
        </div>
      </section>

      <section className="project-section">
        <h2 className="section-heading">My Approach - Based on military Standards, F3EAD</h2>
        <div className="challenges-grid">
          <div className="challenge-card">
            <div className="challenge-number">01</div>
            <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Find</h4>
            <p>
              Begin by understanding your business objectives, challenges, and unique requirements.
            </p>
          </div>
          <div className="challenge-card">
            <div className="challenge-number">02</div>
            <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Fix</h4>
            <p>
              Develop a tailored strategy and solution architecture designed for your specific needs.
            </p>
          </div>
          <div className="challenge-card">
            <div className="challenge-number">03</div>
            <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Finish</h4>
            <p>
              Build and implement solutions using the latest technologies and best practices.
            </p>
          </div>
          <div className="challenge-card">
            <div className="challenge-number">04</div>
            <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Exploit</h4>
            <p>
              Gather intelligence for future operations.
            </p>
          </div>
          <div className="challenge-card">
            <div className="challenge-number">05</div>
            <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Analyze</h4>
            <p>
              Determine what worked, what failed, and draw lessons from gathered data.
            </p>
          </div>
          <div className="challenge-card">
            <div className="challenge-number">06</div>
            <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Disseminate</h4>
            <p>
              Outcomes and insights are documented to bolster future efforts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default S2;