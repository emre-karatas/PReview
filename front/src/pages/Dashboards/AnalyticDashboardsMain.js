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
import {
    fetchProductivity,
    fetchTotalNoOfCommits,
    fetchTotalLinesOfCodes,
    fetchAllPRCount,
    fetchPRCompletionRate,
    fetchTickets,
    fetchPerformance
} from "../../api/connector";
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
    const [year, setYear] = useState(null);

        useEffect(() => {
        const fetchProductivityData = async () => {
            try {
                const response = await fetchProductivity(owner, repo, authToken, openaiApiKey);
                console.log("Signup Response:", response);
                setProductivity(response.title);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        
        const fetchCommitCNT = async () => {
            try {
                const response = await fetchTotalNoOfCommits(owner, repo, authToken );
                console.log("Commit Count Response:", response);
                setTotalCommitCount(response.title);
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
                console.log(response.title);
                setTotalLOC(response.title);
                console.log("LOC Response:", response);
            } catch (error) {
                console.error('Error:', error); 
            }
        };
        
                
        const fetchPRCNT = async () => {
            setOwner("EvanLi");
            setAuthToken("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");
            setRepo("Github-Ranking");

            try {
                const response = await fetchAllPRCount(owner, repo, authToken);
                console.log("PR Count Response:", response);
                setTotalPRCount(response.title);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchCompletionRate = async () => {
            setOwner("EvanLi");
            setAuthToken("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");
            setRepo("Github-Ranking");

            try {
                const response = await fetchPRCompletionRate(owner, repo, authToken);
                console.log("PR Comp Rate Response:", response);
                setCompletionRate(response.title);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchTickets = async () => {
            setOwner("EvanLi");
            setAuthToken("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");
            setRepo("Github-Ranking");
            setYear(2024);

            try {
                const response = await fetchTickets(owner, repo, authToken, year);
                console.log("Ticket Response:", response);
                setAnnualTickets(response.title);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchPerformanceScore = async () => {
            setOwner("EvanLi");
            setAuthToken("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");
            setRepo("Github-Ranking");
            setOpenAiAPIKey("sk-proj-VT8BmgapacHnj7sYNHKST3BlbkFJUt4qjX2xhGYvKzPonbLn")

            try {
                const response = await fetchPerformance(owner, repo, authToken, openaiApiKey);
                console.log("Performance Response:", response);
                setPerformanceScore(response.title);
            } catch (error) {
                console.error('Error:', error);
            }
        };


        fetchCompletionRate();
        //fetchTickets();
        fetchPerformanceScore();
        fetchPRCNT();
        fetchCommitCNT();
        fetchProductivityData();
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
tab
                    </div>
                    <div className="dashboard-stats">
                        <StatBox title="Total PR Created" number={totalPRCount}/>
                        <StatBox title="Productivity" number={productivity}/>
                        <StatBox title="Commit" number={totalCommitCount}/>
                        <StatBox title="Line of Code" number={totalLOC}/>
                    </div>
                    <ProjectSummary ticketsCreated= {annualTickets} avgPRTime="4" completionRate={completionRate}/>
                    <PerformanceScore score={performanceScore} />
                </div>
            </div>
        </div>
    );
};

export default AnalyticDashboardsMain;
