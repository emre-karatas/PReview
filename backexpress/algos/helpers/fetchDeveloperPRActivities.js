const axios = require('axios');

/**
 * Gathers information on each developer's activity in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} githubToken - GitHub personal access token.
 * @returns {Promise<Array>} - A promise that resolves to an array of developers' PR activity.
 */
async function fetchDeveloperPRActivities(owner, repo, githubToken) {
    const githubHeaders = {
        headers: {
            Authorization: `token ${githubToken}`,
            Accept: 'application/vnd.github.v3+json'
        }
    };

    try {
        // Fetch all pull requests
        const allPRsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=100`, githubHeaders);
        const allPRs = allPRsResponse.data;

        // Map pull requests by user
        const userPRMap = allPRs.reduce((acc, pr) => {
            acc[pr.user.login] = acc[pr.user.login] || [];
            acc[pr.user.login].push(pr);
            return acc;
        }, {});

        // Collect information for each developer
        const developerActivities = await Promise.all(Object.keys(userPRMap).map(async (username) => {
            const prs = userPRMap[username];
            const prCount = prs.length;
            const latestPR = prs[0]; // Assuming the first one is the latest; check sort order from API

            // Fetch comments for the latest PR
            const commentsResponse = await axios.get(latestPR.comments_url, githubHeaders);
            const userCommentsCount = commentsResponse.data.filter(comment => comment.user.login === username).length;

            return {
                username: username,
                pullRequestCount: prCount,
                latestPRStatus: latestPR.state, // "open", "closed", or "merged"
                commentsOnLatestPR: userCommentsCount
            };
        }));

        return developerActivities;
    } catch (error) {
        console.error('Failed to fetch or process PR activities:', error);
        throw error;
    }
}

module.exports = fetchDeveloperPRActivities;
