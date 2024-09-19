import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaTachometerAlt,
    FaTruck,
    FaClipboardList,
    FaUser,
    FaCog,
    FaSignOutAlt,
} from 'react-icons/fa'; // Importing icons from react-icons

const DeliverySidebar = ({ driver }) => {
    return (
        <aside className="absolute top-6 left-6 w-60 bg-white rounded-lg shadow-lg p-4 mt-8">
            {/* Driver Avatar and Welcome Message */}
            <div className="mb-6 text-center">
                <img
                    src={driver?.personalImageUrl || 'default-avatar.png'} // Display driver image or a default avatar
                    alt="Driver Avatar"
                    className="w-16 h-16 rounded-full mx-auto"
                />
                <p className="mt-2 text-gray-700">Hello, {driver?.fullName}</p>
            </div>

            {/* Navigation Links */}
            <nav>
                <ul>
                    <li className="mb-2">
                        <Link
                            to="/driver/dashboard"
                            className="flex items-center p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-green-500 hover:text-white"
                        >
                            <FaTachometerAlt className="w-5 h-5 mr-3" />
                            Dashboard
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="/driver/ongoing-deliveries"
                            className="flex items-center p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg hover:bg-green-500 hover:text-white"
                        >
                            <FaTruck className="w-5 h-5 mr-3" />
                            Ongoing Deliveries
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="/driver/deliveries"
                            className="flex items-center p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg hover:bg-green-500 hover:text-white"
                        >
                            <FaClipboardList className="w-5 h-5 mr-3" />
                            Deliveries
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="/driver/profile"
                            className="flex items-center p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg hover:bg-green-500 hover:text-white"
                        >
                            <FaUser className="w-5 h-5 mr-3" />
                            Profile
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link
                            to="/driver/settings"
                            className="flex items-center p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg hover:bg-green-500 hover:text-white"
                        >
                            <FaCog className="w-5 h-5 mr-3" />
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/driver/logout"
                            className="flex items-center p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg hover:bg-red-500 hover:text-white"
                        >
                            <FaSignOutAlt className="w-5 h-5 mr-3" />
                            Log-out
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default DeliverySidebar;
