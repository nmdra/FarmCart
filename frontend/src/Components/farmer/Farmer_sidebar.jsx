import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="bg-white p-4 w-48 shadow-md rounded-lg">
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link
                            to="/farmerdashboard"
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
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/myshops"
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            My Shops
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/shopcreate"
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            Create new shop
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/farmerprofile"
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/logout"
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
