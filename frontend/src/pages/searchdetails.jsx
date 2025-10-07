import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceById } from "../api/auth.jsx";
import "../styles/searchdetails.css";



export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await getServiceById(id);
        setService(data);
      } catch (err) {
        console.error("Failed to fetch service:", err);
        setError("Could not load service details.");
      }
    };

    fetchService();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!service) return <p>Loading service details...</p>;

  return (
    <div className="service-details-page">
      <div className="service-card-details">
        <h2>{service.name}</h2>
        {/* <img
          src={`http://localhost:5000/${service.image}`}
          alt={service.name}
        /> */}
        <div className="service-info">
          <p><strong>Category:</strong> {service.category}</p>
          <p><strong>Description:</strong> {service.description}</p>
          <p><strong>Price:</strong> ₹{service.price}</p>
        </div>
        <button
          className="book-btn"
          onClick={() => navigate(`/booking/${service._id}`)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

