require("dotenv").config();

const express = require("express");
const router = express.Router();
const token = process.env.GITHUB_API_KEY;
const axios = require('axios');
const { createObjectCsvWriter } = require('csv-writer');

async function countPRReviewsPerDeveloper(owner, repo) {
    let apiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=20`;
    const reviewCounts = {};

    const csvWriter = createObjectCsvWriter({
        path: 'review_counts.csv',
        header: [
            {id: 'developer', title: 'DEVELOPER'},
            {id: 'reviews', title: 'REVIEWS'}
        ],
        append: false // This will overwrite the file with new data on each function call
    });

    while (apiUrl) {
        const prsResponse = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const pullRequests = prsResponse.data;

        for (const pr of pullRequests) {
            console.log("pr", pr.number);
            const reviewsUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${pr.number}/reviews`;

            const reviewsResponse = await axios.get(reviewsUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            const reviews = reviewsResponse.data;
            console.log("reviews", reviews);

            for (const review of reviews) {
                const userLogin = review.user.login;
                reviewCounts[userLogin] = (reviewCounts[userLogin] || 0) + 1;
            }
        }
        break;
        const links = prsResponse.headers['link'];
        const nextLink = links && links.split(',').find(s => s.includes('rel="next"'));
        apiUrl = nextLink ? new URL(nextLink.split(';')[0].trim().slice(1, -1)).toString() : null;
    }

    const records = Object.entries(reviewCounts).map(([developer, reviews]) => ({ developer, reviews }));
    // await csvWriter.writeRecords(records); // Write review counts to CSV

    return records;
}

async function countPRReviewCommentsPerDeveloper(owner, repo) {
    let apiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=20`;
    const commentCounts = {};

    while (apiUrl) {
        const prsResponse = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const pullRequests = prsResponse.data;

        for (const pr of pullRequests) {
            const reviewsUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${pr.number}/reviews`;

            const reviewsResponse = await axios.get(reviewsUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            const reviews = reviewsResponse.data;

            for (const review of reviews) {
                const commentsUrl = review._links.pull_request.href + '/comments';
                
                const commentsResponse = await axios.get(commentsUrl, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });

                const comments = commentsResponse.data;

                for (const comment of comments) {
                    const userLogin = comment.user.login;
                    commentCounts[userLogin] = (commentCounts[userLogin] || 0) + 1;
                }
            }
        }
        break;
        const links = prsResponse.headers['link'];
        const nextLink = links && links.split(',').find(s => s.includes('rel="next"'));
        apiUrl = nextLink ? new URL(nextLink.split(';')[0].trim().slice(1, -1)).toString() : null;
    }

    // Ranking developers based on the number of comments
    const rankedDevelopers = Object.entries(commentCounts)
                                    .map(([developer, comments]) => ({ developer, comments }))
                                    .sort((a, b) => b.comments - a.comments);

    console.log(rankedDevelopers);
    // const csvWriter = createObjectCsvWriter({
    //     path: 'comment_counts.csv',
    //     header: [
    //         {id: 'developer', title: 'DEVELOPER'},
    //         {id: 'comments', title: 'COMMENTS'}
    //     ],
    //     append: false // Overwrite file with new data
    // });

    // await csvWriter.writeRecords(rankedDevelopers); // Write ranked developers to CSV

    return rankedDevelopers;
}

// Express route handler for getting PR review comments count per developer
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

// Express route handler
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


module.exports = router;
