import React from 'react';
import '../css/Header.css';
import {useNavigate} from 'react-router-dom'
const Header = () => {
  const navigate=useNavigate()
  return (
    <div className="header">
      <input type="text" placeholder="Search..." className="search-input" />
      <div className="user-actions">
        <button className="add-booking"onClick={()=>navigate('/booking')}>Add Booking</button>
        <hr />
      </div>
    </div>
  );
};

export default Header;
