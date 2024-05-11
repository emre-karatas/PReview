const axios = require('axios');

/**
 * Gets the total lines of code in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} token - Your GitHub personal access token.
 * @returns {Promise<number>} - The total lines of code in the repository.
 */
async function getTotalLinesOfCode(owner, repo, token) {
    try {
        const config = {
            headers: { Authorization: `token ${token}` },
            params: {
                per_page: 100 // Adjust as needed, depending on the repository size
            }
        };

        // GitHub API endpoint for fetching repo languages
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/languages`;

        const response = await axios.get(apiUrl, config);
        const languages = response.data;

        let totalLinesOfCode = 0;
        // The API returns the number of bytes of code written in each language
        for (const [language, bytes] of Object.entries(languages)) {
            console.log(`${language}: ${bytes} bytes`); // Optionally log bytes per language
            totalLinesOfCode += bytes; // Summing bytes for a simple total
        }

        return totalLinesOfCode;
    } catch (error) {
        console.error('Error fetching repository data:', error);
        throw error; // Rethrow or handle as needed
    }
}

module.exports = getTotalLinesOfCode;
