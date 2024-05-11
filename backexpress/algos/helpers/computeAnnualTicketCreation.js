const axios = require('axios');

/**
 * Computes the number of issues created in a given year in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} token - Your GitHub personal access token.
 * @param {number} year - The year for which to count the issues.
 * @returns {Promise<number>} - The number of issues created in the specified year.
 */
async function computeAnnualTicketCreation(owner, repo, token, year) {
    const config = {
        headers: { Authorization: `token ${token}` },
        params: {
            state: 'all', // Include both open and closed issues
            since: `${year}-01-01T00:00:00Z`, // ISO 8601 format
            per_page: 100
        }
    };

    let totalIssues = 0;
    let page = 1;
    let issuesFetched;

    try {
        do {
            // Update the page number for each request
            config.params.page = page;

            // Fetch issues from GitHub
            const issuesUrl = `https://api.github.com/repos/${owner}/${repo}/issues`;
            const response = await axios.get(issuesUrl, config);
            issuesFetched = response.data;

            // Count issues created within the specified year
            issuesFetched.forEach(issue => {
                const createdAt = new Date(issue.created_at);
                if (createdAt.getFullYear() === year) {
                    totalIssues++;
                }
            });

            page++;
        } while (issuesFetched.length !== 0); // Continue fetching until there are no more pages

        return totalIssues;
    } catch (error) {
        console.error('Error fetching issues data:', error);
        throw error;
    }
}

module.exports = computeAnnualTicketCreation;
