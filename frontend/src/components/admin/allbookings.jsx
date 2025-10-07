import { useEffect, useState, useContext } from 'react';
import { getAllBookings } from '../../api/auth.jsx';
import  AuthContext  from '../../context/authcontext.jsx';

function AllBookings() {
  const { user } = useContext(AuthContext);
  const [bookings,setBookings] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      if (!user?.token || user?.role !== 'admin') return;

      try {
        const response = await getAllBookings(user.token);
        setBookings(response.data.bookings);
      } catch (error) {
        console.error('Failed to fetch all bookings', error);
      }
        }

        fetchAll();
    }, 
       );
 return (
    <div>
      <h2>All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p><strong>Booking ID:</strong> {booking.id}</p>
            <p><strong>User ID:</strong> {booking.userId}</p>
            <p><strong>Provider ID:</strong> {booking.providerId}</p>
            <p><strong>Service ID:</strong> {booking.serviceId}</p>
            <p><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>
            <p><strong>Status:</strong> {booking.status}</p>
          </div>
        ))
      )}
    </div>
  );
};
export default AllBookings;
