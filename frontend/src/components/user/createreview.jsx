import React, { useState } from 'react';
import { createReview } from '../../api/auth.jsx';

const CreateReview = ({ token, targetId, type }) => {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      targetType: type, // 'provider' or 'service'
      targetId,
      content,
    };

    try {
      await createReview(reviewData, token);
      setMessage('Review submitted successfully!');
      setContent('');
    } catch (error) {
      console.error(error);
      setMessage('Failed to submit review.');
    }
  };

  return (
    <div>
   
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your review here..."
          required
        />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default CreateReview;
