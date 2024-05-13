const axios = require('axios');

/**
 * Fetches the total number of comments made by a developer under all PRs in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} developer - The GitHub username of the developer.
 * @param {string} githubToken - Your GitHub personal access token.
 * @returns {Promise<number>} - A promise that resolves to the number of comments made by the developer.
 */
async function fetchTotalPRCommentsByDeveloper(owner, repo, developer, githubToken) {
    const githubHeaders = {
        headers: {
            Authorization: `token ${githubToken}`,
            'User-Agent': 'GitHub API'
        }
    };

    try {
        let totalCommentsCount = 0;
        let page = 1;
        let hasMorePages = true;

        while (hasMorePages) {
            const prsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
                headers: githubHeaders,
                params: {
                    state: 'all',
                    per_page: 100,
                    page: page
                }
            });

            if (prsResponse.data.length === 0) {
                hasMorePages = false;
            } else {
                page++;
                // Fetch comments for each pull request
                for (const pr of prsResponse.data) {
                    const commentsResponse = await axios.get(pr.comments_url, { headers: githubHeaders });
                    const developerComments = commentsResponse.data.filter(comment => comment.user.login === developer);
                    totalCommentsCount += developerComments.length;
                }
            }
        }

        return totalCommentsCount;
    } catch (error) {
        console.error('Error fetching total PR comments by developer:', error);
        throw error;
    }
}

module.exports = fetchTotalPRCommentsByDeveloper;
