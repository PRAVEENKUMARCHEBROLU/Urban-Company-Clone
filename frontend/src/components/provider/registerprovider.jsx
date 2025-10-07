import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { registerAsProvider } from '../../api/auth.jsx';

const RegisterProvider = ({ token }) => {
  const [formData, setFormData] = useState({
    location: '',
  });

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/service/`);
        setServices(res.data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
        setMessage('Failed to load services. Try again later.');
      }
    };
    fetchServices();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (selectedServices.length === 0) {
      setMessage('Please select at least one service.');
      return;
    }

    try {
      await registerAsProvider(
        {
          services: selectedServices,
          location: formData.location,
        },
        token
      );
      setMessage('✅ Provider registered successfully!');
      setFormData({ location: '' });
      setSelectedServices([]);
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || '❌ Failed to register provider.'
      );
    }
  };

  return (
    <div>
      <h2>Register as Provider</h2>
      {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <h4>Select Services You Offer:</h4>
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
            name="location"
            placeholder="Your Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterProvider;
