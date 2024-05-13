const axios = require('axios');
const { OpenAI } = require('openai');
const openai = new OpenAI({apiKey: "sk-proj-VT8BmgapacHnj7sYNHKST3BlbkFJUt4qjX2xhGYvKzPonbLn"});

async function analyzePRComments(repoOwner, repoName, prNumber, reviewer, githubToken) {

    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/issues/${prNumber}/comments`;    
    const githubHeaders = {
        headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
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
        const analysisResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            prompt: `Analyze the quality of these review comments, give an overall feedback by including a grade: excellent/good/average/poor : ${combinedComments}`,
            max_tokens: 150
        });

        const qualityFeedback = analysisResponse?.choices[0]?.message?.content;
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
