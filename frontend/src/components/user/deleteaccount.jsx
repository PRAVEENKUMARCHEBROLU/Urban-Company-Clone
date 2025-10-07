import React, { useState, useContext } from 'react';
import { deleteUser } from '../../api/auth.jsx';
import AuthContext from '../../context/authcontext.jsx';

const DeleteAccount = () => {
  const { token, logout } = useContext(AuthContext); // ✅ Use context
  const [message, setMessage] = useState('');
  const [confirm, setConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteUser(token);
      setMessage('Your account has been deleted.');
      logout(); // ✅ Log out the user after deletion
    } catch (error) {
      console.error(error);
      setMessage('Failed to delete account.');
    }
  };

  return (
    <div>
      {confirm ? (
        <>
          <p>Are you absolutely sure?</p>
          <button onClick={handleDelete}>Yes, Delete</button>
          <button onClick={() => setConfirm(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setConfirm(true)}>Delete Account</button>
      )}
      <p>{message}</p>
    </div>
  );
};

export default DeleteAccount;

