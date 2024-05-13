const { OpenAI } = require('openai');

/**
 * Analyzes the tone of a pull request review comment using the OpenAI API.
 * @param {string} comment - The text of the review comment.
 * @param {string} openaiApiKey - Your OpenAI API key.
 * @returns {Promise<string>} - A promise that resolves to the analysis of the tone of the comment.
 */

const openai = new OpenAI({apiKey: "sk-proj-VT8BmgapacHnj7sYNHKST3BlbkFJUt4qjX2xhGYvKzPonbLn"});

async function checkCommentContentMatchWithPRInfo(comment, info) {
    
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: `Can you check if the content of the 
                    comment matches the title & explanation of the pull request: 
                    Comment: "${comment}" 
                    Title & Explanation info:"${info}" `}],
            max_tokens: 150
        });

        return response?.choices[0]?.message?.content;
    } catch (error) {
        console.error('Error analyzing the match:', error);
        throw error;
    }
}

module.exports = checkCommentContentMatchWithPRInfo;
