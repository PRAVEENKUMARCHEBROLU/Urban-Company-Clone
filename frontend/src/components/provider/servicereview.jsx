import React, { useEffect, useState } from 'react';
import { getServiceReviews } from '../../api/auth.jsx';

const ServiceReviews = ({ serviceId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getServiceReviews(serviceId);
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [serviceId]);

  return (
    <div>
      <h3>Reviews for Service</h3>
      <ul>
        {reviews.map((r) => (
          <li key={r.id}>{r.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceReviews;
