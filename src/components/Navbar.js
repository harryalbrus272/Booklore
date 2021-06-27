import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleSearch = () => {};
  return (
    <div className="navbar">
      <div className="left-div">
        <Link to="/">
          <h1>Booklore</h1>
        </Link>
      </div>
      <div className="right-div">
        <input placeholder="Search" onChange={(e) => handleSearch(e)} />
      </div>
    </div>
  );
};

export default Navbar;
