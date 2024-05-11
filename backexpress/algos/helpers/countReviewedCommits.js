const axios = require('axios');

/**
 * Counts the number of reviewed commits for a developer in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} developer - The username of the developer.
 * @param {string} token - Your GitHub personal access token.
 * @returns {Promise<number>} - The number of reviewed commits.
 */
async function countReviewedCommits(owner, repo, developer, token) {
    let reviewedCommits = 0;

    try {
        // Fetch commits by the developer
        let commitsResponse;
        let page = 1;
        do {
            commitsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
                headers: { Authorization: `token ${token}` },
                params: {
                    author: developer,
                    per_page: 100,
                    page: page
                }
            });

            for (const commit of commitsResponse.data) {
                // Fetch pull requests associated with each commit
                const prs = await axios.get(commit.commit.url.replace('commits', 'pulls'), {
                    headers: { Authorization: `token ${token}` }
                });

                // Check each PR for reviews
                for (const pr of prs.data) {
                    const reviews = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls/${pr.number}/reviews`, {
                        headers: { Authorization: `token ${token}` }
                    });

                    if (reviews.data.length > 0) {
                        reviewedCommits++;
                        break; // Count each commit only once, even if multiple PRs with reviews
                    }
                }
            }

            page++;
        } while (commitsResponse.data.length === 100);
    } catch (error) {
        console.error('Error counting reviewed commits:', error);
        throw error;
    }

    return reviewedCommits;
}

module.exports = countReviewedCommits;
