import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
     <div className="bg-white p-4 w-48 shadow-md rounded-lg">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link 
              to="/dashboard" 
              className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="#" 
              className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded"
            >
              My Orders
            </Link>
          </li>
          <li>
            <Link 
              to="/myshop" 
              className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded"
            >
              My Shops
            </Link>
          </li>
          <li>
            <Link 
              to="/shopcreate" 
              className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded"
            >
              Create new shop
            </Link>
          </li>
          <li>
            <Link 
              to="/ownerprofile" 
              className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link 
              to="/logout" 
              className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded"
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
