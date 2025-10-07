import { useEffect, useState, useContext } from 'react';
import {
  createService,
  getAllServices,
  updateService,
  deleteService
} from '../../api/auth.jsx';
import  AuthContext  from '../../context/authcontext.jsx';

export default function ManageServices() {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
  try {
    const response = await getAllServices();
    console.log("Fetched services:", response.data); // ✅ Check if it logs correctly
    setServices(response.data?.services || []);       // ✅ Avoid crash if response is malformed
  } catch (err) {
    console.error("Failed to fetch services:", err);
  }
 };


  const handleSubmit = async () => {
    if (!user?.token) return;

    try {
      if (editId) {
        await updateService(editId, formData, user.token);
      } else {
        await createService(formData, user.token);
      }

      setFormData({ name: '', description: '', price: '' });
      setEditId(null);
      loadServices();
    } catch (err) {
      console.error('Error saving service:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!user?.token) return;

    try {
      await deleteService(id, user.token);
      loadServices();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
  <div className="manage-container">
    <style>{`
      .manage-container {
        max-width: 700px;
        margin: 40px auto;
        padding: 20px;
        font-family: 'Segoe UI', Tahoma, sans-serif;
        background: #f9fafb;
        border-radius: 12px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
      }

      h2 {
        text-align: center;
        color: #333;
        margin-bottom: 20px;
      }

      input, textarea {
        width: 100%;
        padding: 10px;
        margin: 8px 0;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 16px;
        transition: border 0.2s ease;
      }

      input:focus, textarea:focus {
        border-color: #4f46e5;
        outline: none;
      }

      button {
        background: #4f46e5;
        color: white;
        border: none;
        padding: 10px 16px;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 10px;
        margin-right: 8px;
        transition: background 0.2s ease;
      }

      button:hover {
        background: #4338ca;
      }

      ul {
        list-style: none;
        padding: 0;
        margin-top: 20px;
      }

      li {
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 12px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      li:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0,0,0,0.08);
      }

      li strong {
        color: #111827;
      }

      li div {
        margin-top: 10px;
      }

      li button {
        background: #6b7280;
        margin-right: 8px;
      }

      li button:hover {
        background: #4b5563;
      }

      li button:last-child {
        background: #dc2626;
      }

      li button:last-child:hover {
        background: #b91c1c;
      }

      .no-services {
        text-align: center;
        color: #888;
        margin-top: 20px;
      }
    `}</style>

    <h2>Manage Services</h2>
    <input
      type="text"
      placeholder="Service Name"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    />
    <input
      type="text"
      placeholder="Price (₹)"
      value={formData.price}
      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
    />
    <textarea
      placeholder="Description"
      value={formData.description}
      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
    />
    <button onClick={handleSubmit}>
      {editId ? 'Update Service' : 'Create Service'}
    </button>

    <ul>
      {Array.isArray(services) && services.length === 0 ? (
        <p className="no-services">No services available.</p>
      ) : (
        services.map((s) => (
          <li key={s._id}>
            <strong>{s.name}</strong> - ₹{s.price} <br /> {s.description}
            <div>
              <button
                onClick={() => {
                  setEditId(s._id);
                  setFormData({
                    name: s.name,
                    description: s.description,
                    price: s.price,
                  });
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(s._id)}>Delete</button>
            </div>
          </li>
        ))
      )}
    </ul>
  </div>
);

}

