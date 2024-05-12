import React from 'react';

const AIComments = ({ comments }) => {
    return (
        <div className="ai-comments">
            <h3>AI Reviewer Comments</h3>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    );
};

export default AIComments;
