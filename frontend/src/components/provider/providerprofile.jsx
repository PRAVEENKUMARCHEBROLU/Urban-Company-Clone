import React, { useEffect, useState } from 'react';
import { getMyProviderProfile } from '../../api/auth.jsx';

const ProviderProfile = ({ token }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getMyProviderProfile(token);
        setProfile(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load profile.');
      }
    };

    fetchProfile();
  }, [token]);

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>My Provider Profile</h2>
      <ul>
        <li><strong>Name:</strong> {profile.name}</li>
        <li><strong>Email:</strong> {profile.email}</li>
        <li><strong>Phone:</strong> {profile.phone}</li>
        <li><strong>Specialty:</strong> {profile.specialty}</li>
      </ul>
    </div>
  );
};

export default ProviderProfile;
