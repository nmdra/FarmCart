import React from 'react';
import Sidebar from '../Components/Sidebar'; // Import the Sidebar component
import OrderHistory from '../Components/OrderTable';
import OrderTable from '../Components/OrderTable';

function Dashboard() {
    return (
        <div className="relative min-h-screen bg-neutral-100 pr-36 pl-36">
            {/* Floating Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="pl-72 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {/* Profile Section */}
                    <div className="flex col-span-1 bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-700">
                        <div className="flex items-center">
                            <img
                                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                alt="Profile"
                                className="h-16 w-16 rounded-full object-cover"
                            />
                            <div className="ml-4">
                                <h2 className="text-xl font-semibold">
                                    M. Sirisena
                                </h2>
                                <p className="text-gray-600">
                                    Regular Customer
                                </p>
                                <a
                                    href="#"
                                    className="text-sm text-green-600 hover:underline"
                                >
                                    Edit Profile
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Billing Address */}
                    <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-700">
                        <h3 className="text-sm font-semibold text-gray-500">
                            BILLING ADDRESS
                        </h3>
                        <p className="mt-2 text-gray-700">M. Sirisena</p>
                        <p className="text-gray-500">
                            No. 61, Mahagamasekara Mawatha, New town,
                            Polonnaruwa.
                        </p>
                        <p className="text-gray-500">sirisena@gmail.com</p>
                        <p className="text-gray-500">027 2222301</p>
                        <a
                            href="#"
                            className="text-sm text-green-600 hover:underline"
                        >
                            Edit Address
                        </a>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border-2 border-green-400 mt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Recent Orders
                    </h2>
                    <OrderTable rowsPerPage={4} paginateOn={false} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
