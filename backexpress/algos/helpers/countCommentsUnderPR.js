const axios = require('axios');

/**
 * Counts the number of comments made under a specific pull request in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {number} prNumber - The pull request number.
 * @param {string} token - Your GitHub personal access token.
 * @returns {Promise<number>} - A promise that resolves to the number of comments.
 */
async function countCommentsUnderPR(owner, repo, prNumber, token) {
    try {
        let totalComments = 0;
        let page = 1;
        let hasMoreComments = true;

        while (hasMoreComments) {
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/issues/${prNumber}/comments`, {
                headers: { Authorization: `token ${token}` },
                params: {
                    per_page: 100,
                    page: page
                }
            });

            totalComments += response.data.length;
            hasMoreComments = response.data.length === 100; // Continue if there are more comments to fetch
            page++;
        }

        return totalComments;
    } catch (error) {
        console.error('Error fetching PR comments:', error);
        throw error;
    }
}

module.exports = countCommentsUnderPR;
