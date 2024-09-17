import React from 'react';
import { Link } from 'react-router-dom';

const DeliverySidebar = () => {
    return (
        <div className="bg-white p-4 w-48 shadow-md rounded-lg">
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link to="/driver/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/driver/orders" className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left">
                            My Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="/driver/profile" className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/driver/settings" className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left">
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link to="/driver/logout" className="block px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white rounded text-left">
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default DeliverySidebar;
