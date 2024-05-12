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
const { fetchTotalLinesOfCodes } = require('./helpers/getTotalLinesOfCode');
const { fetchCountCommits } = require('./helpers/countCommits');
const { fetchProductivity } = require('./helpers/calculateProjectProductivity');



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
    if (!owner || !repo || !authToken) {
        return res.status(400).send('Missing required parameters: owner, repo, authToken');
    }
    try {
        const title = await fetchTotalLinesOfCodes(owner, repo, authToken);
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
        const title = await fetchCountCommits(owner, repo, authToken);
        res.status(200).json({ title });
    } catch (error) {
        console.error('Error fetching no of commits:', error);
        res.status(500).send('Server error occurred while fetching the no of commits.');
    }
});


// API route for fetching productivity
router.post('/getProductivity', async (req, res) => {
    const { owner, repo, authToken } = req.body;
    if (!owner || !repo || !authToken) {
        return res.status(400).send('Missing required parameters: owner, repo, authToken');
    }
    try {
        const title = await fetchProductivity(owner, repo, githubToken, openaiApiKey);
        res.status(200).json({ title });
    } catch (error) {
        console.error('Error fetching productivity:', error);
        res.status(500).send('Server error occurred while fetching productivity.');
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
    const { owner, repo } = req.body; // Ensure token is passed in the body or through some secure means
    if (!owner || !repo) {
        return res.status(400).send('Missing required parameters: owner, repo');
    }
    try {
        const reviewCounts = await countPRReviewsPerDeveloper(owner, repo);
        res.status(200).json({review: reviewCounts});
    } catch (error) {
        console.error('Error getting PR reviews:', error);
        res.status(500).send('Server error occurred while getting PR reviews.');
    }
});


// Pull request review comments count per developer - ranking
router.post('/countPRReviewComments', async (req, res) => {
    const { owner, repo } = req.body;
    if (!owner || !repo ) {
        return res.status(400).send('Missing required parameters: owner or/and repo');
    }
    try {
        const rankedDevelopers = await countPRReviewCommentsPerDeveloper(owner, repo);
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


module.exports = router;