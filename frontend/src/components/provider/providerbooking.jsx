import React, { useEffect, useState, useContext } from 'react';
import { getProviderBookings, updateBookingStatus } from '../../api/auth.jsx'; // ✅ separate booking API file
import AuthContext from '../../context/authcontext.jsx';

function ProviderBookings() {
  const { user, token } = useContext(AuthContext);
  const [providerBookings, setProviderBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token || user?.role !== 'provider') return;

      try {
        const response = await getProviderBookings(token);
        setProviderBookings(response.data.bookings || []);
      } catch (error) {
        console.error('Error fetching provider bookings:', error);
      }
    };

    fetchBookings();
  }, [token, user]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateBookingStatus(id, newStatus, token);
      setProviderBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: newStatus } : b
        )
      );
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📋 Bookings Assigned to You</h2>
      {providerBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        providerBookings.map((booking) => (
          <div
            key={booking._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              margin: '10px 0',
              padding: '15px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <p><strong>Service:</strong> {booking.serviceId?.name || 'N/A'}</p>
            <p><strong>User:</strong> {booking.userId?.name || 'N/A'}</p>
            <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <p><strong>Address:</strong> {booking.address}</p>

            {booking.status === 'pending' && (
              <div style={{ marginTop: '10px' }}>
                <button
                  style={{ marginRight: '10px', background: '#4caf50', color: '#fff' }}
                  onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                >
                  Accept
                </button>
                <button
                  style={{ background: '#f44336', color: '#fff' }}
                  onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ProviderBookings;

