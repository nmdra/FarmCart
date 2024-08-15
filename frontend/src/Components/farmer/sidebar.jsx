import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="bg-white space-x-8 mb-8 ">
      <ul className="space-y-4">
        <li>
          <Link 
            to="#" 
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
            to="" 
            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded"
          >
            My Shop
          </Link>
        </li>
        <li>
          <Link 
            to="#" 
            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded"
          >
            Settings
          </Link>
        </li>
        <li>
          <Link 
            to="#" 
            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded"
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
