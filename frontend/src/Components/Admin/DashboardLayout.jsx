import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { FiUser, FiUsers, FiTag, FiBarChart2 } from 'react-icons/fi' // Example icons

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-md pl-8 pt-16 border-r border-gray-200">
                <h1 className="text-3xl font-bold text-[#99DD05] mb-8">
                    Farmcart
                </h1>
                <nav className="space-y-6">
                    <ul className="space-y-4">
                        <li>
                            <Link
                                to="/Admindashboard/customer"
                                className="flex items-center text-lg text-gray-700 hover:text-[#99DD05] transition duration-200"
                            >
                                <FiUser className="mr-2" /> Customer
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Admindashboard/staff"
                                className="flex items-center text-lg text-gray-700 hover:text-[#99DD05] transition duration-200"
                            >
                                <FiUsers className="mr-2" /> Staff
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Admindashboard/offers"
                                className="flex items-center text-lg text-gray-700 hover:text-[#99DD05] transition duration-200"
                            >
                                <FiTag className="mr-2" /> Offers
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Admindashboard/financial-analysis"
                                className="flex items-center text-lg text-gray-700 hover:text-[#99DD05] transition duration-200"
                            >
                                <FiBarChart2 className="mr-2" /> Financial
                                Analysis
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-10 bg-[#f3ffc6] text-black overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-semibold text-gray-700">
                        Dashboard
                    </h1>
                    <p className="text-gray-500">Welcome back, Admin!</p>
                </header>

                {/* Analytics and Quick Actions Section */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Analytics Cards */}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-l-4 border-[#99DD05]">
                        <h2 className="text-lg font-medium text-gray-600">
                            Total Users
                        </h2>
                        <p className="text-3xl font-bold text-gray-900">
                            1,234
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-l-4 border-[#99DD05]">
                        <h2 className="text-lg font-medium text-gray-600">
                            Active Promotions
                        </h2>
                        <p className="text-3xl font-bold text-gray-900">24</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-l-4 border-[#99DD05]">
                        <h2 className="text-lg font-medium text-gray-600">
                            Total Revenue
                        </h2>
                        <p className="text-3xl font-bold text-gray-900">
                            $45,780
                        </p>
                    </div>
                </section>

                {/* Recent Activity and Table Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            Recent Activity
                        </h2>
                        <ul className="space-y-3">
                            <li className="flex justify-between text-gray-600">
                                <span>New customer signed up</span>
                                <span>2 hours ago</span>
                            </li>
                            <li className="flex justify-between text-gray-600">
                                <span>Order #1245 placed</span>
                                <span>4 hours ago</span>
                            </li>
                            <li className="flex justify-between text-gray-600">
                                <span>Product promotion updated</span>
                                <span>6 hours ago</span>
                            </li>
                            <li className="flex justify-between text-gray-600">
                                <span>Staff member added</span>
                                <span>8 hours ago</span>
                            </li>
                        </ul>
                    </div>

                    {/* Data Table */}
                    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            Recent Customers
                        </h2>
                        <table className="min-w-full bg-white">
                            <thead className="bg-[#99DD05] text-white">
                                <tr>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Phone</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-3 text-gray-600">
                                        John Doe
                                    </td>
                                    <td className="p-3 text-gray-600">
                                        john@example.com
                                    </td>
                                    <td className="p-3 text-gray-600">
                                        123-456-7890
                                    </td>
                                    <td className="p-3">
                                        <button className="bg-[#99DD05] text-white px-3 py-1 rounded hover:bg-green-700">
                                            View
                                        </button>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                {/* Add more rows */}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Render nested routes or content */}
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout
