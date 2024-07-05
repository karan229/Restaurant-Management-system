import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem('userEmail');
      if (!email) {
        setError('No admin email found in local storage');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/admin-details?email=${email}`);
        setUserData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  const defaultImage = '/default.png';

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin</h1>
      {userData ? (
        <div className="admin-details">
          <img
            className="admin-image"
            src={userData.profilePicture || defaultImage}
            alt="Admin"
          />
          <p className="admin-welcome">Welcome, {userData.username}!</p>
          <p className="admin-info">Email: {userData.email}</p>
          <p className="admin-info">Joining Date: {new Date(userData.joiningDate).toLocaleDateString()}</p>
          <p className="admin-info">Status: {userData.status}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p className="admin-error">Error: Not an Admin {error}</p>}
    </div>
  );
}

export default Admin;
