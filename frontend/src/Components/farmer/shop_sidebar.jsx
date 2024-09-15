import React from 'react'
import { Link } from 'react-router-dom'
import {
    FaHome,
    FaStore,
    FaShoppingCart,
    FaTachometerAlt,
    FaProductHunt,
    FaPlus,
    FaCog,
    FaSignOutAlt,
} from 'react-icons/fa'

const Sidebar = () => {
    const id = localStorage.getItem('shopId')
    return (
        <div className="bg-white p-4 w-48 shadow-md rounded-lg">
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
                            to={`/shop/${id}`}
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaTachometerAlt className="w-5 h-5 mr-3" />
                            <span>Shop Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="#"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaShoppingCart className="w-5 h-5 mr-3" />
                            <span>My Orders</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`/shop/${id}/productpage`}
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaProductHunt className="w-5 h-5 mr-3" />
                            <span>Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/addproduct"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaPlus className="w-5 h-5 mr-3" />
                            <span>Add Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/shop/profile"
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
