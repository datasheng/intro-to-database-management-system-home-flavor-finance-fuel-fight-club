import React from 'react';
import './Profile.css'; // Import the CSS for styling

const Profile = ({ user }) => {
  // Assuming 'user' is an object with properties 'username' and 'email'
  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-info">
        <p>Username</p>
        <p>Email</p>
      </div>
    </div>
  );
};

export default Profile;
