import React from 'react';
import './Navbar.css';
import { FaBell, FaCog } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="search-bar">
        <input type="text" placeholder="Search (Ctrl+/)" />
      </div>
      <div className="icons">
        <FaBell className="icon" />
        <FaCog className="icon" />
      </div>
    </nav>
  );
};

export default Navbar;
