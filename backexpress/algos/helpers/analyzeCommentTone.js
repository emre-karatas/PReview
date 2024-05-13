const { OpenAI } = require('openai');

/**
 * Analyzes the tone of a pull request review comment using the OpenAI API.
 * @param {string} comment - The text of the review comment.
 * @param {string} openaiApiKey - Your OpenAI API key.
 * @returns {Promise<string>} - A promise that resolves to the analysis of the tone of the comment.
 */

const openai = new OpenAI({apiKey: "sk-proj-VT8BmgapacHnj7sYNHKST3BlbkFJUt4qjX2xhGYvKzPonbLn"});

async function analyzeCommentTone(comment) {
    
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: `Analyze the tone of the following comment: "${comment}"`}],
            max_tokens: 60
        });

        return response?.choices[0]?.message?.content;
    } catch (error) {
        console.error('Error analyzing comment tone:', error);
        throw error;
    }
}

module.exports = analyzeCommentTone;
