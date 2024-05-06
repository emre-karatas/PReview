const axios = require('axios');

/**
 * Fetch all contributors from a given GitHub repository.
 * @param {string} owner - The owner of the repository.
 * @param {string} repo - The repository name.
 * @param {string} authToken - Your GitHub access token.
 * @returns {Promise<Array>} A promise that resolves to an array of contributor objects.
 */

async function fetchAllContributors(owner, repo, authToken) {
    try {
        const contributors = [];
        let page = 1;
        while (true) {
            const url = `https://api.github.com/repos/${owner}/${repo}/contributors?page=${page}&per_page=100`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `token ${authToken}`,
                    'User-Agent': 'Node.js'
                }
            });

            if (response.data.length === 0) {
                break;
            }

            contributors.push(...response.data);
            page++;
        }
        return contributors;
    } catch (error) {
        console.error('Error fetching contributors:', error);
        throw error;
    }
}

module.exports = {
    fetchAllContributors,
}
