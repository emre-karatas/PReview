const axios = require('axios');

/**
 * Helper function to calculate the start date of the current year.
 * @returns {Date} - The start date of the current year.
 */
function getStartOfYearDate() {
    const now = new Date();
    return new Date(now.getFullYear(), 0, 1); // January 1st of the current year
}

/**
 * Counts pull requests opened since the beginning of the current year in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} token - Your GitHub personal access token.
 * @returns {Promise<number>} - A promise that resolves to the number of pull requests opened since the beginning of the year.
 */
async function countPRsLastQuarter(owner, repo, token) {
    let totalCount = 0;
    let page = 1;
    let hasNextPage = true;
    const startOfYear = getStartOfYearDate().toISOString();

    while (hasNextPage) {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=20`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            },
        });

        response.data.forEach(pr => {
            const prCreatedAt = new Date(pr.created_at);
            if (prCreatedAt >= new Date(startOfYear)) {
                totalCount++;
            }
        });

        hasNextPage = response.data.length === 100; // Continue if there are more pages
        break;
        page++;
    }

    return totalCount;
}

module.exports = countPRsLastQuarter;
