const axios = require('axios');

/**
 * Fetch the teams a user belongs to within a GitHub organization.
 * @param {string} org - The organization name.
 * @param {string} username - The GitHub username of the user.
 * @param {string} authToken - Your GitHub access token.
 * @returns {Promise<Array>} A promise that resolves to an array of teams the user belongs to.
 */
async function fetchUserTeams(org, username, authToken) {
    try {
        const url = `https://api.github.com/orgs/${org}/memberships/${username}`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `token ${authToken}`,
                'User-Agent': 'Node.js'
            }
        });
        return response.data.teams;
    } catch (error) {
        console.error('Error fetching user teams:', error);
        throw error;
    }
}

module.exports = {
    fetchUserTeams,
}