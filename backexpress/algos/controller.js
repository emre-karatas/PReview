require("dotenv").config();

const express = require("express");
const router = express.Router();
const token = process.env.GITHUB_API_KEY;
const axios = require('axios');

async function countPRReviewsPerDeveloper(owner, repo, token) {
    let apiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=100`;
    const reviewCounts = {};

    while (apiUrl) {
        const prsResponse = await axios.get(apiUrl, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const pullRequests = prsResponse.data; // Directly access the data property

        for (const pr of pullRequests) {
            console.log("pr",pr);

            const reviewsUrl = pr._links.reviews.href;

            const reviewsResponse = await axios.get(reviewsUrl, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            const reviews = reviewsResponse.data; // Directly access the data property

            for (const review of reviews) {
                const userLogin = review.user.login;
                reviewCounts[userLogin] = (reviewCounts[userLogin] || 0) + 1;
            }
        }

        // Handling pagination to get the next page URL
        const links = prsResponse.headers['link'];
        const nextLink = links && links.split(',').find(s => s.includes('rel="next"'));
        apiUrl = nextLink ? new URL(nextLink.split(';')[0].trim().slice(1, -1)).toString() : null;
    }

    return reviewCounts;
}

router.post('/countPRReviews', async (req, res) => {
    const { owner, repo } = req.body;
    if (!owner || !repo) {
        return res.status(400).send('Missing required parameters: owner and/or repo');
    }
    try {
        const reviewCounts = await countPRReviewsPerDeveloper(owner, repo, token);
        res.json(reviewCounts);
    } catch (error) {
        console.error('Error axios.geting PR reviews:', error);
        res.status(500).send('Server error occurred while axios.geting PR reviews.');
    }
});

module.exports = router;
