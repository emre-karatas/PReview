const axios = require('axios');

/**
 * Fetch the latest pull request status for a specific developer from a GitHub repository.
 * @param {string} owner - The owner of the repository.
 * @param {string} repo - The repository name.
 * @param {string} developer - The GitHub username of the developer.
 * @param {string} authToken - Your GitHub access token.
 * @returns {Promise<Object>} A promise that resolves to an object containing the pull request status.
 */
async function fetchLatestPRStatus(owner, repo, developer, authToken) {
    try {
        const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&sort=created&direction=desc`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `token ${authToken}`,
                'User-Agent': 'Node.js'
            }
        });

        // Filter PRs by the specified developer and find the latest one
        const latestPR = response.data.find(pr => pr.user.login === developer);
        if (!latestPR) {
            return { message: 'No pull requests found for this developer.' };
        }

        // Retrieve the status of the latest PR
        const statusUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${latestPR.head.sha}/status`;
        const statusResponse = await axios.get(statusUrl, {
            headers: {
                'Authorization': `token ${authToken}`,
                'User-Agent': 'Node.js'
            }
        });

        return {
            pullRequestNumber: latestPR.number,
            status: statusResponse.data.state,
            url: latestPR.html_url
        };
    } catch (error) {
        console.error('Error fetching pull request status:', error);
        throw error;
    }
}

module.exports = {
    fetchLatestPRStatus,
}