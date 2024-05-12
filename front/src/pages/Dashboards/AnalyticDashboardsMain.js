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
    
    
    const [productivity, setProductivity] = useState(null);
    const [totalPRCount, setTotalPRCount] = useState(null);
    const [totalPRTrend, setTotalPRTrend] = useState(null);
    const [totalCommitCount, setTotalCommitCount] = useState(null);
    const [totalCommitTrend, setTotalCommitTrend] = useState(null);

    const [totalLOC, setTotalLOC] = useState(null);

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
                        <StatBox title="Total PR Created" number={totalCommitCount} trend="-13.24%"/>
                        <StatBox title="Productivity" number={productivity}/>
                        <StatBox title="Commit" number={totalCommitCount} trend="+28.14%"/>
                        <StatBox title="Line of Code" number={totalLOC}/>
                    </div>
                    <ProjectSummary ticketsCreated="512" reviewDate="July 24, 2024" avgPRTime="4" completionRate="75"/>
                    <PerformanceScore score="78" />
                </div>
            </div>
        </div>
    );
};

export default AnalyticDashboardsMain;
