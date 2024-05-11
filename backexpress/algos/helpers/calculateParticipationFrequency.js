const axios = require('axios');

/**
 * Calculates the frequency of participation in PR comments by a specific developer in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} developer - The GitHub username of the developer.
 * @param {string} token - Your GitHub personal access token.
 * @returns {Promise<number>} - A promise that resolves to the number of comments made by the developer.
 */
async function calculateDeveloperParticipationFrequency(owner, repo, developer, token) {
    let totalComments = 0;
    let page = 1;
    let hasMorePRs = true;

    try {
        while (hasMorePRs) {
            // Fetch pull requests from the repository
            const prResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
                headers: { Authorization: `token ${token}` },
                params: {
                    state: 'all', // Include both open and closed PRs
                    per_page: 100,
                    page: page
                }
            });

            if (prResponse.data.length === 0) {
                break; // No more PRs to process
            }

            // Process each PR to fetch comments made by the specified developer
            for (const pr of prResponse.data) {
                let commentPage = 1;
                let hasMoreComments = true;

                while (hasMoreComments) {
                    const commentsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/issues/${pr.number}/comments`, {
                        headers: { Authorization: `token ${token}` },
                        params: {
                            per_page: 100,
                            page: commentPage
                        }
                    });

                    commentsResponse.data.forEach(comment => {
                        if (comment.user.login === developer) {
                            totalComments += 1;
                        }
                    });

                    hasMoreComments = commentsResponse.data.length === 100;
                    commentPage++;
                }
            }

            hasMorePRs = prResponse.data.length === 100;
            page++;
        }

        return totalComments;
    } catch (error) {
        console.error('Error calculating participation frequency for the developer:', error);
        throw error;
    }
}

module.exports = calculateDeveloperParticipationFrequency;
