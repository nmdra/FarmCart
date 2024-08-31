import React from 'react'
import { Link } from 'react-router-dom'
<<<<<<< HEAD
=======
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
>>>>>>> 96bf5efbafa3f4bc06d507edf09941f40b4ec754

const Sidebar = () => {
    const id = localStorage.getItem('shopId')
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
                            to={`/shop/${id}`}
<<<<<<< HEAD
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            Shop Dashboard
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
>>>>>>> 96bf5efbafa3f4bc06d507edf09941f40b4ec754
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`/shop/${id}/productpage`}
<<<<<<< HEAD
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            Products
=======
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaProductHunt className="w-5 h-5 mr-3" />
                            <span>Products</span>
>>>>>>> 96bf5efbafa3f4bc06d507edf09941f40b4ec754
                        </Link>
                    </li>
                    <li>
                        <Link
<<<<<<< HEAD
                            to={'/addproduct'}
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            Add Products
=======
                            to="/addproduct"
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            <FaPlus className="w-5 h-5 mr-3" />
                            <span>Add Products</span>
>>>>>>> 96bf5efbafa3f4bc06d507edf09941f40b4ec754
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/shop/profile"
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
