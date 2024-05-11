const { Configuration, OpenAIApi } = require('openai');

/**
 * Analyzes the tone of a pull request review comment using the OpenAI API.
 * @param {string} comment - The text of the review comment.
 * @param {string} openaiApiKey - Your OpenAI API key.
 * @returns {Promise<string>} - A promise that resolves to the analysis of the tone of the comment.
 */
async function analyzeCommentTone(comment, openaiApiKey) {
    const configuration = new Configuration({
        apiKey: openaiApiKey
    });
    const openai = new OpenAIApi(configuration);

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003", // Check OpenAI's documentation for the latest model
            prompt: `Analyze the tone of the following comment: "${comment}"`,
            max_tokens: 60
        });

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error analyzing comment tone:', error);
        throw error;
    }
}

module.exports = analyzeCommentTone;
