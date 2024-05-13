const axios = require('axios');

/**
 * Fetches the number of pull requests created by a specific developer in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} developer - The GitHub username of the developer.
 * @param {string} githubToken - Your GitHub personal access token.
 * @returns {Promise<number>} - A promise that resolves to the number of pull requests made by the developer.
 */
async function fetchPRCountByDeveloper(owner, repo, developer, githubToken) {
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls`;
    const headers = {
        Authorization: `token ${githubToken}`,
        'User-Agent': 'GitHub API Request'
    };

    try {
        let page = 1;
        let totalCount = 0;
        let hasMore = true;

        // Loop through all pages of results
        while (hasMore) {
            const response = await axios.get(url, {
                headers: headers,
                params: {
                    state: 'all', // 'all', 'open', or 'closed'
                    per_page: 100,
                    page: page,
                    creator: developer // Filter PRs by the creator
                }
            });

            totalCount += response.data.length;
            page++;

            // Check if we've paginated through all available PRs
            if (response.data.length < 100) {
                hasMore = false;
            }
        }

        return totalCount;
    } catch (error) {
        console.error('Failed to fetch PR count:', error);
        throw error; // or handle more gracefully if needed
    }
}

module.exports = fetchPRCountByDeveloper;
