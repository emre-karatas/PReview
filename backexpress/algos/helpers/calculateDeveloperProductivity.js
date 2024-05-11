const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');

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
        // Initialize OpenAI API
        const openaiConfig = new Configuration({
            apiKey: openaiApiKey
        });
        const openai = new OpenAIApi(openaiConfig);

        // Fetch commits, PRs, and issues participation from GitHub
        const githubHeaders = {
            headers: { Authorization: `token ${githubToken}` }
        };

        // Get commits by the developer
        const commitsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits?author=${developer}`, githubHeaders);
        const commitsCount = commitsResponse.data.length;

        // Get PRs authored by the developer
        const prsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=100`, githubHeaders);
        const prsCount = prsResponse.data.filter(pr => pr.user.login === developer).length;

        // Analyze developer productivity with OpenAI
        const analysisResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Evaluate the productivity of a developer with ${commitsCount} commits and ${prsCount} pull requests in the repository. Provide a comprehensive assessment.`,
            max_tokens: 150
        });

        return analysisResponse.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error calculating developer productivity:', error);
        throw error;
    }
}

module.exports = calculateDeveloperProductivity;
