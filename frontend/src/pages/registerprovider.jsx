import React, { useState, useEffect } from "react";
import axios from "axios";
// navigation
import { useNavigate } from "react-router-dom";
import "../styles/registerprovider.css"; // Ensure you have a CSS file for styling

function RegisterProvider() {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch available services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/service/`);
        setServices(res.data.services);
      } catch (err) {
        console.error("Error fetching services", err);
      }
    };
    fetchServices();
  }, []);

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id]
    );
  };

  // Submit provider registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // Ensure token is stored

      if (!token) {
        setError("You must be logged in to register as a provider.");
        setLoading(false);
        return;
      }

      // Debug log
      console.log("Submitting:", { services: selectedServices, location });

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/provider`,
        {
          services: selectedServices,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Provider registered successfully!");
      console.log(res.data);
      setSelectedServices([]);
      setLocation("");
       navigate("/");
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-provider">

      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <h3>Select Services You Offer</h3>
        {services.map((service) => (
          <div key={service._id}>
            <label>
              <input
                type="checkbox"
                value={service._id}
                onChange={() => handleCheckboxChange(service._id)}
                checked={selectedServices.includes(service._id)}
              />
              {service.name} - ₹{service.price}
            </label>
          </div>
        ))}

        <div>
          <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register as Provider"}
        </button>
      </form>
    </div>
  );
}

export default RegisterProvider;


