import React, { useEffect, useState } from 'react';
import { getProviderReviews } from '../../api/auth.jsx';

const ProviderReviews = ({ providerId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getProviderReviews(providerId);
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [providerId]);

  return (
    <div>
      <h3>Reviews for Provider</h3>
      <ul>
        {reviews.map((r) => (
          <li key={r.id}>{r.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProviderReviews;
