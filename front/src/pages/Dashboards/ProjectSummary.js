import React from 'react';
import './ProjectSummary.css';

const ProjectSummary = ({ ticketsCreated, reviewDate, avgPRTime, completionRate }) => {
  return (
    <div className="project-summary">
      <div className="summary-item">
        <label>Annual Tickets Created</label>
        <div>{ticketsCreated}</div>
      </div>
      <div className="summary-item">
        <label>Next Project Review Date</label>
        <div>{reviewDate}</div>
      </div>
      <div className="summary-item">
        <label>Average PR Time</label>
        <div>{avgPRTime} days</div>
      </div>
      <div className="summary-item">
        <label>Completion Rate</label>
        <div>{completionRate}%</div>
      </div>
    </div>
  );
};

export default ProjectSummary;
