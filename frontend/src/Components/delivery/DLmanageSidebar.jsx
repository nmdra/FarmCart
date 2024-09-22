import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaTachometerAlt,
    FaTruck,
    FaUsers,
    FaUserCheck,
    FaBell,
    FaSignOutAlt,
} from 'react-icons/fa'; // Importing relevant icons

const DLmanageSidebar = () => {
    return (
        <aside className="absolute top-6 left-6 w-60 bg-white rounded-lg shadow-lg p-4 mt-8">
            <nav>
                <ul>
                    <li className="mb-2">
                        <Link
                            to="/manager/dashboard"
                            className="flex items-center p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-green-500 hover:text-white"
                        >
                            <FaTachometerAlt className="w-5 h-5 mr-3" />
                            Dashboard
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="/deliveries"
                            className="flex items-center p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg hover:bg-green-500 hover:text-white"
                        >
                            <FaTruck className="w-5 h-5 mr-3" />
                            Deliveries
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="/alldrivers"
                            className="flex items-center p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg hover:bg-green-500 hover:text-white"
                        >
                            <FaUsers className="w-5 h-5 mr-3" />
                            Drivers
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="/manager/approve-driver"
                            className="flex items-center p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg hover:bg-green-500 hover:text-white"
                        >
                            <FaUserCheck className="w-5 h-5 mr-3" />
                            Pending Drivers
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="/notifications"
                            className="flex items-center p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg hover:bg-green-500 hover:text-white"
                        >
                            <FaBell className="w-5 h-5 mr-3" />
                            Notifications
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/logout"
                            className="flex items-center p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg hover:bg-green-500 hover:text-white"
                        >
                            <FaSignOutAlt className="w-5 h-5 mr-3" />
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default DLmanageSidebar;
