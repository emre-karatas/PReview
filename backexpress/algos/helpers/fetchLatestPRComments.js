const axios = require('axios');
const { OpenAI } = require('openai');

// Initialize OpenAI client properly
const openai = new OpenAI({apiKey: "sk-proj-VT8BmgapacHnj7sYNHKST3BlbkFJUt4qjX2xhGYvKzPonbLn"});

async function fetchLatestPRComments(repoOwner, repoName, developerUsername, githubToken) {
    const githubHeaders = {
        headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    };

    try {
        // Fetch all PRs to find the latest by the developer
        const prsResponse = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/pulls?state=all`, githubHeaders);
        const latestPR = prsResponse.data.find(pr => pr.user.login === developerUsername);
        
        if (!latestPR) {
            console.log("No PRs found for this developer.");
            return [];
        }

        // Fetch comments from the latest PR
        const commentsResponse = await axios.get(latestPR.comments_url, githubHeaders);
        const commentsData = [];

        for (const comment of commentsResponse.data) {
            // Analyze the quality of the comment using OpenAI
            const qualityResponse = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{role: 'user', content: `Analyze the quality of this review comment: "${comment.body}"`}],
                max_tokens: 150
            });

            const score = interpretOpenAIFeedback(qualityResponse.choices[0]?.message?.content);

            commentsData.push({
                date: comment.created_at,
                comment: comment.body,
                score
            });

            // Break the loop if you have obtained the required data
            if (commentsData.length >= 2) {
                break;
            }
        }

        return commentsData;
    } catch (error) {
        console.error('Error fetching or analyzing PR comments:', error);
        throw error;
    }
}


function interpretOpenAIFeedback(feedback) {
    if (feedback.includes("excellent")) return 10;
    if (feedback.includes("good")) return 8;
    if (feedback.includes("average")) return 5;
    if (feedback.includes("poor")) return 3;
    return 1; // Consider using a default or handling unexpected cases more explicitly
}

module.exports = fetchLatestPRComments ;
