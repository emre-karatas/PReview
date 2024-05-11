const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');

/**
 * Calculates the overall productivity of a project using activity data from a GitHub repository and analysis by OpenAI.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} githubToken - Your GitHub personal access token.
 * @param {string} openaiApiKey - Your OpenAI API key.
 * @returns {Promise<string>} - A promise that resolves to a description of the project's productivity.
 */
async function calculateProjectProductivity(owner, repo, githubToken, openaiApiKey) {
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

        // Analyze project productivity with OpenAI
        const analysisResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Evaluate the overall productivity of a project with ${commitsCount} commits, ${prsCount} pull requests, and ${issuesCount} issues. Provide a comprehensive assessment of the project's effectiveness and efficiency.`,
            max_tokens: 250
        });

        return analysisResponse.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error calculating project productivity:', error);
        throw error;
    }
}

module.exports = calculateProjectProductivity;
