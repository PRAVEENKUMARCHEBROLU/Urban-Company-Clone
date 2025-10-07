// components/admin/allusers.jsx
import { useEffect, useState, useContext } from 'react';
import { getAllUsers } from '../../api/auth.jsx';
import AuthContext from '../../context/authcontext.jsx';

function AllUsers() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      try {
        const res = await getAllUsers(token);

        // ✅ If backend sends { users: [...] }
        setUsers(res.data.users);

        // ✅ If backend sends an array directly, use:
        // setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="container">
        <style>{`
    .container {
      font-family: 'Segoe UI', Tahoma, sans-serif;
      max-width: 900px;
      margin: 40px auto;
      padding: 20px;
    }

    h2 {
      font-size: 28px;
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }

    .no-users {
      text-align: center;
      color: #888;
      font-size: 18px;
    }

    .user-card {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 16px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      padding: 20px;
      margin-bottom: 20px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .user-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .user-card p {
      margin: 8px 0;
      font-size: 16px;
      color: #555;
    }

    .user-card p strong {
      color: #222;
    }
  `}</style>
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <div className="user-card" key={user._id}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AllUsers;
