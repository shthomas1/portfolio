import React from "react";
import "../styles/whobrew.css";

const WhoBrew: React.FC = () => {
  return (
    <div className="whobrew-page">
      <section className="whobrew-hero">
        <div className="whobrew-hero-text">
          <p className="whobrew-eyebrow">WhoBrew Tap-Based Business Card</p>
          <h1 className="whobrew-title">A tactile introduction to your digital universe.</h1>
          <p className="whobrew-description">
            Inspired by the Last Card concept, WhoBrew pairs a premium physical NFC card with
            a polished landing experience so every in-person introduction instantly unlocks
            your portfolio, socials, or appointment links.
          </p>
        </div>
        <div className="whobrew-hero-card">
          <div className="whobrew-card-face">
            <span className="whobrew-logo">WhoBrew</span>
            <span className="whobrew-tagline">Tap. Connect. Remember.</span>
          </div>
          <div className="whobrew-card-back">
            <div className="whobrew-chip" />
            <p>Embedded NFC core</p>
          </div>
        </div>
      </section>

      <section className="whobrew-grid">
        <article className="whobrew-panel">
          <h2>What makes it memorable</h2>
          <ul>
            <li>Soft-touch matte stock with raised metallic ink and optional embossing.</li>
            <li>Individually encoded NFC chips that can be reassigned in seconds.</li>
            <li>Responsive landing page tailored to your brand, analytics ready.</li>
          </ul>
        </article>
        <article className="whobrew-panel">
          <h2>The digital follow-up</h2>
          <p>
            Each card ships with a hosted profile that mirrors the Last Card layout: hero
            messaging, contact drawer, featured projects, and calendar or payment links.
            Everything lives inside this portfolio so you keep control of updates and data.
          </p>
        </article>
        <article className="whobrew-panel">
          <h2>Built for quick deployment</h2>
          <p>
            Choose from pre-set themes or deliver bespoke assets. Supply your copy and links
            and the card ships encoded with your personalized WhoBrew page already live.
          </p>
        </article>
      </section>

      <section className="whobrew-how">
        <h2>How it works</h2>
        <div className="whobrew-steps">
          <div className="whobrew-step">
            <span className="whobrew-step-number">1</span>
            <h3>Design intake</h3>
            <p>Gather brand colors, typography, and the destination links you want to surface.</p>
          </div>
          <div className="whobrew-step">
            <span className="whobrew-step-number">2</span>
            <h3>Landing page setup</h3>
            <p>Spin up your dedicated WhoBrew page within this app, complete with analytics hooks.</p>
          </div>
          <div className="whobrew-step">
            <span className="whobrew-step-number">3</span>
            <h3>Production & ship</h3>
            <p>Encode the NFC card, print, verify tap performance, and ship with activation guide.</p>
          </div>
        </div>
      </section>

      <section className="whobrew-specs">
        <h2>Technical specs</h2>
        <div className="whobrew-specs-grid">
          <div className="whobrew-spec">
            <h3>Materials</h3>
            <p>30 mil PVC with optional metal core, UV spot gloss, and protective laminate.</p>
          </div>
          <div className="whobrew-spec">
            <h3>Chip</h3>
            <p>NXP NTAG 215 for universal NFC support across iOS and Android devices.</p>
          </div>
          <div className="whobrew-spec">
            <h3>Landing stack</h3>
            <p>React, TypeScript, serverless logging, optional CRM webhook integration.</p>
          </div>
          <div className="whobrew-spec">
            <h3>Turnaround</h3>
            <p>Prototype in 3 business days, production batches delivered in under two weeks.</p>
          </div>
        </div>
      </section>

      <section className="whobrew-cta">
        <div className="whobrew-cta-inner">
          <h2>Bring WhoBrew to your next meetup</h2>
          <p>
            Ready to pilot a WhoBrew card for your team or event? Reach out and we&apos;ll align on
            assets, quantities, and launch timing.
          </p>
          <a className="whobrew-cta-button" href="#contact">
            Start a conversation
          </a>
        </div>
      </section>
    </div>
  );
};

export default WhoBrew;
