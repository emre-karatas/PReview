const axios = require('axios');

async function getAllPullRequests(owner, repo) {
    let allPullRequests = [];
    let apiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=100`;

    while (apiUrl) {
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const pullRequests = response.data;
        allPullRequests = allPullRequests.concat(pullRequests);

        const links = response.headers['link'];
        const nextLink = links && links.split(',').find(s => s.includes('rel="next"'));
        apiUrl = nextLink ? new URL(nextLink.split(';')[0].trim().slice(1, -1)).toString() : null;
    }

    return allPullRequests;
};

module.exports = {
    getAllPullRequests,
}