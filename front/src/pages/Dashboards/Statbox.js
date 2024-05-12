import React from 'react';
import './Statbox.css';

const StatBox = ({ title, number, trend, trendIcon }) => {
  return (
    <div className="stat-box">
      <div className="stat-title">{title}</div>
      <div className="stat-number">{number}</div>
      <div className="stat-trend">
        {trendIcon}
        {trend}
      </div>
    </div>
  );
};

export default StatBox;
