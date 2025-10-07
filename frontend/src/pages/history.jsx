import { useContext } from "react";
import BookingContext from "../context/bookingcontext.jsx";

export default function History() {
  const { bookings } = useContext(BookingContext);

  if (bookings.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem", color: "#555" }}>
        <h2>No Bookings Yet</h2>
        <p>Once you book a service, it will appear here.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Your Bookings
      </h2>
      <div style={{ display: "grid", gap: "1.5rem" }}>
        {bookings.map((booking, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "1.5rem",
              transition: "transform 0.2s ease",
            }}
          >
            <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
              {booking.serviceId?.name || "Service"}
            </h3>
            <p style={{ margin: "0.2rem 0", color: "#666" }}>
              {booking.serviceId?.description || "Personalized training plans to meet your fitness goals."}
            </p>

            <p style={{ margin: "0.2rem 0" }}>
              <strong>Date: 2025-07-30</strong> {booking.date}
            </p>
            <p style={{ margin: "0.2rem 0" }}>
              <strong>Time: 09:00</strong> {booking.time}
            </p>
            <p style={{ margin: "0.2rem 0" }}>
              <strong>Address: nellore</strong> {booking.address}
            </p>
            <button
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                background: "#ff4d4f",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              onClick={() => alert("Cancel booking not implemented yet")}
            >
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
