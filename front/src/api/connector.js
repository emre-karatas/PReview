import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/algos';

// Helper function to perform API requests
const apiRequest = async (endpoint, method, data) => {
    const url = `${API_BASE_URL}/${endpoint}`;
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.githubToken}`, // Assuming githubToken is passed in data when needed
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
export const fetchUserTeams = (org, username, githubToken) =>
    apiRequest('userTeams', 'POST', { org, username, githubToken });

// Fetch the latest PR title
export const fetchLatestPRTitle = (owner, repo, githubToken) =>
    apiRequest('latestPRTitle', 'POST', { owner, repo, githubToken });

// Fetch the latest PR status of a developer
export const fetchLatestPRStatus = (owner, repo, developer, githubToken) =>
    apiRequest('latestPRStatus', 'POST', { owner, repo, developer, githubToken });

// Count PR reviews per developer
export const countPRReviews = (owner, repo, githubToken) =>
    apiRequest('countPRReviews', 'POST', { owner, repo, githubToken });

// Count PR review comments per developer
export const countPRReviewComments = (owner, repo, githubToken) =>
    apiRequest('countPRReviewComments', 'POST', { owner, repo, githubToken });

// Fetch the number of files changed in the latest PR
export const fetchNumberOfChangedFilesInLatestPR = (owner, repo, githubToken) =>
    apiRequest('numberChangedFilesInLatestPR', 'POST', { owner, repo, githubToken });

// Fetch all contributors
export const fetchAllContributors = (owner, repo, githubToken) =>
    apiRequest('allContributors', 'POST', { owner, repo, githubToken });

// Fetch comments made by the developer on their latest PR
export const fetchCommentsByDeveloperOnLatestPR = (owner, repo, developer, githubToken) =>
    apiRequest('commentsOnLatestPR', 'POST', { owner, repo, developer, githubToken });

// Fetch average PR time
export const fetchAveragePRTime = (owner, repo, githubToken) =>
    apiRequest('average-pr-time', 'POST', { owner, repo, githubToken});

// Fetch total line of code
export const fetchTotalLinesOfCodes = (owner, repo, githubToken) =>
    apiRequest('getTotalLinesOfCode', 'POST', { owner, repo, githubToken});  
    
// Fetch total no of commits
export const fetchTotalNoOfCommits = (owner, repo, githubToken) =>
    apiRequest('getCommitCount', 'POST', { owner, repo, githubToken});  
    
 // Fetch productivity
export const fetchProductivity = (owner, repo, githubToken, openaiApiKey) =>
    apiRequest('getProductivity', 'POST', { owner, repo, githubToken, openaiApiKey});
   
 // Fetch prCountLastQuarter
export const fetchPRCountLastQuarter = (owner, repo, githubToken) =>
  apiRequest('prCountLastQuarter', 'POST', { owner, repo, githubToken});     
 
// Fetch prCountLastQuarter
export const fetchmergedPrCntLastQuarter = (owner, repo, githubToken) =>
apiRequest('mergedPrCntLastQuarter', 'POST', { owner, repo, githubToken});      

// Fetch prCountLastQuarter
export const fetchopenPrCntLastQuarter = (owner, repo, githubToken) =>
apiRequest('openPrCntLastQuarter', 'POST', { owner, repo, githubToken});     

// Fetch prCountLastQuarter
export const fetchgetrepodashboard = (owner, repo, prNumber, githubToken) =>
apiRequest('getrepodashboard', 'POST', { owner, repo, prNumber, githubToken});     
                 
// Fetch prCountLastQuarter
export const fetchgetAllDevelopers = (owner, repo, githubToken) =>
apiRequest('getAllDevelopers', 'POST', { owner, repo, githubToken});     

 // Fetch PR count
 export const fetchAllPRCount = (owner, repo, githubToken) =>
 apiRequest('getAllPRCount', 'POST', { owner, repo, githubToken});

export const fetchPRCompletionRate = (owner, repo, githubToken) =>
apiRequest('prCompletionRate', 'POST', { owner, repo, githubToken});

export const fetchAnnualTickets = (owner, repo, githubToken, year) =>
apiRequest('annualTickets', 'POST', { owner, repo, githubToken, year});

export const fetchPerformance = (owner, repo, githubToken, openaiApiKey) =>
apiRequest('projectPerformance', 'POST', { owner, repo, githubToken, openaiApiKey});

// Fetch PR review counts per developer
export const fetchPRReviewCounts = (owner, repo, githubToken) =>
apiRequest('countPRReviews', 'POST', { owner, repo, githubToken });

// Fetch PR review comments counts per developer
export const fetchPRReviewCommentsCounts = (owner, repo, githubToken) =>
apiRequest('countPRReviewComments', 'POST', { owner, repo, githubToken });
    
// Fetch fetchgetcalculateDeveloperProductivity
export const fetchgetcalculateDeveloperProductivity = (owner, repo, developer, githubToken,  openaiApiKey) =>
apiRequest('getcalculateDeveloperProductivity', 'POST', { owner, repo, developer, githubToken,  openaiApiKey});

// Fetch fetchgetcalculateDeveloperProductivity
export const fetchgetAllPullRequests = (owner, repo, githubToken) =>
apiRequest('getAllPullRequests', 'POST', { owner, repo, githubToken});

// Fetch fetchgetcalculateDeveloperProductivity
export const fetchPRCountByDeveloper = (owner, repo, developer, githubToken) =>
apiRequest('getPRCountByDeveloper', 'POST', { owner, repo, developer, githubToken});

// Fetch getReviewedCommitsCount
export const fetchgetReviewedCommitsCount = (owner, repo, developer, githubToken) =>
apiRequest('getReviewedCommitsCount', 'POST', { owner, repo, developer, githubToken});

// Fetch getFetchPRCommentFrequency
export const fetchPRCommentFrequency = (owner, repo, developer, githubToken) =>
apiRequest('getFetchPRCommentFrequency', 'POST', { owner, repo, developer, githubToken});

// Fetch getReviewedCommitsCount
export const fetchTotalPRCommentsByDeveloper = (owner, repo, developer, githubToken) =>
apiRequest('getTotalPRCommentsByDeveloper', 'POST', { owner, repo, developer, githubToken});

// Fetch getReviewedCommitsCount
export const getDeveloperPRActivities = (owner, repo, githubToken) =>
apiRequest('fetchDeveloperPRActivities', 'POST', { owner, repo, githubToken});

// Fetch getReviewedCommitsCount
export const fetchLatestPRComments = (owner, repo, developer, githubToken) =>
apiRequest('getLatestPRComments', 'POST', { owner, repo, developer, githubToken});

// Fetch getReviewedCommitsCount
export const fetchcalculateDeveloperProductivity = (owner, repo, developer, githubToken, openaiApiKey) =>
apiRequest('getcalculateDeveloperProductivity', 'POST', { owner, repo, developer, githubToken, openaiApiKey});

// Fetch PR analysis
export const analyzePR = (repoOwner, repoName, prNumber, reviewer, githubToken) =>
    apiRequest('analyzePRComments', 'POST', { repoOwner, repoName, prNumber, reviewer, githubToken });

  
    
// Fetch PR fetchLatestPRCommentsByDeveloper
export const fetchLatestPRCommentsByDeveloper = (owner, repo, developer, githubToken) =>
apiRequest('getLatestPRCommentsByDeveloper', 'POST', { owner, repo, developer, githubToken });
