const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');

const openaiToken = sk-proj-VT8BmgapacHnj7sYNHKST3BlbkFJUt4qjX2xhGYvKzPonbLn;


const openaiClient = new OpenAIApi(new Configuration({
    apiKey: openaiToken
}));

async function analyzePRComments(repoOwner, repoName, prNumber, reviewer, authToken) {
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/issues/${prNumber}/comments`;
const githubHeaders = {
    headers: {
        Authorization: `token ${authToken}`,
        'User-Agent': 'Node.js'
    }
};

    try {
        // Fetch comments from GitHub
        const response = await axios.get(url, githubHeaders);
        const comments = response.data.filter(comment => comment.user.login === reviewer).map(comment => comment.body);

        if (comments.length === 0) {
            return { score: 0, explanation: "No comments found from the specified reviewer." };
        }

        // Combine all comments into a single string for analysis
        const combinedComments = comments.join(" ");

        // Analyze comments using OpenAI
        const analysisResponse = await openaiClient.createCompletion({
            model: "text-davinci-002",
            prompt: `Analyze the quality of these review comments: ${combinedComments}`,
            max_tokens: 150
        });

        const qualityFeedback = analysisResponse.data.choices[0].text.trim();
        const score = interpretOpenAIFeedback(qualityFeedback);

        return { score, explanation: qualityFeedback };
    } catch (error) {
        console.error('Failed to analyze PR comments:', error);
        return { score: 0, explanation: "An error occurred while processing the request." };
    }
}

function interpretOpenAIFeedback(feedback) {
    // Simple interpretation of feedback to a score
    if (feedback.includes("excellent")) return 10;
    if (feedback.includes("good")) return 8;
    if (feedback.includes("average")) return 5;
    if (feedback.includes("poor")) return 3;
    return 1;
}

module.exports = { analyzePRComments };
