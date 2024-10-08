require("dotenv").config();
const express = require("express");
const router = express.Router();
const token = process.env.GITHUB_API_KEY;
const axios = require('axios');

const { countPRReviewsPerDeveloper, countPRReviewCommentsPerDeveloper} = require('./helpers/countPR');
const { fetchUserTeams} = require('./helpers/userTeams');
const { fetchLatestPRStatus } = require('./helpers/latestPRStatus');
const { fetchLatestPullRequestTitle} = require('./helpers/latestPRTitle');
const { fetchNumberOfChangedFilesInLatestPR } = require('./helpers/latestPRChangeNo');
const { fetchAllContributors } = require('./helpers/fetchContributorsAll');
const { fetchCommentsByDeveloperOnLatestPR } = require('./helpers/commentsbydevLatestPR');
const getTotalLinesOfCode  = require('./helpers/getTotalLinesOfCode');
const countCommits = require('./helpers/countCommits');
const calculateProjectProductivity = require('./helpers/calculateProjectProductivity');
const countAllPRs = require('./helpers/countAllPRs');
const computePRCompletionRate = require('./helpers/computePRCompletionRate');
const computeAnnualTicketCreation = require('./helpers/computeAnnualTicketCreation');
const calculateProjectPerformance = require('./helpers/calculateProjectPerformance')
const countPRsLastQuarter = require('./helpers/countPRsLastQuarter');
const countMergedPRsLastQuarter = require('./helpers/countMergedPRsLastQuarter');
const countOpenPRsLastQuarter = require('./helpers/countOpenPRsLastQuarter');
const {fetchAndAnalyzeComments} = require('./helpers/repodashboard');
const getAllDevelopers = require('./helpers/getAllDevelopers');
const calculateDeveloperProductivity = require('./helpers/calculateDeveloperProductivity');
const getAllPullRequests = require('./helpers/getAllPullRequests');
const fetchPRCountByDeveloper = require('./helpers/fetchPRCountByDeveloper');
const fetchReviewedCommitsCount = require('./helpers/fetchReviewedCommitsCount');
const fetchPRCommentFrequency = require('./helpers/fetchPRCommentFrequency');
const fetchTotalPRCommentsByDeveloper = require('./helpers/fetchTotalPRCommentsByDeveloper');
const fetchDeveloperPRActivities = require('./helpers/fetchDeveloperPRActivities');
const fetchLatestPRComments = require('./helpers/fetchLatestPRComments');
const fetchLatestPRCommentsByDeveloper = require('./helpers/fetchLatestPRCommentsByDeveloper');

// API route for fetching getLatestPRCommentsByDeveloper
router.post('/getLatestPRCommentsByDeveloper', async (req, res) => {
    const { owner, repo, developer, githubToken } = req.body;

    if (!owner || !repo || !githubToken || !developer) {
        return res.status(400).send('Missing required parameters: owner, repo, developer, githubToken');
    }
    try {
        const teams = await fetchLatestPRCommentsByDeveloper(owner, repo, developer, githubToken);
        console.log("teams", teams);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching getLatestPRCommentsByDeveloper:', error);
        res.status(500).send('Server error occurred while getLatestPRCommentsByDeveloper.');
    }
});



