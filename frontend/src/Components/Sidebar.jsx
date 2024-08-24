import React from 'react';
import { FaTachometerAlt, FaHistory, FaShoppingCart, FaCog, FaSignOutAlt } from 'react-icons/fa';

function Sidebar() {
  return (
    <aside className="absolute top-6 left-6 w-60 bg-white rounded-lg shadow-lg p-4 mt-8">
      
      <nav>
        <ul>
          <li className="mb-2">
            <a href="#" className="flex items-center p-2 rounded-lg bg-gray-100 text-gray-700">
                <FaTachometerAlt className="w-5 h-5 mr-3" />
              Dashboard
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="flex items-center p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg">
              <FaHistory className="w-5 h-5 mr-3" />
              Order History
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="flex items-center p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg">
              <FaShoppingCart className="w-5 h-5 mr-3" />
              Shopping Cart
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="flex items-center p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg">
              <FaShoppingCart className="w-5 h-5 mr-3" />
              Addresses
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="flex items-center p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg">
              <FaCog className="w-5 h-5 mr-3" />
              Settings
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg">
              
              Log-out
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

