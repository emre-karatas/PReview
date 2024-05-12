import React from "react";
import Navbar from "./Navbar";
import AnalyticDashboardsSidebar from "./AnalyticDashboardsSidebar";
import StatBox from "./Statbox";
import ProjectSummary from "./ProjectSummary";
import './AnalyticDashboardMain.css';
import TotalPRChart from "./TotalPRChart";
import PRTable from "./PRTable";
import PerformanceScore from "./PerformanceScore";


export const AnalyticDashboardsMain = () => {
    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-content">
                <AnalyticDashboardsSidebar />
                <div className="dashboard-main">
                    <div className="dashboard-main-content">
                        <TotalPRChart/>
                        <PRTable/>
                    </div>
                    <div className="dashboard-stats">
                        <StatBox title="Total PR Created" number="1,286" trend="-13.24%"/>
                        <StatBox title="Productivity" number="75%"/>
                        <StatBox title="Commit" number="14854" trend="+28.14%"/>
                        <StatBox title="Line of Code" number="482000"/>
                    </div>
                    <ProjectSummary ticketsCreated="512" reviewDate="July 24, 2024" avgPRTime="4" completionRate="75"/>
                    <PerformanceScore score="78" />
                </div>
            </div>
        </div>
    );
};

export default AnalyticDashboardsMain;
