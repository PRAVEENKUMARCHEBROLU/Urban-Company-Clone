import React, { useState, useEffect, useContext } from 'react';
import { getUserProfile } from '../../api/auth.jsx';
import AuthContext from '../../context/authcontext.jsx';

const UserProfile = () => {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile(token);
        setProfile(res.data);
      } catch (error) {
        console.error(error);
        setMessage('Failed to load profile.');
      }
    };

    if (token) fetchProfile();
  }, [token]);

  if (message) return <p style={{ color: 'red' }}>{message}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>My Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone || 'Not provided'}</p>
    </div>
  );
};

export default UserProfile;
