import { useState } from 'react';
import AllUsers from '../components/admin/allusers.jsx';
import AllProviders from '../components/admin/allproviders.jsx';
import AllBookings from '../components/admin/allbookings.jsx';
import ManageServices from '../components/admin/manageservices.jsx';

export default function AdminDashboard() {
  const [tab, setTab] = useState('users');

  const renderComponent = () => {
    switch (tab) {
      case 'users':
        return <AllUsers />;
      case 'providers':
        return <AllProviders />;
      case 'services':
        return <ManageServices />;
      case 'bookings':
        return <AllBookings />;
      default:
        return <p>Select a tab</p>;
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>

      <div style={{ marginBottom: '1rem' }}>
        {['users', 'providers', 'services', 'bookings'].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            style={{
              marginRight: '1rem',
              padding: '0.5rem 1rem',
              fontWeight: tab === item ? 'bold' : 'normal',
              background: tab === item ? '#333' : '#eee',
              color: tab === item ? '#fff' : '#000',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>{renderComponent()}</div>
    </div>
  );
}

