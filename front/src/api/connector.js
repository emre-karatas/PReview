import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/algos';

// Helper function to perform API requests
const apiRequest = async (endpoint, method, data) => {
    const url = `${API_BASE_URL}/${endpoint}`;
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.authToken}`, // Assuming authToken is passed in data when needed
        },
        data,
        url,
    };
    try {
        const response = await axios(options);
        return response.data;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};

// Fetch user teams
export const fetchUserTeams = (org, username, authToken) =>
    apiRequest('userTeams', 'POST', { org, username, authToken });

// Fetch the latest PR title
export const fetchLatestPRTitle = (owner, repo, authToken) =>
    apiRequest('latestPRTitle', 'POST', { owner, repo, authToken });

// Fetch the latest PR status of a developer
export const fetchLatestPRStatus = (owner, repo, developer, authToken) =>
    apiRequest('latestPRStatus', 'POST', { owner, repo, developer, authToken });

// Count PR reviews per developer
export const countPRReviews = (owner, repo) =>
    apiRequest('countPRReviews', 'POST', { owner, repo });

// Count PR review comments per developer
export const countPRReviewComments = (owner, repo) =>
    apiRequest('countPRReviewComments', 'POST', { owner, repo });

// Fetch the number of files changed in the latest PR
export const fetchNumberOfChangedFilesInLatestPR = (owner, repo, authToken) =>
    apiRequest('numberChangedFilesInLatestPR', 'POST', { owner, repo, authToken });

// Fetch all contributors
export const fetchAllContributors = (owner, repo, authToken) =>
    apiRequest('allContributors', 'POST', { owner, repo, authToken });

// Fetch comments made by the developer on their latest PR
export const fetchCommentsByDeveloperOnLatestPR = (owner, repo, developer, authToken) =>
    apiRequest('commentsOnLatestPR', 'POST', { owner, repo, developer, authToken });

// Fetch average PR time
export const fetchAveragePRTime = (owner, repo) =>
    apiRequest('average-pr-time', 'POST', { owner, repo });

// Fetch total line of code
export const fetchTotalLinesOfCodes = (owner, repo, authToken) =>
    apiRequest('getTotalLinesOfCode', 'POST', { owner, repo, authToken});  
    
// Fetch total no of commits
export const fetchTotalNoOfCommits = (owner, repo, authToken) =>
    apiRequest('getCommitCount', 'POST', { owner, repo, authToken});  
    
 // Fetch productivity
export const fetchProductivity = (owner, repo, authToken, openaiApiKey) =>
    apiRequest('getProductivity', 'POST', { owner, repo, authToken, openaiApiKey});     

    
 // Fetch fetchAllPRCount
 export const fetchAllPRCount = (owner, repo, authToken) =>
 apiRequest('getAllPRCount', 'POST', { owner, repo, authToken});     
 
  // Fetch prCountLastQuarter
export const fetchPRCountLastQuarter = (owner, repo, authToken) =>
  apiRequest('prCountLastQuarter', 'POST', { owner, repo, authToken});     
 
  // Fetch prCountLastQuarter
  export const fetchmergedPrCntLastQuarter = (owner, repo, authToken) =>
  apiRequest('mergedPrCntLastQuarter', 'POST', { owner, repo, authToken});      
  
  
    // Fetch prCountLastQuarter
    export const fetchopenPrCntLastQuarter = (owner, repo, authToken) =>
    apiRequest('openPrCntLastQuarter', 'POST', { owner, repo, authToken});     
    
    
      
    // Fetch prCountLastQuarter
    export const fetchgetrepodashboard = (repoOwner, repoName, prNumber, authToken) =>
    apiRequest('getrepodashboard', 'POST', { repoOwner, repoName, prNumber, authToken});     
    
    
  