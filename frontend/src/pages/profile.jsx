import React, { useContext } from 'react';
import AuthContext from '../context/authcontext.jsx';
import UserProfile from '../components/user/userprofile.jsx';
import DeleteAccount from '../components/user/deleteaccount.jsx';
import CreateReview from '../components/user/createreview.jsx';
import BookingForm from '../components/user/bookingform.jsx';
import MyBookings from '../components/user/mybookings.jsx';

function Profile() {
  const { user, token } = useContext(AuthContext);

  if (!user) return <p>Please login to access profile</p>;

  return (
    <div className="profile-container">
      <style>{`
        .profile-container {
          max-width: 1000px;
          margin: 40px auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, sans-serif;
          background: #f9fafb;
          border-radius: 12px;
          box-shadow: 0 6px 12px rgba(0,0,0,0.05);
        }

        .profile-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .profile-header h2 {
          color: #111827;
          font-size: 28px;
          margin-bottom: 5px;
        }

        .grid-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.08);
        }

        .card h3 {
          color: #333;
          margin-bottom: 10px;
          font-size: 20px;
        }
      `}</style>

      <div className="profile-header">
        <h2>Welcome, {user.name}</h2>
      </div>

      <div className="grid-layout">
        <div className="card">
          <h3>User Profile</h3>
          <UserProfile token={token} />
        </div>

           <div className="card">
          {user?.role === 'user' && (
            <>
              
              <MyBookings />
            </>
           )}
           </div>

        <div className="card">
          <h3>Delete Account</h3>
          <DeleteAccount token={token} />
        </div>
      </div>
    </div>
  );
}

export default Profile;





