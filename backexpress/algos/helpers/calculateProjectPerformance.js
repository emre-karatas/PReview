const axios = require('axios');
const { OpenAI } = require('openai');

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
        // const openaiConfig = new Configuration({
        //     apiKey: openaiApiKey
        // });
        // const openai = new OpenAIApi(openaiConfig);

        const openai = new OpenAI({
            apiKey: openaiApiKey
        });

        // GitHub API headers
        const githubHeaders = {
            headers: {
                'Authorization': `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
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
        const analysisResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: `Given a project with ${commitsCount} commits, ${prsCount} pull requests, and ${issuesCount} issues, rate its performance on a scale of 0 to 100. Consider aspects such as activity levels, issue resolution speed, and overall engagement.`}],
            max_tokens: 100
        });
        return analysisResponse.choices[0]?.message?.content;

    } catch (error) {
        console.error('Error calculating project performance:', error);
        throw error;
    }
}

module.exports = calculateProjectPerformance;
