const axios = require('axios');

/**
 * Fetches the number of reviewed commits made by a developer in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} developer - The GitHub username of the developer.
 * @param {string} githubToken - Your GitHub personal access token.
 * @returns {Promise<number>} - A promise that resolves to the number of reviewed commits.
 */
async function fetchReviewedCommitsCount(owner, repo, developer, githubToken) {
    const githubHeaders = {
        headers: { Authorization: `token ${githubToken}`, 'User-Agent': 'GitHub API' }
    };

    try {
        // Get all pull requests by the developer
        const prsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls?state=all&creator=${developer}`, githubHeaders);
        const prs = prsResponse.data;

        let reviewedCommitsCount = 0;

        // Filter pull requests to find those that have been reviewed
        const reviewedPRs = prs.filter(pr => pr.state === 'closed' && pr.merged_at !== null);

        // Count commits for each reviewed pull request
        for (const pr of reviewedPRs) {
            const commitsResponse = await axios.get(pr.commits_url, githubHeaders);
            reviewedCommitsCount += commitsResponse.data.length;
        }

        return reviewedCommitsCount;
    } catch (error) {
        console.error('Error fetching reviewed commits:', error);
        throw error;
    }
}

module.exports = fetchReviewedCommitsCount;
