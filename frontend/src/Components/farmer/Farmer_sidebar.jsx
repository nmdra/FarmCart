import React from 'react'
import { Link } from 'react-router-dom'
import {
    FaHome,
    FaStore,
    FaCog,
    FaSignOutAlt,
    FaPlusSquare,
} from 'react-icons/fa'

const Sidebar = () => {
    return (
        <div className="bg-white mt-8 p-4 w-48 shadow-md rounded-lg">
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link
                            to="/farmerdashboard"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaHome className="w-5 h-5 mr-3" />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/myshops"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaStore className="w-5 h-5 mr-3" />
                            <span>My Shops</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/shopcreate"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaPlusSquare className="w-5 h-5 mr-3" />
                            <span>Create new shop</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/farmerprofile"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaCog className="w-5 h-5 mr-3" />
                            <span>Settings</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/farmerlogout"
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

export default Sidebar
