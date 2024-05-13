const axios = require('axios');

/**
 * Calculates the frequency of participation in PR comments by a developer in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} developer - The GitHub username of the developer.
 * @param {string} githubToken - Your GitHub personal access token.
 * @returns {Promise<number>} - A promise that resolves to the number of comments made by the developer.
 */
async function fetchPRCommentFrequency(owner, repo, developer, githubToken) {
    const githubHeaders = {
        headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    };

    try {
        // Fetch all pull requests from the repository
        let allCommentsCount = 0;
        let developerCommentsCount = 0;
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
                // Process each pull request to count comments
                for (const pr of prsResponse.data) {
                    const commentsUrl = pr.comments_url;
                    const commentsResponse = await axios.get(commentsUrl, { headers: githubHeaders });
                    allCommentsCount += commentsResponse.data.length;
                    const developerComments = commentsResponse.data.filter(comment => comment.user.login === developer);
                    developerCommentsCount += developerComments.length;
                }
            }
            break;
        }

        // Calculate the frequency of participation
        const participationFrequency = allCommentsCount > 0 ? (developerCommentsCount / allCommentsCount) * 100 : 0;
        return {
            totalComments: allCommentsCount,
            developerComments: developerCommentsCount,
            participationFrequency
        };
    } catch (error) {
        console.error('Error fetching PR comment frequency:', error);
        throw error;
    }
}

module.exports = fetchPRCommentFrequency;
