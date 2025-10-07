import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceById, createBooking } from "../api/auth.jsx";
import BookingContext from "../context/bookingcontext.jsx";
import "../styles/bookingpage.css";

function BookingPage() {
  const { id } = useParams(); // service ID from URL
  const navigate = useNavigate();
  const { addBooking } = useContext(BookingContext);

  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");

  const token = localStorage.getItem("token"); // user token

  useEffect(() => {
  const fetchService = async () => {
    try {
      const { data } = await getServiceById(id);
      console.log("Service Response:", data);  // ✅ Check this in browser console
      setService(data);
    } catch (err) {
      console.error("Failed to fetch service:", err);
      alert("Could not load service details.");
    }
  };

  fetchService();
}, [id]);

  const handleBooking = async () => {
    if (!date || !time || !address) {
      alert("Please fill all fields.");
      return;
    }

    // Handle both string and populated object cases for providerId
    const providerId =
      typeof service.providerId === "string"
        ? service.providerId
        : service.providerId?._id;

    if (!providerId) {
      alert("Service provider information missing. Cannot proceed.");
      return;
    }

    try {
      const bookingData = {
        serviceId: service._id,
        providerId,
        date,
        time,
        address,
      };

      const { data } = await createBooking(bookingData, token);

      addBooking(data); // update context
      alert("Booking successful!");
      navigate("/history");
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed. Please try again.");
    }
  };

  if (!service) return <p>Loading service details...</p>;

  return (
  <div className="booking-page">
    <div className="booking-card">
      <h2>Book Service</h2>
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <p><strong>Price:</strong> ₹{service.price}</p>
      <p>
        Provider:{" "}
        {typeof service.providerId === "object"
          ? service.providerId.name
          : "Provider"}
      </p>

      <div className="booking-form">
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>
          Time:
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>

        <button className="book-btn" onClick={handleBooking}>
          Book Now
        </button>
      </div>
    </div>
  </div>
);
}

export default BookingPage;
