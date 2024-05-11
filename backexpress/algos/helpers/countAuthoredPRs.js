const axios = require('axios');

/**
 * Counts the number of pull requests authored by a specific developer in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} developer - The GitHub username of the developer.
 * @param {string} token - Your GitHub personal access token.
 * @returns {Promise<number>} - A promise that resolves to the number of PRs authored by the developer.
 */
async function countAuthoredPRs(owner, repo, developer, token) {
    let totalPRs = 0;
    let page = 1;
    let hasMorePRs = true;

    try {
        while (hasMorePRs) {
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
                headers: { Authorization: `token ${token}` },
                params: {
                    state: 'all', // Include both open and closed PRs
                    per_page: 100,
                    page: page
                }
            });

            if (response.data.length === 0) {
                hasMorePRs = false;
                continue;
            }

            // Filter PRs authored by the specified developer
            const filteredPRs = response.data.filter(pr => pr.user.login === developer);
            totalPRs += filteredPRs.length;

            hasMorePRs = response.data.length === 100; // Check if there are more PRs to fetch
            page++;
        }

        return totalPRs;
    } catch (error) {
        console.error('Error counting PRs authored by the developer:', error);
        throw error;
    }
}

module.exports = countAuthoredPRs;
