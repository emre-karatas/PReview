import React, { useState } from 'react';
import axios from 'axios';
import './API.css';

function API() {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [prReviewComments, setPrReviewComments] = useState(null);
  const [prReviews, setPrReviews] = useState(null);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const fetchPRReviewComments = async () => {
    setLoadingComments(true); // Start loading
    try {
      const response = await axios.post('http://localhost:8080/api/algos/countPRReviewComments/', { owner, repo });
      setPrReviewComments(response.data);
    } catch (error) {
      console.error('Error fetching PR Review Comments:', error);
      setPrReviewComments(null);
    } finally {
      setLoadingComments(false); // Stop loading
    }
  };

  const fetchPRReviews = async () => {
    setLoadingReviews(true); // Start loading
    try {
      const response = await axios.post('http://localhost:8080/api/algos/countPRReviews/', { owner, repo });
      setPrReviews(response.data);
    } catch (error) {
      console.error('Error fetching PR Reviews:', error);
      setPrReviews(null);
    } finally {
      setLoadingReviews(false); // Stop loading
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input
            type="text"
            placeholder="Owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
          <input
            type="text"
            placeholder="Repository"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
          />
        </div>

        <button onClick={fetchPRReviewComments} disabled={loadingComments}>
          {loadingComments ? 'Loading...' : 'Count PR Review Comments'}
        </button>
        {prReviewComments && (
          <pre>{JSON.stringify(prReviewComments, null, 2)}</pre>
        )}

        <button onClick={fetchPRReviews} disabled={loadingReviews}>
          {loadingReviews ? 'Loading...' : 'Count PR Reviews'}
        </button>
        {prReviews && (
          <pre>{JSON.stringify(prReviews, null, 2)}</pre>
        )}
      </header>
    </div>
  );
}

export default API;
