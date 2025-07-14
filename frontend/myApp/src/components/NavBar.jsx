import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)',
    padding: '16px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 16px',
    fontWeight: '500',
    fontSize: '16px'
  };

  return (
    <nav style={navStyle}>
      <h2 style={{ margin: 0 }}>Inventory Manager</h2>
      <div>
        <Link to="/" style={linkStyle}>Product List</Link>
        <Link to="/add" style={linkStyle}>Add Product</Link>
      </div>
    </nav>
  );
};

export default Navbar;
