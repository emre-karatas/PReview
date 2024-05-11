const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');

/**
 * Calculates the performance score of a project using activity data from a GitHub repository and analysis by OpenAI.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} githubToken - Your GitHub personal access token.
 * @param {string} openaiApiKey - Your OpenAI API key.
 * @returns {Promise<string>} - A promise that resolves to a score or description of the project's performance.
 */
async function calculateProjectPerformance(owner, repo, githubToken, openaiApiKey) {
    try {
        // Initialize OpenAI API
        const openaiConfig = new Configuration({
            apiKey: openaiApiKey
        });
        const openai = new OpenAIApi(openaiConfig);

        // GitHub API headers
        const githubHeaders = {
            headers: { Authorization: `token ${githubToken}` }
        };

        // Get repository data
        const [commitsResponse, prsResponse, issuesResponse] = await Promise.all([
            axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, githubHeaders),
            axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls?state=all`, githubHeaders),
            axios.get(`https://api.github.com/repos/${owner}/${repo}/issues?state=all`, githubHeaders)
        ]);

        const commitsCount = commitsResponse.data.length;
        const prsCount = prsResponse.data.length;
        const issuesCount = issuesResponse.data.filter(issue => !issue.pull_request).length;

        // Analyze project performance with OpenAI
        const analysisResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Given a project with ${commitsCount} commits, ${prsCount} pull requests, and ${issuesCount} issues, rate its performance on a scale of 0 to 100. Consider aspects such as activity levels, issue resolution speed, and overall engagement.`,
            max_tokens: 100
        });

        return analysisResponse.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error calculating project performance:', error);
        throw error;
    }
}

module.exports = calculateProjectPerformance;
