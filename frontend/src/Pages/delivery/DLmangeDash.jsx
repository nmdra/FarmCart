import React, { useState, useEffect } from 'react';
import DLmanageSidebar from '../../Components/delivery/DLmanageSidebar';
import axios from '../../../axios'; // Update the axios path as per your project structure

const DLmanageDash = () => {
    const [stats, setStats] = useState({
        totalDrivers: 0,
        availableDrivers: 0,
        ongoingOrders: 0,
        pendingOrders: 0,
    });

    // Fetch the counts for total drivers, available drivers, ongoing orders, and pending orders
    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch total drivers count
                const totalDriversRes = await axios.get('/drivers/count');
                const availableDriversRes = await axios.get('/drivers/available/count');
                const ongoingOrdersRes = await axios.get('/orders/ongoing/count');
                const pendingOrdersRes = await axios.get('/orders/pending/count');

                setStats({
                    totalDrivers: totalDriversRes.data.count,
                    availableDrivers: availableDriversRes.data.count,
                    ongoingOrders: ongoingOrdersRes.data.count,
                    pendingOrders: pendingOrdersRes.data.count,
                });
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside>
                <DLmanageSidebar />
            </aside>

            {/* Main content */}
            <div className="flex-1 ml-64 p-12 bg-white">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Delivery Manager Dashboard</h1>

                {/* Statistics Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-green-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-green-800">Total Drivers</h2>
                        <p className="text-4xl font-bold text-green-800 mt-4">{stats.totalDrivers}</p>
                    </div>
                    <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-blue-800">Available Drivers</h2>
                        <p className="text-4xl font-bold text-blue-800 mt-4">{stats.availableDrivers}</p>
                    </div>
                    <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-yellow-800">Ongoing Orders</h2>
                        <p className="text-4xl font-bold text-yellow-800 mt-4">{stats.ongoingOrders}</p>
                    </div>
                    <div className="bg-red-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-red-800">Pending Orders</h2>
                        <p className="text-4xl font-bold text-red-800 mt-4">{stats.pendingOrders}</p>
                    </div>
                </div>

                {/* Recent Driver Requests */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-bold mb-4">Recent Driver Requests</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 text-left border">Driver Name</th>
                                    <th className="px-4 py-2 text-left border">Vehicle Type</th>
                                    <th className="px-4 py-2 text-left border">Request Date</th>
                                    <th className="px-4 py-2 text-left border">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Sample driver requests */}
                                <tr className="bg-white">
                                    <td className="px-4 py-2 border">Nimendra</td>
                                    <td className="px-4 py-2 border">Bike</td>
                                    <td className="px-4 py-2 border">12 Sep, 2023</td>
                                    <td className="px-4 py-2 border">
                                        <span className="bg-yellow-500 text-white px-2 py-1 rounded">Pending</span>
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="px-4 py-2 border">Sanjeewa</td>
                                    <td className="px-4 py-2 border">Lorry</td>
                                    <td className="px-4 py-2 border">10 Sep, 2023</td>
                                    <td className="px-4 py-2 border">
                                        <span className="bg-green-500 text-white px-2 py-1 rounded">Approved</span>
                                    </td>
                                </tr>
                                {/* Add more rows as needed */}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Ongoing Deliveries Section */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Ongoing Deliveries</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 text-left border">Delivery ID</th>
                                    <th className="px-4 py-2 text-left border">Driver Name</th>
                                    <th className="px-4 py-2 text-left border">Vehicle Type</th>
                                    <th className="px-4 py-2 text-left border">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white">
                                    <td className="px-4 py-2 border">#1234</td>
                                    <td className="px-4 py-2 border">Dasun </td>
                                    <td className="px-4 py-2 border">Bike</td>
                                    <td className="px-4 py-2 border">
                                        <span className="bg-blue-500 text-white px-2 py-1 rounded">In Progress</span>
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="px-4 py-2 border">#5678</td>
                                    <td className="px-4 py-2 border">Ishara</td>
                                    <td className="px-4 py-2 border">Lorry</td>
                                    <td className="px-4 py-2 border">
                                        <span className="bg-green-500 text-white px-2 py-1 rounded">Completed</span>
                                    </td>
                                </tr>
                                {/* Add more rows as needed */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DLmanageDash;
