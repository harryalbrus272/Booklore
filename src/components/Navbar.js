import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleSearch = () => {};
  return (
    <div className="nav">
      <div className="logo">
        <Link to="/">
          <h1>Booklore</h1>
        </Link>
      </div>
      <div className="search">
        <input placeholder="Search" onChange={(e) => handleSearch(e)} />
      </div>
      <div className="menu">
        <ul className="horizontal-list">
          <Link to="/signin">
            <li>Sign In</li>
          </Link>
          <Link to="/signup">
            <li>Sign Up</li>
          </Link>
          <li>
            <button>Log Out</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
