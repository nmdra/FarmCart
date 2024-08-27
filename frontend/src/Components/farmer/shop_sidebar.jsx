import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const id = localStorage.getItem('shopId')
    return (
        <div className="bg-white p-4 w-48 shadow-md rounded-lg">
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link
                            to="/farmerdashboard"
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            Home
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
                            to={`/shop/${id}`}
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
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`/shop/${id}/productpage`}
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={'/addproduct'}
                            className="block px-4 py-2 text-gray-700 hover:bg-green-500 hover:text-white rounded text-left"
                        >
                            Add Products
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/shop/profile"
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
