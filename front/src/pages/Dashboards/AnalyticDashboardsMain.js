import React from "react";
import Navbar from "./Navbar";
import AnalyticDashboardsSidebar from "./AnalyticDashboardsSidebar";
import StatBox from "./Statbox";
import ProjectSummary from "./ProjectSummary";
import './AnalyticDashboardMain.css';
import TotalPRChart from "./TotalPRChart";
import PRTable from "./PRTable";
import PerformanceScore from "./PerformanceScore";
import { useState, useEffect } from 'react';
import { fetchProductivity, fetchTotalNoOfCommits, fetchTotalLinesOfCodes, fetchAllPRCount } from "../../api/connector";
import axios from 'axios';


export const AnalyticDashboardsMain = () => {
    
    
    const [productivity, setProductivity] = useState(null);
    const [totalPRCount, setTotalPRCount] = useState(null);
    const [totalPRTrend, setTotalPRTrend] = useState(null);
    const [totalCommitCount, setTotalCommitCount] = useState(null);
    const [totalCommitTrend, setTotalCommitTrend] = useState(null);
    const [owner, setOwner] = useState(null);
    const [repo, setRepo] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [openaiApiKey, setOpenAiAPIKey] = useState(null);

    const [totalLOC, setTotalLOC] = useState(null);

    const [annualTickets, setAnnualTickets] = useState(null);
    const [completionRate, setCompletionRate] = useState(null);
    const [performanceScore, setPerformanceScore] = useState(null);
    const [error, setError] = useState(null);

        useEffect(() => {
        const fetchProductivityData = async () => {
            try {
                const response = await fetchProductivity({owner, repo, authToken, openaiApiKey });
                console.log("Signup Response:", response);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        
        const fetchCommitCNT = async () => {
            try {
                const response = await fetchTotalNoOfCommits({owner, repo, authToken });
                console.log("Signup Response:", response);
            } catch (error) {
                console.error('Error:', error);
            }
        };
         
        
        const fetchLOC = async () => {
            setOwner("EvanLi");
            setAuthToken("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");
            setRepo("Github-Ranking");
             
            console.log("the owner ", owner);  
            console.log("the token ", authToken); 
    
            console.log("the repo ", repo);  
  
            try { 
                const response = await fetchTotalLinesOfCodes(owner, repo, authToken );
                console.log("Signup Response:", response);
            } catch (error) {
                console.error('Error:', error); 
            }
        };
        
                
        const fetchPRCNT = async () => {
            try {
                const response = await fetchAllPRCount({owner, repo, authToken });
                console.log("Signup Response:", response);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchCompletionRate = async () => {
            try {
                const response = await axios.post('/prCompletionRate', {
                    owner: 'ownerName',
                    repo: 'repoName',
                    authToken: 'yourGitHubAuthToken' // Provide your GitHub personal access token
                });
                setCompletionRate(response.data.completionRate);
            } catch (error) {
                setError(error.message);
            }
        };


        const fetchTickets = async () => {
            try {
                const response = await axios.post('/annualTickets', {
                    owner: 'ownerName',
                    repo: 'repoName',
                    year: 2024, // Specify the year you want to retrieve the ticket count for
                    authToken: 'yourGitHubAuthToken' // Provide your GitHub personal access token
                });
                setAnnualTickets(response.data.totalIssues);
            } catch (error) {
                setError(error.message);
            }
        };

        const fetchPerformanceScore = async () => {
            try {
                const response = await axios.post('/projectPerformance', {
                    owner: 'ownerName',
                    repo: 'repoName',
                    githubToken: 'yourGitHubAuthToken', // Provide your GitHub personal access token
                    openaiApiKey: 'yourOpenAIAuthToken' // Provide your OpenAI API key
                });
                setPerformanceScore(response.data.performanceScore);
            } catch (error) {
                setError(error.message);
            }
        };


        //fetchCompletionRate();
        //fetchTickets();
        //fetchPerformanceScore();
        //fetchPRCNT();
        //fetchCommitCNT();
        //fetchProductivityData();
        fetchLOC();
    }, []);
    
    
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
                    <ProjectSummary ticketsCreated= {annualTickets} reviewDate="July 24, 2024" avgPRTime="4" completionRate={completionRate}/>
                    <PerformanceScore score={performanceScore} />
                </div>
            </div>
        </div>
    );
};

export default AnalyticDashboardsMain;
