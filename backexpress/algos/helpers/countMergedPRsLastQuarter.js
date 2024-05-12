const axios = require('axios');

/**
 * Helper function to calculate the start date of the last quarter.
 * @returns {Date} - The start date of the last quarter.
 */
function getLastQuarterStartDate() {
    const now = new Date();
    const month = now.getMonth();
    const quarterStartMonth = month - (month % 3) - 3; // Calculate the start month of the last quarter
    const start = new Date(now.getFullYear(), quarterStartMonth, 1);
    if (quarterStartMonth < 0) {
        // Adjust for last year if the quarter starts in negative month index
        start.setFullYear(now.getFullYear() - 1);
        start.setMonth(quarterStartMonth + 12);
    }
    return start;
}

/**
 * Counts merged pull requests in the last quarter in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} token - Your GitHub personal access token.
 * @returns {Promise<number>} - A promise that resolves to the number of merged pull requests in the last quarter.
 */
async function countMergedPRsLastQuarter(owner, repo, token) {
    let totalCount = 0;
    let page = 1;
    let hasNextPage = true;
    const lastQuarterStart = getLastQuarterStartDate().toISOString();

    while (hasNextPage) {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
            headers: { Authorization: `token ${token}` },
            params: {
                state: 'closed', // Fetch closed pull requests, as merged PRs are considered closed
                per_page: 100,
                page: page,
                base: 'master' // Optional: specify if targeting a specific branch
            }
        });

        const filteredPRs = response.data.filter(pr => pr.merged_at && new Date(pr.merged_at) >= new Date(lastQuarterStart));
        totalCount += filteredPRs.length;

        hasNextPage = response.data.length === 100; // Continue if there are more pages
        page++;
    }

    return totalCount;
}

module.exports = countMergedPRsLastQuarter;
