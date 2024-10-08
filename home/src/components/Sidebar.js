import React from 'react';
import '../css/Sidebar.css'; // Create your styles in this file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile">
        <p>Hotel_Name</p>
      </div>
      <ul className="menu">
        <li>Home</li>
          <ul>
            <li>Front Desk</li>
            <li>Reservations</li>
            <li>Guests</li>
            <li>Housekeeping</li>
          </ul>
      </ul>
    </div>
  );
};

export default Sidebar;
