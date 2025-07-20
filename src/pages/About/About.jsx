// src/pages/About/About.jsx
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About FitTrack</h1>
        <p>Your fitness companion to a healthier life</p>
      </div>

      <section className="about-section">
        <h2>Why FitTrack?</h2>
        <p>
          FitTrack is a smart and intuitive fitness tracker that helps you monitor your physical activities,
          set health goals, and stay motivated. Whether you're a beginner or an athlete, FitTrack supports you
          every step of the way.
        </p>
      </section>

      <section className="about-section">
        <h2>Core Features</h2>
        <ul>
          <li>🧍 Step Counter & Calorie Burn Tracking</li>
          <li>📈 Weekly & Monthly Performance Graphs</li>
          <li>🎯 Goal Setting and Progress Monitoring</li>
          <li>📅 Workout Logging and History</li>
          <li>🔒 Secure Login with Firebase or Custom Auth</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          We believe in the power of habits. Our mission is to provide users with an easy-to-use,
          motivating, and insightful platform to help them reach their fitness goals.
        </p>
      </section>

      <section className="about-section about-team">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-card">
            <div className="team-avatar">👩‍💻</div>
            <h3>Aruna A.</h3>
            <p>Frontend Developer</p>
          </div>
          <div className="team-card">
            <div className="team-avatar">🧑‍🔧</div>
            <h3>John D.</h3>
            <p>Backend Engineer</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
