import React, { useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();  // Use useNavigate for navigation

  // Predefined search keywords and corresponding URLs
  const urlMap = {
    "Main Analytics": "/AnalyticDashboards",
    "Developer Performance": "/DeveloperPerformanceDashboard",
    "Repository": "/RepositoryDashboard",
    "Organization": "/Organization",
    "Profile": "/Profile",
    "Logout": "/Logout"
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();  // Prevent the default form submission behavior
    const normalizedInput = searchInput.trim().toLowerCase();

    // Find the first matching keyword and navigate to the corresponding URL
    const matchedKey = Object.keys(urlMap).find(key =>
      key.toLowerCase().includes(normalizedInput)
    );

    if (matchedKey) {
      navigate(urlMap[matchedKey]);
    } else {
      console.log("No matching dashboard found.");
    }
  };

  return (
    <nav className="navbar">
      <form onSubmit={handleSearchSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search (Ctrl+/)"
          value={searchInput}
          onChange={handleInputChange}
        />
      </form>
    </nav>
  );
};

export default Navbar;
