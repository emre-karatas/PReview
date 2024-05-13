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
    fetchAnnualTickets,
    fetchPerformance,
    fetchPRReviewCounts
} from "../../api/connector";
import axios from 'axios';


export const AnalyticDashboardsMain = () => {
    
    
    const [productivity, setProductivity] = useState(null);
    const [totalPRCount, setTotalPRCount] = useState(null);
    const [totalPRTrend, setTotalPRTrend] = useState(null);
    const [totalCommitCount, setTotalCommitCount] = useState(null);
    const [totalCommitTrend, setTotalCommitTrend] = useState(null);

    // const [owner, setOwner] = useState(null);
    // const [repo, setRepo] = useState(null);
    // const [authToken, setAuthToken] = useState(null);

    const [owner, setOwner] = useState("defaultOwner");
    const [repo, setRepo] = useState("defaultRepo");
    const [authToken, setAuthToken] = useState("defaultToken");
    const [year, setYear] = useState(2024);


    const [openaiApiKey, setOpenAiAPIKey] = useState(null);

    const [totalLOC, setTotalLOC] = useState(null);

    const [annualTickets, setAnnualTickets] = useState(null);
    const [completionRate, setCompletionRate] = useState(null);
    const [performanceScore, setPerformanceScore] = useState(null);
    const [error, setError] = useState(null);
    const [averagePRTime, setAveragePRTime] = useState(null);

    const [rows, setRows] = useState([]);


    useEffect(() => {
        const fetchProductivityData = async () => {
            setOwner("EvanLi");
            setAuthToken("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");
            setRepo("Github-Ranking");
            setOpenAiAPIKey("sk-proj-VT8BmgapacHnj7sYNHKST3BlbkFJUt4qjX2xhGYvKzPonbLn");

            try {
                const response = await fetchProductivity(owner, repo, authToken, openaiApiKey);
                console.log("Productivity Response:", response);
                setProductivity(response.title);
            } catch (error) {
                console.error('Productivity Error:', error);
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
                setCompletionRate(response.completionRate);
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
                const response = await fetchAnnualTickets(owner, repo, authToken, year);
                console.log("Ticket Response:", response);
                setAnnualTickets(response.totalIssues);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchPerformanceScore = async () => {
            setOwner("EvanLi");
            setAuthToken("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");
            setRepo("Github-Ranking");
            setOpenAiAPIKey("sk-proj-VT8BmgapacHnj7sYNHKST3BlbkFJUt4qjX2xhGYvKzPonbLn");

            try {
                const response = await fetchPerformance(owner, repo, authToken, openaiApiKey);
                console.log("Performance Response:", response);
                setPerformanceScore(response.performanceScore);
            } catch (error) {
                console.error('Performance Error:', error);
            }
        };

        const fetchAveragePRTime = async () => {
            try {
                const response = await axios.post('http://localhost:8080/api/algos/average-pr-time', { owner, repo });
                console.log("Average PR Time Response:", response.data);
                // Assuming the response contains averageDays and count
                setAveragePRTime(response.data.averageDays);
            } catch (error) {
                console.error('Error fetching average PR time:', error);
            }
        };

        const fetchRows = async () => {
            try {
                const prReviewCountsResponse = await fetchPRReviewCounts(owner, repo, authToken);
                const prReviewCounts = prReviewCountsResponse.review;

                // Map the data to get PR counts for each developer
                const prCountsData = prReviewCounts.map(prReviewCount => ({
                    id: prReviewCount.id,
                    name: prReviewCount.developer,
                    prCount: prReviewCount.count,
                }));

                setRows(prCountsData);
                console.error('ROWS: ', prReviewCountsResponse.data);
            } catch (error) {
                console.error('Error fetching ROWS:', error);
            }
        };


        fetchAveragePRTime();
        fetchCompletionRate();
        fetchTickets();
        fetchPerformanceScore();
        fetchPRCNT();
        fetchCommitCNT();
        fetchProductivityData();
        fetchLOC();
        fetchRows();
    }, [owner, repo, authToken, year]);
    
    
    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-content">
                <AnalyticDashboardsSidebar className="sidebar"/>
                <div className="dashboard-main">
                    <div className="dashboard-main-content">
                        <TotalPRChart/>
                        <PRTable rows={rows} />
                        tab
                    </div>
                    <div className="dashboard-stats">
                        <StatBox title="Total PR Created" number={totalPRCount}/>
                        <StatBox title="Commit" number={totalCommitCount}/>
                        <StatBox title="Line of Code" number={totalLOC}/>
                    </div>
                    <ProjectSummary ticketsCreated= {annualTickets} avgPRTime={averagePRTime} completionRate={completionRate} productivity={productivity}/>
                    <PerformanceScore score={performanceScore} />
                </div>
            </div>
        </div>
    );
};

export default AnalyticDashboardsMain;
