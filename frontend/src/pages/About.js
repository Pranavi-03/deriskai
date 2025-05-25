// src/pages/About.js
import React from 'react';
import aboutImage from '../assets/about.png';

function About() {
  return (
    <div className="about-container">
      <div className="about-box">
        <div className="about-content">
          <div className="about-text">
            <h2>About <span style={{ color: "#61dafb" }}>DeRiskAI</span></h2>
            <p>
              <strong>DeRiskAI</strong> is an innovative platform that leverages artificial intelligence and smart contract analysis
              to protect users from vulnerabilities in DeFi protocols.
            </p>
            <ul>
              <li>🛡️ Detects potential risks in deployed smart contracts</li>
              <li>📊 Uses AI/ML models to generate accurate risk scores</li>
              <li>🔗 Connects with Hathor nano contracts for on-chain automation</li>
              <li>✅ Designed to prevent hacks, rug pulls, and security flaws</li>
            </ul>
            <p>
              In the ever-growing DeFi space, trust is essential.
              Our mission is to enable protocols and users to build with confidence.
            </p>
          </div>
          <div className="about-image">
            <img src={aboutImage} alt="Risk Assessment" className="responsive-image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
