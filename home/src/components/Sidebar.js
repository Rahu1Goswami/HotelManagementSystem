import React from 'react';
import '../css/Sidebar.css'; // Create your styles in this file
import {useNavigate} from 'react-router-dom'
const Sidebar = () => {
  const navi=useNavigate()
  return (
    <div className="sidebar">
      <div className="profile">
        <p>Hotel_Name</p>
      </div>
      <ul className="menu">
          <ul>
            <li onClick={()=>navi("/")}>Home</li>
            <li onClick={()=>navi("/employee")}>Employees</li>
          </ul>
      </ul>
    </div>
  );
};

export default Sidebar;
