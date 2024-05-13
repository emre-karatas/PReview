const axios = require('axios');
const { OpenAI } = require('openai');
const analyzeCommentTone = require('./analyzeCommentTone');
const checkCommentContentMatchWithPRInfo = require('./checkCommentContentMatchWithPRInfo');

// Initialize OpenAI client properly
const openai = new OpenAI({apiKey: "sk-proj-VT8BmgapacHnj7sYNHKST3BlbkFJUt4qjX2xhGYvKzPonbLn"});

async function summarizeComment(comment) {
    try {
        const analysisResponse = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: `Summarize the following comment: "${comment}"`}],
            max_tokens: 100
        });

        return analysisResponse.choices[0]?.message?.content;
    } catch (error) {
        console.error('Error summarizing comment:', error);
        throw error;
    }
};

async function getPRInfo(repoOwner, repoName, prNumber, githubToken) {
    try {
        const url = `https://api.github.com/repos/${repoOwner}/${repoName}/issues/${prNumber}`;
    
        const githubHeaders = {
            headers: {
                'Authorization': `Bearer ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        };
    
        const response = await axios.get(url, githubHeaders); 
        
        return [response?.data?.title, response?.data?.body];
    } catch (error) {
        console.error('Error getting pr info', error);
        throw error;
    }
}

async function fetchAndAnalyzeComments(repoOwner, repoName, prNumber, githubToken) {
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/issues/${prNumber}/comments`;
    
    const githubHeaders = {
        headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    };

    try {
        const response = await axios.get(url, githubHeaders);
        const commentsData = await Promise.all(response.data.map(async (comment) => {
            // Analyze the quality of the comment
            const qualityResponse = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{role: 'user', content: `Analyze the quality of this review comment give an overall feedback by including a grade: excellent/good/average/poor: "${comment.body}"`}],
                max_tokens: 150
            });
            
            const qualityFeedback = qualityResponse.choices[0]?.message?.content;

            const score = interpretOpenAIFeedback(qualityFeedback);

            // Get summary of the comment
            const summaryResponse = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{role: 'user', content:  `Provide a summary for the following comment: "${comment.body}"`}],
                max_tokens: 100
            });

            // inspect the tone
            const tone = await analyzeCommentTone(comment.body);
            
            const [titleInfo, bodyInfo] = await getPRInfo(repoOwner, repoName, prNumber, githubToken);
            const prMatch = await checkCommentContentMatchWithPRInfo(comment.body, "Title: " + titleInfo + "Body: " + bodyInfo);
            const summary = summaryResponse.choices[0]?.message?.content;
            return {
                date: comment.created_at,
                comment: comment.body,
                score,
                tone,
                prMatch,
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

module.exports = { fetchAndAnalyzeComments };