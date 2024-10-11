import React from 'react'
import { Link } from 'react-router-dom'
import {
    FaHome,
    FaUsers,
    FaUserAlt,
    FaTags,
    FaChartLine,
    FaSignOutAlt,
    FaTruck,
} from 'react-icons/fa'

const AdminSidebar = () => {
    return (
        <div className="bg-white mt-8 p-4 w-48 shadow-md rounded-lg">
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link
                            to="/admindashboard"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaHome className="w-5 h-5 mr-3" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/staff"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaUsers className="w-5 h-5 mr-3" />
                            <span>Staff</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/users"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaUserAlt className="w-5 h-5 mr-3" />
                            <span>Users</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/coupons"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaTags className="w-5 h-5 mr-3" />
                            <span>Coupons</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/manager/dashboard"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaTruck className="w-5 h-5 mr-3" />
                            <span>Drivers</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/finance"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaChartLine className="w-5 h-5 mr-3" />
                            <span>Finance</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/logout"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaSignOutAlt className="w-5 h-5 mr-3" />
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default AdminSidebar
