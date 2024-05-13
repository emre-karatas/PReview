const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');

/**
 * Fetches and analyzes productivity for all developers in a GitHub repository.
 * @param {string} owner - The username of the repository owner.
 * @param {string} repo - The name of the repository.
 * @param {string} githubToken - Your GitHub personal access token.
 * @param {string} openaiApiKey - Your OpenAI API key.
 * @returns {Promise<Array>} - A promise that resolves to an array with each developer's productivity analysis.
 */
async function calculateDeveloperProductivity(owner, repo, githubToken, openaiApiKey) {
    try {
        const openaiConfig = new Configuration({ apiKey: openaiApiKey });
        const openai = new OpenAIApi(openaiConfig);

        const githubHeaders = {
            headers: { Authorization: `token ${githubToken}` }
        };

        // Fetch all contributors
        const contributorsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`, githubHeaders);
        const contributors = contributorsResponse.data;

        // Map over contributors and calculate productivity
        const productivityReports = await Promise.all(contributors.map(async contributor => {
            const username = contributor.login;
            // Get PRs by this contributor
            const prsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=100`, githubHeaders);
            const prsCount = prsResponse.data.filter(pr => pr.user.login === username).length;

            // Analyze productivity with OpenAI
            const prompt = `Evaluate the productivity of developer ${username} with ${prsCount} pull requests in the repository ${repo}. Provide a comprehensive assessment.`;
            const analysisResponse = await openai.createCompletion({
                model: "text-davinci-003",
                prompt,
                max_tokens: 150
            });

            return {
                username,
                prCount: prsCount,
                productivityAnalysis: analysisResponse.data.choices[0].text.trim()
            };
        }));

        return productivityReports;
    } catch (error) {
        console.error('Error analyzing all developers\' productivity:', error);
        throw error;
    }
}

module.exports = calculateDeveloperProductivity;
