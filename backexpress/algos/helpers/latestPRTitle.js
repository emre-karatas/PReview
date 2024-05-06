const axios = require('axios');

/**
 * Fetch the title of the latest pull request from a GitHub repository.
 * @param {string} owner - The owner of the repository.
 * @param {string} repo - The repository name.
 * @param {string} authToken - Your GitHub access token.
 * @returns {Promise<string>} A promise that resolves to the title of the latest pull request.
 */
async function fetchLatestPullRequestTitle(owner, repo, authToken) {
    try {
        const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&sort=created&direction=desc&per_page=1`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `token ${authToken}`,
                'User-Agent': 'Node.js'
            }
        });

        if (response.data.length === 0) {
            return 'No pull requests found.';
        }

        return response.data[0].title; // Return the title of the latest pull request
    } catch (error) {
        console.error('Error fetching the latest pull request title:', error);
        throw error;
    }
}

module.exports = {
    fetchLatestPullRequestTitle,
}