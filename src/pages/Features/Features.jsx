// src/pages/Features/Features.jsx
import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <div className="features-container">
      <h1>FitTrack Features</h1>
      <p>Everything you need to track your fitness goals and stay motivated.</p>

      <div className="features-grid">
        <div className="feature-card">
          <h2>📊 Real-Time Stats</h2>
          <p>Track steps, calories, sleep, and water intake in real time.</p>
        </div>

        <div className="feature-card">
          <h2>📆 Workout Scheduler</h2>
          <p>Plan and log your workouts. Stay consistent with reminders.</p>
        </div>

        <div className="feature-card">
          <h2>📈 Progress Charts</h2>
          <p>Visualize your fitness journey with weekly and monthly graphs.</p>
        </div>

        <div className="feature-card">
          <h2>🧠 Smart Goal Setting</h2>
          <p>Set and track personalized goals that adapt to your lifestyle.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
