import React from 'react'
import { Link } from 'react-router-dom'
<<<<<<< HEAD
=======
import {
    FaHome,
    FaStore,
    FaCog,
    FaSignOutAlt,
    FaPlusSquare,
} from 'react-icons/fa'
>>>>>>> 96bf5efbafa3f4bc06d507edf09941f40b4ec754

const Sidebar = () => {
    return (
        <div className="bg-white p-4 w-48 shadow-md rounded-lg">
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link
                            to="/farmerdashboard"
<<<<<<< HEAD
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#"
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            My Orders
=======
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaHome className="w-5 h-5 mr-3" />
                            <span>Home</span>
>>>>>>> 96bf5efbafa3f4bc06d507edf09941f40b4ec754
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/myshops"
<<<<<<< HEAD
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            My Shops
=======
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaStore className="w-5 h-5 mr-3" />
                            <span>My Shops</span>
>>>>>>> 96bf5efbafa3f4bc06d507edf09941f40b4ec754
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/shopcreate"
<<<<<<< HEAD
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            Create new shop
=======
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaPlusSquare className="w-5 h-5 mr-3" />
                            <span>Create new shop</span>
>>>>>>> 96bf5efbafa3f4bc06d507edf09941f40b4ec754
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/farmerprofile"
<<<<<<< HEAD
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            Settings
=======
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaCog className="w-5 h-5 mr-3" />
                            <span>Settings</span>
>>>>>>> 96bf5efbafa3f4bc06d507edf09941f40b4ec754
                        </Link>
                    </li>
                    <li>
                        <Link
<<<<<<< HEAD
                            to="/logout"
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            Logout
=======
                            to="/farmerlogout"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaSignOutAlt className="w-5 h-5 mr-3" />
                            <span>Logout</span>
>>>>>>> 96bf5efbafa3f4bc06d507edf09941f40b4ec754
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