// API route for fetching getLatestPRComments
router.post('/getLatestPRComments', async (req, res) => {
    const { owner, repo, developer, githubToken } = req.body;

    if (!owner || !repo || !githubToken || !developer) {
        return res.status(400).send('Missing required parameters: owner, repo, developer, githubToken');
    }
    try {
        const teams = await fetchLatestPRComments(owner, repo, developer, githubToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching fetchLatestPRComments:', error);
        res.status(500).send('Server error occurred while fetchLatestPRComments.');
    }
});

// API route for fetching fetchDeveloperPRActivities
router.post('/fetchDeveloperPRActivities', async (req, res) => {
    const { owner, repo, githubToken } = req.body;

    if (!owner || !repo || !githubToken) {
        return res.status(400).send('Missing required parameters: owner, repo, githubToken');
    }
    try {
        const teams = await fetchDeveloperPRActivities(owner, repo, githubToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching fetchDeveloperPRActivities:', error);
        res.status(500).send('Server error occurred while fetchDeveloperPRActivities.');
    }
});

// API route for fetching getTotalPRCommentsByDeveloper
router.post('/getTotalPRCommentsByDeveloper', async (req, res) => {
    const { owner, repo, developer, githubToken } = req.body;

    if (!owner || !repo || !githubToken || !developer) {
        return res.status(400).send('Missing required parameters: owner, repo, developer, githubToken');
    }
    try {
        const teams = await fetchTotalPRCommentsByDeveloper(owner, repo, developer, githubToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching getTotalPRCommentsByDeveloper:', error);
        res.status(500).send('Server error occurred while getTotalPRCommentsByDeveloper.');
    }
});


// API route for fetching getFetchPRCommentFrequency
router.post('/getFetchPRCommentFrequency', async (req, res) => {
    const { owner, repo, developer, githubToken } = req.body;
 
    if (!owner || !repo || !githubToken || !developer) {
        return res.status(400).send('Missing required parameters: owner, repo, developer, githubToken');
    }
    try {
        const teams = await fetchPRCommentFrequency(owner, repo, developer, githubToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching fetchPRCommentFrequency:', error);
        res.status(500).send('Server error occurred while fetchPRCommentFrequency.');
    }
});

// API route for fetching fetchReviewedCommitsCount
router.post('/getReviewedCommitsCount', async (req, res) => {
    const { owner, repo, developer, githubToken } = req.body;

    if (!owner || !repo || !githubToken || !developer) {
        return res.status(400).send('Missing required parameters: owner, repo, developer, githubToken');
    }
    try {
        const teams = await fetchReviewedCommitsCount(owner, repo, developer, githubToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching fetchReviewedCommitsCount:', error);
        res.status(500).send('Server error occurred while fetchReviewedCommitsCount.');
    }
});


// API route for fetching getPRCountByDeveloper
router.post('/getPRCountByDeveloper', async (req, res) => {
    const { owner, repo, developer, githubToken } = req.body;

    if (!owner || !repo || !githubToken) {
        return res.status(400).send('Missing required parameters: owner, repo, developer, githubToken');
    }
    try {
        const teams = await fetchPRCountByDeveloper(owner, repo, developer, githubToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching fetchPRCountByDeveloper:', error);
        res.status(500).send('Server error occurred while fetchPRCountByDeveloper.');
    }
});


// API route for fetching getAllPullRequests
router.post('/getAllPullRequests', async (req, res) => {
    const { owner, repo, githubToken } = req.body;
  
    if (!owner || !repo || !githubToken) {
        return res.status(400).send('Missing required parameters: owner, repo, githubToken');
    }
    try {
        const teams = await getAllPullRequests(owner, repo, githubToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching getAllPullRequests:', error);
        res.status(500).send('Server error occurred while getAllPullRequests.');
    }
});


// API route for fetching calculateDeveloperProductivity
router.post('/getcalculateDeveloperProductivity', async (req, res) => {
    const { owner, repo, developer, githubToken, openaiApiKey } = req.body;
        
    if (!owner || !repo || !githubToken || !developer || !openaiApiKey) {
        return res.status(400).send('Missing required parameters: owner, repo, developer, githubToken, openaiApiKey');
    }
    try {
        const teams = await calculateDeveloperProductivity(owner, repo, developer, githubToken, openaiApiKey);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching calculateDeveloperProductivity:', error);
        res.status(500).send('Server error occurred while calculateDeveloperProductivity.');
    }
});

// API route for fetching getAllDevelopers
router.post('/getAllDevelopers', async (req, res) => {
    const { owner, repo, githubToken } = req.body;

    if (!owner || !repo || !githubToken) {
        return res.status(400).send('Missing required parameters: owner, repo, githubToken');
    }
    try {
        const teams = await getAllDevelopers(owner, repo, githubToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching getAllDevelopers:', error);
        res.status(500).send('Server error occurred while getAllDevelopers.');
    }
});

// API route for fetching repodashboard
router.post('/getrepodashboard', async (req, res) => {
    const { owner, repo, prNumber, githubToken } = req.body;

    if (!owner || !repo || !githubToken || !prNumber) {
        return res.status(400).send('Missing required parameters: owner, repo, prNumber, githubToken');
    }
    try {
        let teams = await fetchAndAnalyzeComments(owner, repo, prNumber, githubToken);
        // let tones = []
        // for(team in teams) {
        //     
        // }
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching repodashboard:', error);
        res.status(500).send('Server error occurred while repodashboard.');
    }
});

// API route for fetching openPrCntLastQuarter
router.post('/openPrCntLastQuarter', async (req, res) => {
    const { owner, repo, githubToken } = req.body;

    if (!owner || !repo || !githubToken) {
        return res.status(400).send('Missing required parameters: owner, repo, githubToken');
    }
    try {
        const teams = await countOpenPRsLastQuarter(owner, repo, githubToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching openPrCntLastQuarter:', error);
        res.status(500).send('Server error occurred while openPrCntLastQuarter.');
    }
});


// API route for fetching countMergedPRsLastQuarter
router.post('/mergedPrCntLastQuarter', async (req, res) => {
    const { owner, repo, githubToken } = req.body;

    if (!repo || !owner || !githubToken) {
        return res.status(400).send('Missing required parameters: owner, repo, githubToken');
    }
    try {
        const teams = await countMergedPRsLastQuarter(owner, repo, githubToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching countMergedPRsLastQuarter:', error);
        res.status(500).send('Server error occurred while fetchingcountMergedPRsLastQuarter.');
    }
});

// API route for fetching the teams a user belongs to
router.post('/userTeams', async (req, res) => {
    const { org, username, githubToken } = req.body;
    if (!org || !username || !githubToken) {
        return res.status(400).send('Missing required parameters: org, username, githubToken');
    }
    try {
        const teams = await fetchUserTeams(org, username, githubToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching user teams:', error);
        res.status(500).send('Server error occurred while fetching user teams.');
    }
});


// API route for fetching the teams a user belongs to
router.post('/prCountLastQuarter', async (req, res) => {
    const { owner, repo, githubToken } = req.body;
    
    if (!owner || !repo || !githubToken) {
        return res.status(400).send('Missing required parameters: owner, repo, githubToken');
    }
    try {
        const teams = await countPRsLastQuarter(owner, repo, githubToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching user teams:', error);
        res.status(500).send('Server error occurred while fetching user teams.');
    }
});

// API route for fetching the latest PR title
router.post('/latestPRTitle', async (req, res) => {
    const { owner, repo, githubToken } = req.body;
    if (!owner || !repo || !githubToken) {
        return res.status(400).send('Missing required parameters: owner, repo, githubToken');
    }
    try {
        const title = await fetchLatestPullRequestTitle(owner, repo, githubToken);
        res.status(200).json({ title });
    } catch (error) {
        console.error('Error fetching the latest PR title:', error);
        res.status(500).send('Server error occurred while fetching the latest PR title.');
    }
});

// API route for fetching the total line of code
router.post('/getTotalLinesOfCode', async (req, res) => {
    const { owner, repo, githubToken } = req.body;

    if (!owner || !repo || !githubToken) {
        return res.status(400).send('Missing required parameters: owner, repo, githubToken');
    }
    try {
        const title = await getTotalLinesOfCode(owner, repo, githubToken);
        res.status(200).json({ title });
    } catch (error) {
        console.error('Error fetching the total line of code:', error);
        res.status(500).send('Server error occurred while fetching the total line of code.');
    }
});

// API route for fetching the total no of commits
router.post('/getCommitCount', async (req, res) => {
    const { owner, repo, githubToken } = req.body;
    if (!owner || !repo || !githubToken) {
        return res.status(400).send('Missing required parameters: owner, repo, githubToken');
    }
    try {
        const title = await countCommits(owner, repo, githubToken);
        res.status(200).json({ title });
    } catch (error) {
        console.error('Error fetching no of commits:', error);
        res.status(500).send('Server error occurred while fetching the no of commits.');
    }
});

// API route for fetching productivity
router.post('/getProductivity', async (req, res) => {
    const { owner, repo, githubToken, openaiApiKey } = req.body;
    if (!owner || !repo || !githubToken || !openaiApiKey) {
        return res.status(400).send('Missing required parameters: owner, repo, githubToken');
    }
    try {
        const title = await calculateProjectProductivity(owner, repo, githubToken, openaiApiKey);
        res.status(200).json({ title });
    } catch (error) {
        console.error('Error fetching productivity:', error);
        res.status(500).send('Server error occurred while fetching productivity.');
    }
});

// API route for counting all prs
router.post('/getAllPRCount', async (req, res) => {
    const { owner, repo, githubToken } = req.body;
    if (!owner || !repo || !githubToken) {
        return res.status(400).send('Missing required parameters: owner, repo, githubToken');
    }
    try {
        const title = await countAllPRs(owner, repo, githubToken);
        res.status(200).json({ title });
    } catch (error) {
        console.error('Error fetching counting all prs:', error);
        res.status(500).send('Server error occurred while fetching counting all prs.');
    }
});

// API route for fetching the latest PR status of a developer
router.post('/latestPRStatus', async (req, res) => {
    const { owner, repo, developer, githubToken } = req.body;
    if (!owner || !repo || !developer || !githubToken) {
        return res.status(400).send('Missing required parameters: owner, repo, developer, githubToken');
    }
    try {
        const prStatus = await fetchLatestPRStatus(owner, repo, developer, githubToken);
        res.status(200).json(prStatus);
    } catch (error) {
        console.error('Error fetching latest PR status:', error);
        res.status(500).send('Server error occurred while fetching the latest PR status.');
    }
});

// Pull Request review count per developer - ranking
router.post('/countPRReviews', async (req, res) => {
    const { owner, repo, githubToken } = req.body; // Ensure token is passed in the body or through some secure means
    if (!owner || !repo) {
        return res.status(400).send('Missing required parameters: owner, repo, token');
    }
    try {
        const reviewCounts = await countPRReviewsPerDeveloper(owner, repo, githubToken);
        res.status(200).json({review: reviewCounts});
    } catch (error) {
        console.error('Error getting PR reviews:', error);
        res.status(500).send('Server error occurred while getting PR reviews.');
    }
});

// Pull request review comments count per developer - ranking
router.post('/countPRReviewComments', async (req, res) => {
    const { owner, repo, githubToken } = req.body;
    if (!owner || !repo ) {
        return res.status(400).send('Missing required parameters: owner, repo, githubToken ');
    }
    try {
        const rankedDevelopers = await countPRReviewCommentsPerDeveloper(owner, repo, githubToken);
        res.status(200).json({ranked: rankedDevelopers});
    } catch (error) {
        console.error('Error getting PR review comments:', error);
        res.status(500).send('Server error occurred while getting PR review comments.');
    }
});

// API route for fetching the number of files changed in the latest PR
router.post('/numberChangedFilesInLatestPR', async (req, res) => {
    const { owner, repo, githubToken } = req.body;
    if (!owner || !repo || !githubToken) {
        return res.status(400).send('Missing required parameters: owner, repo, githubToken');
    }
    try {
        const changedFiles = await fetchNumberOfChangedFilesInLatestPR(owner, repo, githubToken);
        res.status(200).json({ changedFiles });
    } catch (error) {
        console.error('Error fetching number of changed files in latest PR:', error);
        res.status(500).send('Server error occurred while fetching changed files.');
    }
});

// API route for fetching all contributors
router.post('/allContributors', async (req, res) => {
    const { owner, repo, githubToken } = req.body;
    if (!owner || !repo || !githubToken) {
        return res.status(400).send('Missing required parameters: owner, repo, githubToken');
    }
    try {
        const contributors = await fetchAllContributors(owner, repo, githubToken);
        res.status(200).json({ contributors });
    } catch (error) {
        console.error('Error fetching all contributors:', error);
        res.status(500).send('Server error occurred while fetching contributors.');
    }
});

// API route for fetching comments made by the developer on their latest PR
router.post('/commentsOnLatestPR', async (req, res) => {
    const { owner, repo, developer, githubToken } = req.body;
    if (!owner || !repo || !developer || !githubToken) {
        return res.status(400).send('Missing required parameters: owner, repo, developer, githubToken');
    }
    try {
        const comments = await fetchCommentsByDeveloperOnLatestPR(owner, repo, developer, githubToken);
        res.status(200).json({ comments });
    } catch (error) {
        console.error('Error fetching comments by the developer on latest PR:', error);
        res.status(500).send('Server error occurred while fetching comments.');
    }
});

router.post('/average-pr-time', async (req, res) => {
    const { owner, repo, githubToken } = req.body;

    if (!owner || !repo ) {
        return res.status(400).send('Missing required parameters: owner, repo,  githubToken');
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json' 
        },
        params: {
            state: 'closed',
            per_page: 100
        }
    };

    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls`, config);
        const prs = response.data;

        const totalTime = prs.reduce((acc, pr) => {
            const created = new Date(pr.created_at);
            const closed = new Date(pr.closed_at);
            return acc + (closed - created);
        }, 0);

        const averageTime = totalTime / prs.length;
        const averageDays = averageTime / (1000 * 60 * 60 * 24); // Convert from milliseconds to days

        res.json({
            averageDays: averageDays.toFixed(2),
            count: prs.length
        });
    } catch (error) {
        console.error('Error fetching PRs:', error);
        res.status(500).send('Server error occurred while fetching PRs.');
    }
});

router.post('/annualTickets', async (req, res) => {
    const { owner, repo, year, githubToken } = req.body;
    if (!owner || !repo || !year || !githubToken) {
        return res.status(400).send('Missing required parameters: owner, repo, year, githubToken');
    }
    try {
        const totalIssues = await computeAnnualTicketCreation(owner, repo, githubToken, year);
        res.status(200).json({ totalIssues });
    } catch (error) {
        console.error('Error computing annual ticket creation:', error);
        res.status(500).send('Server error occurred while computing annual ticket creation.');
    }
});

// Controller method for computing the completion rate of all open PRs in a GitHub repository
router.post('/prCompletionRate', async (req, res) => {
    const { owner, repo, githubToken } = req.body;

    if (!owner || !repo || !githubToken) {
        return res.status(400).send('Missing required parameters: owner, repo, githubToken');
    }

    try {
        // Fetch the completion rate using the provided function
        const completionRate = await computePRCompletionRate(owner, repo, githubToken);

        // Send the completion rate as the response
        res.status(200).json({ completionRate });
    } catch (error) {
        console.error('Error fetching PR completion rate:', error);
        res.status(500).send('Server error occurred while fetching PR completion rate.');
    }
});

router.post('/projectPerformance', async (req, res) => {
    const { owner, repo, githubToken, openaiApiKey } = req.body;

    if (!owner || !repo || !githubToken || !openaiApiKey) {
        return res.status(400).send('Missing required parameters: owner, repo, githubToken, openaiApiKey');
    }
    try {
        // Calculate project performance using the provided function
        const performanceScore = await calculateProjectPerformance(owner, repo, githubToken, openaiApiKey);

        // Send the performance score as the response
        res.status(200).json({ performanceScore });
    } catch (error) {
        console.error('Error calculating project performance:', error);
        res.status(500).send('Server error occurred while calculating project performance.');
    }
});

// API route for analyzing PR comments
router.post('/analyzePRComments', async (req, res) => {
    const { repoOwner, repoName, prNumber, reviewer, githubToken } = req.body;

    if (!repoOwner || !repoName || !prNumber || !reviewer || !githubToken) {
        return res.status(400).send('Missing required parameters: repoOwner, repoName, prNumber, reviewer, githubToken');
    }

    try {
        // Call the analyzePRComments function to analyze PR comments
        const analysisResult = await analyzePRComments(repoOwner, repoName, prNumber, reviewer, githubToken);
        res.status(200).json(analysisResult); // Send the analysis result as the response
    } catch (error) {
        console.error('Error analyzing PR comments:', error);
        res.status(500).send('Server error occurred while analyzing PR comments.');
    }
});

module.exports = router;