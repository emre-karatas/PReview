const axios = require('axios');
const { OpenAI, Configuration } = require('openai');

// Initialize OpenAI client properly
const openaiToken = 'sk-proj-VT8BmgapacHnj7sYNHKST3BlbkFJUt4qjX2xhGYvKzPonbLn';
const openai = new OpenAI({
    apiKey: openaiToken
});

async function summarizeComment(comment) {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: `Summarize the following comment: "${comment}"`,
            max_tokens: 60
        });

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error summarizing comment:', error);
        throw error;
    }
}

async function fetchAndAnalyzeComments(repoOwner, repoName, prNumber, authToken) {
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/issues/${prNumber}/comments`;
    const githubHeaders = {
        headers: {
            Authorization: `token ${authToken}`,
            'User-Agent': 'Node.js'
        }
    };

    try {
        const response = await axios.get(url, githubHeaders);
        const commentsData = await Promise.all(response.data.map(async (comment) => {
            // Analyze the quality of the comment
            const qualityResponse = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: `Analyze the quality of this review comment: "${comment.body}"`,
                max_tokens: 150
            });
            const qualityFeedback = qualityResponse.data.choices[0].text.trim();
            const score = interpretOpenAIFeedback(qualityFeedback);

            // Get summary of the comment
            const summaryResponse = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: `Provide a summary for the following comment: "${comment.body}"`,
                max_tokens: 60
            });
            const summary = summaryResponse.data.choices[0].text.trim();

            return {
                date: comment.created_at,
                comment: comment.body,
                score,
                summary
            };
        }));

        return commentsData;
    } catch (error) {
        console.error('Failed to fetch or analyze PR comments:', error);
        throw error;
    }
}

function interpretOpenAIFeedback(feedback) {
    if (feedback.includes("excellent")) return 10;
    if (feedback.includes("good")) return 8;
    if (feedback.includes("average")) return 5;
    if (feedback.includes("poor")) return 3;
    return 1;
}

module.exports = { fetchAndAnalyzeComments, summarizeComment };
