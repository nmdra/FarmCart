import React from 'react';
import { Link } from 'react-router-dom';

const DeliverySidebar = ({ driver }) => { 
    return (
        <div className="bg-white p-4 w-48 shadow-md rounded-lg">
            {/* Driver Avatar and Welcome Message */}
            <div className="mb-4">
                <img
                    src={driver?.personalImageUrl || 'default-avatar.png'} // Display driver image or a default avatar
                    alt="Driver Avatar"
                    className="w-16 h-16 rounded-full mx-auto"
                />
                <p className="mt-2 text-center text-gray-700">Hello, {driver?.fullName}</p>
            </div>

            {/* Navigation Links */}
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link
                            to="/driver/dashboard"
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/driver/ongoing-deliveries"
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            Ongoing Deliveries
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/driver/deliveries"
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            Deliveries
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/driver/profile"
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/driver/settings"
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/driver/logout" // Link to the DLLogout page for logout functionality
                            className="w-full block px-4 py-2 text-gray-700 hover:bg-red-500 hover:text-white rounded text-left"
                        >
                            Log-out
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default DeliverySidebar;
