import React from 'react';
import './PerformanceScore.css';

const PerformanceScore = ({ score }) => {
  return (
    <div className="performance-score-container">
      <h3>Performance Score</h3>
      <div className="score-circle">
        <span>{score}</span>
      </div>
      <p>Out of 100</p>
      <button>View Performance Details</button>
    </div>
  );
};

export default PerformanceScore;
