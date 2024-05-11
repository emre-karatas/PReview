const axios = require('axios');

/**
 * Counts the number of commits in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} token - Your GitHub personal access token.
 * @returns {Promise<number>} - The total number of commits.
 */
async function countCommits(owner, repo, token) {
    let totalCommits = 0;
    let page = 1;
    let hasNextPage = true;

    try {
        while (hasNextPage) {
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
                headers: { Authorization: `token ${token}` },
                params: {
                    per_page: 100,
                    page: page
                }
            });

            totalCommits += response.data.length;
            hasNextPage = response.data.length === 100; // Continue if a full page of commits is returned
            page++;
        }

        return totalCommits;
    } catch (error) {
        console.error('Error fetching commit data:', error);
        throw error;
    }
}

module.exports = countCommits;
