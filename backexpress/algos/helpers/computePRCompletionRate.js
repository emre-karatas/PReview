const axios = require('axios');

/**
 * Computes the completion rate of all open PRs in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} token - Your GitHub personal access token.
 * @returns {Promise<number>} - The completion rate of open PRs.
 */
async function computePRCompletionRate(owner, repo, token) {
    const config = {
        headers: { Authorization: `token ${token}` },
        params: { state: 'open' } // Fetch only open PRs
    };

    try {
        // Fetch open PRs
        const prsUrl = `https://api.github.com/repos/${owner}/${repo}/pulls`;
        const prsResponse = await axios.get(prsUrl, config);
        const openPRs = prsResponse.data;

        if (openPRs.length === 0) {
            console.log('No open PRs to process.');
            return 100; // If there are no open PRs, the completion rate is 100%.
        }

        let readyToMergeCount = 0;

        // Check each PR for merge readiness
        for (const pr of openPRs) {
            const reviewsUrl = pr.url + '/reviews';
            const reviewsResponse = await axios.get(reviewsUrl, config);
            const reviews = reviewsResponse.data;

            const isReadyToMerge = reviews.some(review => review.state === 'APPROVED');
            if (isReadyToMerge) {
                readyToMergeCount++;
            }
        }

        // Compute the completion rate
        const completionRate = (readyToMergeCount / openPRs.length) * 100;
        return completionRate.toFixed(2); // Format to 2 decimal places
    } catch (error) {
        console.error('Error fetching PR data:', error);
        throw error;
    }
}

module.exports = computePRCompletionRate;
