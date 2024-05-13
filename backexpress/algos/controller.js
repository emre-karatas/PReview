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
const analyzeCommentTone = require("./helpers/analyzeCommentTone");
const fetchDeveloperPRActivities = require('./helpers/fetchDeveloperPRActivities');
const fetchLatestPRComments = require('./helpers/fetchLatestPRComments');


// API route for fetching getTotalPRCommentsByDeveloper
router.post('/getLatestPRComments', async (req, res) => {
    const { org, username, developer, authToken } = req.body;
        console.log("inside fetchLatestPRComments " );

        console.log("req.body.repoOwner " , req.body.owner);
        console.log("req " , req.body);

        console.log("req.body.repoName " , req.body.repo);

        console.log("the authToken should work " , authToken);


    if (!req.body.owner || !req.body.repo || !authToken) {
        return res.status(400).send('Missing required parameters: org, username, authToken');
    }
    try {
        const teams = await fetchLatestPRComments(req.body.owner, req.body.repo, developer, authToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching fetchLatestPRComments:', error);
        res.status(500).send('Server error occurred while fetchLatestPRComments.');
    }
});



// API route for fetching getTotalPRCommentsByDeveloper
router.post('/fetchDeveloperPRActivities', async (req, res) => {
    const { org, username, developer, authToken } = req.body;
        console.log("inside fetchDeveloperPRActivities " );

        console.log("req.body.repoOwner " , req.body.owner);
        console.log("req " , req.body);

        console.log("req.body.repoName " , req.body.repo);

        console.log("the authToken should work " , authToken);


    if (!req.body.owner || !req.body.repo || !authToken) {
        return res.status(400).send('Missing required parameters: org, username, authToken');
    }
    try {
        const teams = await fetchDeveloperPRActivities(req.body.owner, req.body.repo, authToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching fetchDeveloperPRActivities:', error);
        res.status(500).send('Server error occurred while fetchDeveloperPRActivities.');
    }
});


// API route for fetching getTotalPRCommentsByDeveloper
router.post('/getTotalPRCommentsByDeveloper', async (req, res) => {
    const { org, username, developer, authToken } = req.body;
        console.log("inside getTotalPRCommentsByDeveloper " );

        console.log("req.body.repoOwner " , req.body.owner);
        console.log("req " , req.body);

        console.log("req.body.repoName " , req.body.repo);

        console.log("the authToken should work " , authToken);


    if (!req.body.owner || !req.body.repo || !authToken) {
        return res.status(400).send('Missing required parameters: org, username, authToken');
    }
    try {
        const teams = await fetchTotalPRCommentsByDeveloper(req.body.owner, req.body.repo, developer, authToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching getTotalPRCommentsByDeveloper:', error);
        res.status(500).send('Server error occurred while getTotalPRCommentsByDeveloper.');
    }
});


// API route for fetching getFetchPRCommentFrequency
router.post('/getFetchPRCommentFrequency', async (req, res) => {
    const { org, username, developer, authToken } = req.body;
        console.log("inside getFetchPRCommentFrequency " );

        console.log("req.body.repoOwner " , req.body.owner);
        console.log("req " , req.body);

        console.log("req.body.repoName " , req.body.repo);

        console.log("authToken " , authToken);


    if (!req.body.owner || !req.body.repo || !authToken) {
        return res.status(400).send('Missing required parameters: org, username, authToken');
    }
    try {
        const teams = await fetchPRCommentFrequency(req.body.owner, req.body.repo, developer, authToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching fetchPRCommentFrequency:', error);
        res.status(500).send('Server error occurred while fetchPRCommentFrequency.');
    }
});



// API route for fetching fetchReviewedCommitsCount
router.post('/getReviewedCommitsCount', async (req, res) => {
    const { org, username, developer, authToken } = req.body;
        console.log("inside fetchReviewedCommitsCount " );

        console.log("req.body.repoOwner " , req.body.owner);
        console.log("req " , req.body);

        console.log("req.body.repoName " , req.body.repo);

        console.log("authToken " , authToken);


    if (!req.body.owner || !req.body.repo || !authToken) {
        return res.status(400).send('Missing required parameters: org, username, authToken');
    }
    try {
        const teams = await fetchReviewedCommitsCount(req.body.owner, req.body.repo, developer, authToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching fetchReviewedCommitsCount:', error);
        res.status(500).send('Server error occurred while fetchReviewedCommitsCount.');
    }
});


// API route for fetching getAllPullRequests
router.post('/getPRCountByDeveloper', async (req, res) => {
    const { org, username, developer, authToken } = req.body;
        console.log("inside fetchPRCountByDeveloper " );

        console.log("req.body.repoOwner " , req.body.owner);
        console.log("req " , req.body);

        console.log("req.body.repoName " , req.body.repo);

        console.log("authToken " , authToken);


    if (!req.body.owner || !req.body.repo || !authToken) {
        return res.status(400).send('Missing required parameters: org, username, authToken');
    }
    try {
        const teams = await fetchPRCountByDeveloper(req.body.owner, req.body.repo, developer, authToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching fetchPRCountByDeveloper:', error);
        res.status(500).send('Server error occurred while fetchPRCountByDeveloper.');
    }
});


// API route for fetching getAllPullRequests
router.post('/getAllPullRequests', async (req, res) => {
    const { org, username, authToken, openaiApiKey } = req.body;
        console.log("inside getAllPullRequests " );

        console.log("req.body.repoOwner " , req.body.owner);
        console.log("req " , req.body);

        console.log("req.body.repoName " , req.body.repo);

        console.log("authToken " , authToken);


    if (!req.body.owner || !req.body.repo || !authToken) {
        return res.status(400).send('Missing required parameters: org, username, authToken');
    }
    try {
        const teams = await getAllPullRequests(req.body.owner, req.body.repo, authToken);
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
        return res.status(400).send('Missing required parameters: org, username, authToken');
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
router.post('/getAllDeveloperss', async (req, res) => {
    const { org, username, authToken } = req.body;

            console.log("inside getAllDeveloperss " );

        console.log("req.body.repoOwner " , req.body.owner);
        console.log("req " , req.body);

        console.log("req.body.repoName " , req.body.repo);

        console.log("authToken " , authToken);
    if (!req.body.owner || !req.body.repo || !authToken) {
        return res.status(400).send('Missing required parameters: org, username, authToken');
    }
    try {
        const teams = await getAllDevelopers(req.body.owner, req.body.repo, authToken);
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
    const { org, username, authToken } = req.body;

        console.log("req", req.body)
        let owner = req.body.owner;
        let repo = req.body.repo;

        console.log("The repo", repo);
        console.log("The owner", owner);

        console.log("The authToken", authToken);
    if (!owner || !repo || !authToken) {
        return res.status(400).send('Missing required parameters: org, username, authToken');
    }
    try {
        const teams = await countOpenPRsLastQuarter(owner, repo, authToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching openPrCntLastQuarter:', error);
        res.status(500).send('Server error occurred while openPrCntLastQuarter.');
    }
});


// API route for fetching countMergedPRsLastQuarter
router.post('/mergedPrCntLastQuarter', async (req, res) => {
    const { org, username, authToken } = req.body;

        console.log("req", req.body)
        let owner = req.body.owner;
                let repo = req.body.repo;

        console.log("The repo", repo);
        console.log("The owner", owner);

        console.log("The authToken", authToken);

    if (!req.body.repo || !req.body.owner || !authToken) {
        return res.status(400).send('Missing required parameters: org, username, authToken');
    }
    try {
        const teams = await countMergedPRsLastQuarter( owner, repo, authToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching countMergedPRsLastQuarter:', error);
        res.status(500).send('Server error occurred while fetchingcountMergedPRsLastQuarter.');
    }
});

// API route for fetching the teams a user belongs to
router.post('/userTeams', async (req, res) => {
    const { org, username, authToken } = req.body;
    if (!org || !username || !authToken) {
        return res.status(400).send('Missing required parameters: org, username, authToken');
    }
    try {
        const teams = await fetchUserTeams(org, username, authToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching user teams:', error);
        res.status(500).send('Server error occurred while fetching user teams.');
    }
});



// API route for fetching the teams a user belongs to
router.post('/prCountLastQuarter', async (req, res) => {
    const { owner, repo, authToken } = req.body;
    
    if (!owner || !repo || !authToken) {
        return res.status(400).send('Missing required parameters: org, username, authToken');
    }
    try {
        const teams = await countPRsLastQuarter(owner, repo, authToken);
        res.status(200).json({ teams });
    } catch (error) {
        console.error('Error fetching user teams:', error);
        res.status(500).send('Server error occurred while fetching user teams.');
    }
});



// API route for fetching the latest PR title
router.post('/latestPRTitle', async (req, res) => {
    const { owner, repo, authToken } = req.body;
    if (!owner || !repo || !authToken) {
        return res.status(400).send('Missing required parameters: owner, repo, authToken');
    }
    try {
        const title = await fetchLatestPullRequestTitle(owner, repo, authToken);
        res.status(200).json({ title });
    } catch (error) {
        console.error('Error fetching the latest PR title:', error);
        res.status(500).send('Server error occurred while fetching the latest PR title.');
    }
});


// API route for fetching the total line of code
router.post('/getTotalLinesOfCode', async (req, res) => {
    const { owner, repo, authToken } = req.body;
    console.log("the owner ", owner);
        console.log("the repo ", repo);

    console.log("the authToken ", authToken);

    if (!owner || !repo || !authToken) {
        return res.status(400).send('Missing required parameters: owner, repo, authToken');
    }
    try {
        const title = await getTotalLinesOfCode(owner, repo, authToken);
        res.status(200).json({ title });
    } catch (error) {
        console.error('Error fetching the total line of code:', error);
        res.status(500).send('Server error occurred while fetching the total line of code.');
    }
});

// API route for fetching the total no of commits
router.post('/getCommitCount', async (req, res) => {
    const { owner, repo, authToken } = req.body;
    if (!owner || !repo || !authToken) {
        return res.status(400).send('Missing required parameters: owner, repo, authToken');
    }
    try {
        const title = await countCommits(owner, repo, authToken);
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
    const { owner, repo, authToken } = req.body;
    if (!owner || !repo || !authToken) {
        return res.status(400).send('Missing required parameters: owner, repo, authToken');
    }
    try {
        const title = await countAllPRs(owner, repo, authToken);
        res.status(200).json({ title });
    } catch (error) {
        console.error('Error fetching counting all prs:', error);
        res.status(500).send('Server error occurred while fetching counting all prs.');
    }
});



// API route for fetching the latest PR status of a developer
router.post('/latestPRStatus', async (req, res) => {
    const { owner, repo, developer, authToken } = req.body;
    if (!owner || !repo || !developer || !authToken) {
        return res.status(400).send('Missing required parameters: owner, repo, developer, authToken');
    }
    try {
        const prStatus = await fetchLatestPRStatus(owner, repo, developer, authToken);
        res.status(200).json(prStatus);
    } catch (error) {
        console.error('Error fetching latest PR status:', error);
        res.status(500).send('Server error occurred while fetching the latest PR status.');
    }
});

// Pull Request review count per developer - ranking
router.post('/countPRReviews', async (req, res) => {
    const { owner, repo, token } = req.body; // Ensure token is passed in the body or through some secure means
    if (!owner || !repo) {
        return res.status(400).send('Missing required parameters: owner, repo');
    }
    try {
        const reviewCounts = await countPRReviewsPerDeveloper(owner, repo, token);
        res.status(200).json({review: reviewCounts});
    } catch (error) {
        console.error('Error getting PR reviews:', error);
        res.status(500).send('Server error occurred while getting PR reviews.');
    }
});


// Pull request review comments count per developer - ranking
router.post('/countPRReviewComments', async (req, res) => {
    const { owner, repo, token } = req.body;
    if (!owner || !repo ) {
        return res.status(400).send('Missing required parameters: owner or/and repo');
    }
    try {
        const rankedDevelopers = await countPRReviewCommentsPerDeveloper(owner, repo, token);
        res.status(200).json({ranked: rankedDevelopers});
    } catch (error) {
        console.error('Error getting PR review comments:', error);
        res.status(500).send('Server error occurred while getting PR review comments.');
    }
});

// API route for fetching the number of files changed in the latest PR
router.post('/numberChangedFilesInLatestPR', async (req, res) => {
    const { owner, repo, authToken } = req.body;
    if (!owner || !repo || !authToken) {
        return res.status(400).send('Missing required parameters: owner, repo, authToken');
    }
    try {
        const changedFiles = await fetchNumberOfChangedFilesInLatestPR(owner, repo, authToken);
        res.status(200).json({ changedFiles });
    } catch (error) {
        console.error('Error fetching number of changed files in latest PR:', error);
        res.status(500).send('Server error occurred while fetching changed files.');
    }
});

// API route for fetching all contributors
router.post('/allContributors', async (req, res) => {
    const { owner, repo, authToken } = req.body;
    if (!owner || !repo || !authToken) {
        return res.status(400).send('Missing required parameters: owner, repo, authToken');
    }
    try {
        const contributors = await fetchAllContributors(owner, repo, authToken);
        res.status(200).json({ contributors });
    } catch (error) {
        console.error('Error fetching all contributors:', error);
        res.status(500).send('Server error occurred while fetching contributors.');
    }
});

// API route for fetching comments made by the developer on their latest PR
router.post('/commentsOnLatestPR', async (req, res) => {
    const { owner, repo, developer, authToken } = req.body;
    if (!owner || !repo || !developer || !authToken) {
        return res.status(400).send('Missing required parameters: owner, repo, developer, authToken');
    }
    try {
        const comments = await fetchCommentsByDeveloperOnLatestPR(owner, repo, developer, authToken);
        res.status(200).json({ comments });
    } catch (error) {
        console.error('Error fetching comments by the developer on latest PR:', error);
        res.status(500).send('Server error occurred while fetching comments.');
    }
});

router.post('/average-pr-time', async (req, res) => {
    const { owner, repo } = req.body;

    if (!owner || !repo ) {
        return res.status(400).send('Missing required parameters: owner, repo, or token');
    }

    const config = {
        headers: { Authorization: `Bearer ${token}` },
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
    const { owner, repo, year, authToken } = req.body;
    if (!owner || !repo || !year || !authToken) {
        return res.status(400).send('Missing required parameters: owner, repo, year, authToken');
    }
    try {
        const totalIssues = await computeAnnualTicketCreation(owner, repo, authToken, year);
        res.status(200).json({ totalIssues });
    } catch (error) {
        console.error('Error computing annual ticket creation:', error);
        res.status(500).send('Server error occurred while computing annual ticket creation.');
    }
});

// Controller method for computing the completion rate of all open PRs in a GitHub repository
router.post('/prCompletionRate', async (req, res) => {
    const { owner, repo, authToken } = req.body;

    if (!owner || !repo || !authToken) {
        return res.status(400).send('Missing required parameters: owner, repo, authToken');
    }

    try {
        // Fetch the completion rate using the provided function
        console.log("PR COMPLETION CONTROLLER")
        const completionRate = await computePRCompletionRate(owner, repo, authToken);

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


module.exports = router;