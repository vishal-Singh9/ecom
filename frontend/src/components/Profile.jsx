import React, { useState, useEffect } from 'react';
import '../App.css';

function Profile() {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setError('User data not found');
    }
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Profile</h1>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <p><span>Username:</span> {user.name}</p>
            <p><span>Email:</span> {user.email}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
