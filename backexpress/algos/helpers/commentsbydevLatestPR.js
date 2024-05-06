const axios = require('axios');

/**
 * Fetch all comments made by the developer on their latest pull request in a GitHub repository.
 * @param {string} owner - The owner of the repository.
 * @param {string} repo - The repository name.
 * @param {string} developer - The GitHub username of the developer.
 * @param {string} authToken - Your GitHub access token.
 * @returns {Promise<Array>} A promise that resolves to an array of comments.
 */
async function fetchCommentsByDeveloperOnLatestPR(owner, repo, developer, authToken) {
    try {
        // First, get the latest pull request by the developer
        const prsUrl = `https://api.github.com/repos/${owner}/${repo}/pulls?creator=${developer}&state=all&sort=created&direction=desc&per_page=1`;
        const prsResponse = await axios.get(prsUrl, {
            headers: {
                'Authorization': `token ${authToken}`,
                'User-Agent': 'Node.js'
            }
        });

        if (prsResponse.data.length === 0) {
            return []; // Return an empty array if there are no pull requests
        }

        const latestPR = prsResponse.data[0];

        // Next, get all comments on the latest pull request
        const commentsUrl = latestPR.comments_url;
        const commentsResponse = await axios.get(commentsUrl, {
            headers: {
                'Authorization': `token ${authToken}`,
                'User-Agent': 'Node.js'
            }
        });

        // Filter comments to include only those made by the developer
        const developerComments = commentsResponse.data.filter(comment => comment.user.login === developer);
        
        return developerComments; // Return comments made by the developer
    } catch (error) {
        console.error('Error fetching comments by the developer on the latest PR:', error);
        throw error;
    }
}

module.exports = {
    fetchCommentsByDeveloperOnLatestPR,
}