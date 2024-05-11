const axios = require('axios');

/**
 * Fetches all comments made by a specific developer under a PR in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {number} prNumber - The pull request number.
 * @param {string} developer - The username of the developer.
 * @param {string} token - Your GitHub personal access token.
 * @returns {Promise<Array>} - A promise that resolves to an array of comments.
 */
async function fetchPRCommentsByDeveloper(owner, repo, prNumber, developer, token) {
    let allComments = [];
    let page = 1;
    let hasNextPage = true;

    try {
        while (hasNextPage) {
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/issues/${prNumber}/comments`, {
                headers: { Authorization: `token ${token}` },
                params: {
                    per_page: 100,
                    page: page
                }
            });

            // Filter comments by the developer
            const filteredComments = response.data.filter(comment => comment.user.login === developer);
            allComments = allComments.concat(filteredComments);

            hasNextPage = response.data.length === 100; // Check if there are more pages
            page++;
        }

        return allComments;
    } catch (error) {
        console.error('Error fetching PR comments:', error);
        throw error;
    }
}

module.exports = fetchPRCommentsByDeveloper;
