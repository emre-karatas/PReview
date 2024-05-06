const axios = require('axios');

/**
 * Fetch the number of files changed in the latest pull request from a GitHub repository.
 * @param {string} owner - The owner of the repository.
 * @param {string} repo - The repository name.
 * @param {string} authToken - Your GitHub access token.
 * @returns {Promise<number>} A promise that resolves to the number of files changed in the latest pull request.
 */

async function fetchNumberOfChangedFilesInLatestPR(owner, repo, authToken) {
    try {
        // First, get the latest pull request
        const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&sort=created&direction=desc&per_page=1`;
        const prsResponse = await axios.get(url, {
            headers: {
                'Authorization': `token ${authToken}`,
                'User-Agent': 'Node.js'
            }
        });

        if (prsResponse.data.length === 0) {
            return 0; // Return 0 if there are no pull requests
        }

        const latestPR = prsResponse.data[0];

        // Next, get the number of files changed in the latest pull request
        const prDetailUrl = latestPR.url; // URL to the specific PR detail
        const prDetailResponse = await axios.get(prDetailUrl, {
            headers: {
                'Authorization': `token ${authToken}`,
                'User-Agent': 'Node.js'
            }
        });

        return prDetailResponse.data.changed_files; // Return the number of changed files
    } catch (error) {
        console.error('Error fetching number of files changed in the latest PR:', error);
        throw error;
    }
}

module.exports = {
    fetchNumberOfChangedFilesInLatestPR,
}