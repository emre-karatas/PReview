const axios = require('axios');
const { OpenAI } = require('openai');
/**
 * Calculates the productivity of a developer using their activity data from GitHub and analysis by OpenAI.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} developer - The GitHub username of the developer.
 * @param {string} githubToken - Your GitHub personal access token.
 * @param {string} openaiApiKey - Your OpenAI API key.
 * @returns {Promise<string>} - A promise that resolves to a description of the developer's productivity.
 */

async function calculateDeveloperProductivity(owner, repo, developer, githubToken, openaiApiKey) {
    try {
        const openai = new OpenAI({apiKey: openaiApiKey});

        // GitHub API headers
        const githubHeaders = {
            headers: {
                'Authorization': `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        };

        const commitsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits?author=${developer}`, githubHeaders);
        const commitsCount = commitsResponse.data.length;

        // Get all PRs authored by the developer
        const prsCount = await getAllPullRequests(owner, repo, developer, githubToken);

        // Analyze developer productivity with OpenAI
        const analysisResponse = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{ role: "system", content: `Evaluate the productivity of a developer with ${commitsCount} commits and ${prsCount} pull requests in the repository. 
            ONLY Give your evaluation as a number in range 1-10.` }],
            max_tokens: 10
        });

        return analysisResponse.choices[0]?.message?.content;

    } catch (error) {
        console.error('Error calculating developer productivity:', error);
        throw error;
    }
}

// Helper function to handle pagination of pull requests
async function getAllPullRequests(owner, repo, developer, githubToken) {
    let allPRs = [];
    let page = 1;
    while (true) {
        const prsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=100&page=${page}`, {
            headers: { 
                Authorization: `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json' 
            }
        });
        
        const prs = prsResponse.data.filter(pr => pr.user && pr.user.login === developer);
        allPRs = allPRs.concat(prs);
        if (prsResponse.data.length < 100) {
            break;
        }
        page++;
    }
    return allPRs.length;
}

module.exports = calculateDeveloperProductivity;
