const axios = require('axios');
const { OpenAI } = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: "sk-proj-VT8BmgapacHnj7sYNHKST3BlbkFJUt4qjX2xhGYvKzPonbLn" });

async function fetchLatestPRCommentsByDeveloper(repoOwner, repoName, developer, githubToken) {
    console.log(repoOwner, repoName, developer, githubToken);
    const githubHeaders = {
        headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    };

    try {
        // Fetch the latest pull request for the repository
        const prsResponse = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/pulls`, {
            headers: {
                'Authorization': `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            params: {
                state: 'all',
                per_page: 1, // Fetch only the most recent PR
                sort: 'created',
                direction: 'desc'
            }
        });

        if (prsResponse.data.length === 0) {
            console.log("why");
            return [];
        }
        

        const latestPR = prsResponse.data[0];
        console.log("hhhh", latestPR);
        const commentsUrl = latestPR.comments_url;

        // Fetch comments from the latest PR
        const commentsResponse = await axios.get(commentsUrl, { headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
        } });
        const filteredComments = commentsResponse.data.filter(comment => comment.user.login === developer);

        // Analyze comments
        const analyzedComments = await Promise.all(filteredComments.map(async (comment) => {
            const content = comment.body;

            // Analyze the quality of the comment
            const qualityResponse = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: `Analyze this comment and rate it: "${content}"` }],
                max_tokens: 100
            });

            const score = interpretOpenAIFeedback(qualityResponse.choices[0]?.message?.content);

            return {
                date: comment.created_at,
                comment: content,
                score
            };
        }));

        return analyzedComments;
    } catch (error) {
        console.error('Error fetching latest PR comments by developer:', error);
        throw error;
    }
}

function interpretOpenAIFeedback(feedback) {
    if (feedback.includes("excellent")) return 10;
    if (feedback.includes("good")) return 8;
    if (feedback.includes("average")) return 5;
    if (feedback.includes("poor")) return 3;
    return 0; // Assume 0 as default for unmatched cases
}

module.exports = fetchLatestPRCommentsByDeveloper;
