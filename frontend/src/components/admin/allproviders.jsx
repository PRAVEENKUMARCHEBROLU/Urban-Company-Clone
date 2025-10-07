import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import  AuthContext  from '../../context/authcontext.jsx';

export default function AllProviders() {
  const { user } = useContext(AuthContext);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    if (!user?.token) return;

    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/provider`, {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then((res) => setProviders(res.data.providers))
      .catch((err) => console.error('Error loading providers:', err));
  }, [user]);

  return (
    <div>
      <h2>All Providers</h2>
      {providers.map((p) => (
        <div key={p._id}>
          <strong>{p.userId?.name}</strong> — {p.location} — Status: {p.status}
          <p><strong>Name:</strong> {p.userId?.name}</p>
          <p><strong>Location:</strong> {p.location}</p>
          <p><strong>Status:</strong> {p.status}</p>
        </div>
      ))}
    </div>
  );
}
