const axios = require('axios');

/**
 * Fetches all developers (contributors) of a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} token - Your GitHub personal access token.
 * @returns {Promise<Array>} - A promise that resolves to an array of contributors.
 */
async function getAllDevelopers(owner, repo, token) {
    let contributors = [];
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
        try {
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`, {
                headers: { Authorization: `token ${token}` },
                params: {
                    per_page: 100,
                    page: page,
                    anon: 'true'  // Include anonymous contributors in the results
                }
            });

            contributors = contributors.concat(response.data);

            hasNextPage = response.data.length === 100; // Continue if there are more pages to fetch
            page++;
        } catch (error) {
            console.error('Error fetching contributors:', error);
            break; // Exit the loop if an error occurs
        }
    }

    return contributors;
}

module.exports = getAllDevelopers;
