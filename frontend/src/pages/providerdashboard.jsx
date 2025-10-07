import React, { useContext } from 'react';
import  AuthContext  from '../context/authcontext.jsx';
import ProviderProfile from '../components/provider/providerprofile.jsx';
import ProviderBookings from '../components/provider/providerbooking.jsx';

const ProviderDashboard = () => {
  const { user, token } = useContext(AuthContext);

  if (!user || user.role !== 'provider') {
    return <p>You are not authorized to access this page.</p>;
  }

  return (
    <div className="dashboard-container">
      <style>{`
        .dashboard-container {
          max-width: 1200px;
          margin: 40px auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, sans-serif;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .dashboard-header h2 {
          color: #111827;
          font-size: 28px;
        }

        .grid-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .card {
          background: #ffffff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .card h3 {
          margin-bottom: 10px;
          color: #333;
        }
      `}</style>

      <div className="dashboard-header">
        <h2>Welcome, {user.name}</h2>
        <p>Role: {user.role}</p>
      </div>

      <div className="grid-layout">
        <div className="card">
          <h3>My Profile</h3>
          <ProviderProfile token={token} />
        </div>

        <div className="card">
          <h3>My Bookings</h3>
          <ProviderBookings />
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;

