import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  return (
    <div className="nav-container">
      <div className="nav-content">
        <h1 className="nav-title">CREATORVERSE</h1>
        <div className="nav-buttons">
          <Link to="/" className="nav-button">Show Creators</Link>
          <Link to="/add" className="nav-button">Add Creator</Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
