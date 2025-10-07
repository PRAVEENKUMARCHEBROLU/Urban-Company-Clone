import { useContext, useEffect } from 'react';
import { getUserBookings } from '../../api/auth.jsx';
import AuthContext from '../../context/authcontext.jsx';
import BookingContext from '../../context/bookingcontext.jsx';

function MyBookings() {
  const { token } = useContext(AuthContext);
  const { bookings, setAllBookings } = useContext(BookingContext);

  useEffect(() => {
    async function fetchBookings() {
      if (!token) return;

      try {
        const response = await getUserBookings(token);
        console.log("Fetched bookings:", response.data.bookings); // ✅ Debug
        setAllBookings(response.data.bookings);
      } catch (error) {
        console.error('Failed to fetch bookings', error);
      }
    }

    fetchBookings();
  }, [token, setAllBookings]);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>My Bookings</h2>

      {bookings.length === 0 ? (
        <p style={{ textAlign: "center" }}>No bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              margin: "15px 0",
              backgroundColor: "#f9f9f9"
            }}
          >
            <h3>{booking.serviceId?.name || "Service not found"}</h3>
            <p><strong>Description:</strong> {booking.serviceId?.description || "No description available"}</p>
            <p><strong>Category:</strong> {booking.serviceId?.category || "N/A"}</p>
            <p><strong>Price:</strong> ₹{booking.serviceId?.price || "N/A"}</p>

            <hr />

            <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {booking.time}</p>
            <p><strong>Address:</strong> {booking.address || "Not provided"}</p>
            <p><strong>Status:</strong> <span style={{ color: booking.status === "confirmed" ? "green" : booking.status === "cancelled" ? "red" : "orange" }}>{booking.status}</span></p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;
