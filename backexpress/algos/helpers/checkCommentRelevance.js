const { Configuration, OpenAIApi } = require('openai');

/**
 * Checks if the content of a comment matches the content of the pull request review using OpenAI.
 * @param {string} prReviewText - The text of the pull request review.
 * @param {string} commentText - The text of the comment.
 * @param {string} openaiApiKey - Your OpenAI API key.
 * @returns {Promise<string>} - A promise that resolves to an analysis of the content match.
 */
async function checkCommentRelevance(prReviewText, commentText, openaiApiKey) {
    const configuration = new Configuration({
        apiKey: openaiApiKey
    });
    const openai = new OpenAIApi(configuration);

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003", // Check for the latest and most appropriate model when implementing
            prompt: `Determine if the following comment is relevant to the associated pull request review. Review: "${prReviewText}" Comment: "${commentText}"`,
            max_tokens: 60
        });

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error checking content relevance:', error);
        throw error;
    }
}

module.exports = checkCommentRelevance;
