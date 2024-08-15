import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="#">Shop Profile</Link></li>
        <li><Link to="#">My Orders</Link></li>
        <li><Link to="">Products</Link></li>
        <li><Link to="#">Settings</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
