// src/pages/Pricing/Pricing.jsx
import React from 'react';
import './Pricing.css';

const Pricing = () => {
  return (
    <div className="pricing-container">
      <h1>Choose Your Plan</h1>
      <p>Flexible pricing to meet your fitness needs.</p>

      <div className="pricing-plans">
        <div className="pricing-card">
          <h2>Free</h2>
          <p className="price">₹0/month</p>
          <ul>
            <li>✅ Step & Calorie Tracking</li>
            <li>✅ Weekly Reports</li>
            <li>❌ No Goal Setting</li>
          </ul>
        </div>

        <div className="pricing-card popular">
          <h2>Pro</h2>
          <p className="price">₹299/month</p>
          <ul>
            <li>✅ All Free Features</li>
            <li>✅ Goal Setting</li>
            <li>✅ Progress Charts</li>
          </ul>
        </div>

        <div className="pricing-card">
          <h2>Elite</h2>
          <p className="price">₹499/month</p>
          <ul>
            <li>✅ All Pro Features</li>
            <li>✅ Personal Coaching</li>
            <li>✅ Custom Workouts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
