const axios = require('axios');

/**
 * Counts all merged pull requests in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} token - Your GitHub personal access token.
 * @returns {Promise<number>} - A promise that resolves to the number of merged pull requests.
 */
async function countAllMergedPRs(owner, repo, token) {
    let totalCount = 0;
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
        try {
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
                headers: { Authorization: `token ${token}` },
                params: {
                    state: 'closed', // Fetch closed pull requests, as merged PRs are considered closed
                    per_page: 100,
                    page: page,
                }
            });

            // Filter to count only merged PRs
            const filteredPRs = response.data.filter(pr => pr.merged_at);
            totalCount += filteredPRs.length;

            hasNextPage = response.data.length === 100; // Continue if there are more pages
            page++;
        } catch (error) {
            console.error('Error fetching data:', error);
            break; // Exit the loop if an error occurs
        }
    }

    return totalCount;
}

module.exports = countAllMergedPRs;
