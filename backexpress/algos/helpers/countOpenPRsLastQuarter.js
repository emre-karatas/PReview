const axios = require('axios');

/**
 * Counts all open pull requests in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} token - Your GitHub personal access token.
 * @returns {Promise<number>} - A promise that resolves to the number of open pull requests.
 */
async function countAllOpenPRs(owner, repo, token) {
    let totalCount = 0;
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
        try {
         console.log("inside method");
                    console.log(`https://api.github.com/repos/${owner}/${repo}/pulls`);
         console.log("the token", token);

            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
                headers: { Authorization: `token ${token}` },
                params: {
                    state: 'open', // Fetch only open pull requests
                    per_page: 100,
                    page: page
                }
            });


            totalCount += response.data.length; // Add the number of open PRs from this page

            hasNextPage = response.data.length === 100; // Check if there are more pages to fetch
            page++;
        } catch (error) {
            console.error('Error fetching data:', error);
            break; // Exit the loop if an error occurs
        }
    }


    return totalCount;
}

module.exports = countAllOpenPRs;

