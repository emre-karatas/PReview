const axios = require('axios');

/**
 * Counts the total number of pull requests ever created (both open and closed) in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} token - Your GitHub personal access token.
 * @returns {Promise<number>} - A promise that resolves to the total number of pull requests.
 */
async function countAllPRs(owner, repo, token) {
    let totalCount = 0;
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
            headers: { Authorization: `token ${token}` },
            params: {
                state: 'all', // Fetch both open and closed pull requests
                per_page: 100,
                page: page
            }
        });

        totalCount += response.data.length;
        hasNextPage = response.data.length === 100; // Continue if there are more pages
        page++;
    }

    return totalCount;
}

module.exports = countAllPRs;
