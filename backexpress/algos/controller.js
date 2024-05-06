require("dotenv").config();
const express = require("express");
const router = express.Router();
const token = process.env.GITHUB_API_KEY;
const axios = require('axios');
const { countPRReviewsPerDeveloper, countPRReviewCommentsPerDeveloper} = require('./helpers/countPR');

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