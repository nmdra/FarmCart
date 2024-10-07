import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
    FaTachometerAlt,
    FaTruck,
    FaUsers,
    FaUserCheck,
    FaBell,
    FaSignOutAlt,
} from 'react-icons/fa' // Importing relevant icons

const DLmanageSidebar = () => {
    return (
        <aside className="absolute top-6 left-6 w-60 bg-white rounded-lg shadow-lg p-4 mt-8">
            <nav>
                <ul className="space-y-4">
                    <li>
                        <NavLink
                            to="/manager/dashboard"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 ${
                                    isActive
                                        ? 'bg-gray-100 border-l-4 border-green-700'
                                        : ''
                                }`
                            }
                        >
                            <FaTachometerAlt className="w-5 h-5 mr-3" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/DLAllDeliveries"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 ${
                                    isActive
                                        ? 'bg-gray-100 border-l-4 border-green-700'
                                        : ''
                                }`
                            }
                        >
                            <FaTruck className="w-5 h-5 mr-3" />
                            Deliveries
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/alldrivers"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 ${
                                    isActive
                                        ? 'bg-gray-100 border-l-4 border-green-700'
                                        : ''
                                }`
                            }
                        >
                            <FaUsers className="w-5 h-5 mr-3" />
                            Drivers
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/manager/approve-driver"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 ${
                                    isActive
                                        ? 'bg-gray-100 border-l-4 border-green-700'
                                        : ''
                                }`
                            }
                        >
                            <FaUserCheck className="w-5 h-5 mr-3" />
                            Pending Drivers
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/notifications"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 ${
                                    isActive
                                        ? 'bg-gray-100 border-l-4 border-green-700'
                                        : ''
                                }`
                            }
                        >
                            {/* <FaBell className="w-5 h-5 mr-3" />
                           Notifications*/}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/"
                            className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100"
                        >
                            <FaSignOutAlt className="w-5 h-5 mr-3" />
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default DLmanageSidebar
