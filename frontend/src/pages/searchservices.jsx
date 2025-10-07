import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllServices } from "../api/auth.jsx";
import "../styles/searchservices.css";


export default function SearchServices() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await getAllServices(); // Calls /api/service/
        setServices(data.services);            // ✅ Only the array
        setFilteredServices(data.services); 
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setError("Could not load services. Please try again later.");
      }
    };

    fetchServices();
  }, []);

  // Handle search & filter
  useEffect(() => {
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== "all") {
      filtered = filtered.filter((s) => s.category === category);
    }

    setFilteredServices(filtered);
  }, [searchTerm, category, services]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Collect unique categories
  const categories = ["all", ...new Set(services.map((s) => s.category))];

  return (
    <div className="search-page">
      <h2>Available Services</h2>

      {/* Search & Filter Bar */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {filteredServices.length === 0 ? (
        <p>No services available.</p>
      ) : (
        <div className="services-grid">
          {filteredServices.map((service) => (
            <div key={service._id} className="service-card">
              {/* <img
                src={`http://localhost:5000/${service.image}`}
                alt={service.name}
              /> */}
              <h3>{service.name}</h3>
              <p>₹{service.price}</p>
              <Link to={`/service/${service._id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
