const axios = require('axios');

async function countPRReviewsPerDeveloper(owner, repo) {
    let apiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=20`;
    const reviewCounts = {};

    while (apiUrl) {
        const prsResponse = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const pullRequests = prsResponse.data;

        for (const pr of pullRequests) {
            console.log("pr", pr.number);
            const reviewsUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${pr.number}/reviews`;

            const reviewsResponse = await axios.get(reviewsUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            const reviews = reviewsResponse.data;
            console.log("reviews", reviews);

            for (const review of reviews) {
                const userLogin = review.user.login;
                reviewCounts[userLogin] = (reviewCounts[userLogin] || 0) + 1;
            }
        }
        break;
        const links = prsResponse.headers['link'];
        const nextLink = links && links.split(',').find(s => s.includes('rel="next"'));
        apiUrl = nextLink ? new URL(nextLink.split(';')[0].trim().slice(1, -1)).toString() : null;
    }
    const records = Object.entries(reviewCounts).map(([developer, reviews]) => ({ developer, reviews }));
    return records;
}

async function countPRReviewCommentsPerDeveloper(owner, repo) {
    let apiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=20`;
    const commentCounts = {};

    while (apiUrl) {
        const prsResponse = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const pullRequests = prsResponse.data;

        for (const pr of pullRequests) {
            const reviewsUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${pr.number}/reviews`;

            const reviewsResponse = await axios.get(reviewsUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            const reviews = reviewsResponse.data;

            for (const review of reviews) {
                const commentsUrl = review._links.pull_request.href + '/comments';
                
                const commentsResponse = await axios.get(commentsUrl, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });

                const comments = commentsResponse.data;

                for (const comment of comments) {
                    const userLogin = comment.user.login;
                    commentCounts[userLogin] = (commentCounts[userLogin] || 0) + 1;
                }
            }
        }
        break;
        const links = prsResponse.headers['link'];
        const nextLink = links && links.split(',').find(s => s.includes('rel="next"'));
        apiUrl = nextLink ? new URL(nextLink.split(';')[0].trim().slice(1, -1)).toString() : null;
    }

    // Ranking developers based on the number of comments
    const rankedDevelopers = Object.entries(commentCounts)
                                    .map(([developer, comments]) => ({ developer, comments }))
                                    .sort((a, b) => b.comments - a.comments);

    console.log(rankedDevelopers);

    return rankedDevelopers;
}

module.exports = {
    countPRReviewsPerDeveloper,
    countPRReviewCommentsPerDeveloper,
};