import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure this path is correct
import DLmanageSidebar from '../../Components/delivery/DLmanageSidebar'; // Sidebar component

const DLmanageDash = () => {
    const [stats, setStats] = useState({
        totalDrivers: 0,
        availableDrivers: 0,
        totalDeliveries: 0,
        ongoingDeliveries: 0,
        pendingOrders: 0,
    });

    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch statistics when the component mounts
    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch total drivers count
                const totalDriversRes = await axios.get('/api/drivers/count');
                // Fetch available drivers count
                const availableDriversRes = await axios.get('/api/drivers/available/count');
                // Fetch total deliveries count
                const totalDeliveriesRes = await axios.get('/api/delivery/total/count');
                // Fetch ongoing deliveries count (where status != "Delivered")
                const ongoingDeliveriesRes = await axios.get('/api/delivery/ongoing/count');

                // Update the stats state with the fetched data
                setStats({
                    totalDrivers: totalDriversRes.data.count,
                    availableDrivers: availableDriversRes.data.count,
                    totalDeliveries: totalDeliveriesRes.data.count,
                    ongoingDeliveries: ongoingDeliveriesRes.data.count,
                });
            } catch (error) {
                console.error('Error fetching statistics:', error);
                setError('Failed to fetch statistics'); // Set error message
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Display a loading message while fetching data
    }

    if (error) {
        return <div className="text-red-500">{error}</div>; // Display error message if any
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <DLmanageSidebar />
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-64 p-16 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md">
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
                            <h2 className="text-lg font-semibold text-yellow-800">Ongoing Deliveries</h2>
                            <p className="text-4xl font-bold text-yellow-800 mt-4">{stats.ongoingDeliveries}</p>
                        </div>
                        <div className="bg-red-100 p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-red-800">Total Deliveries</h2>
                            <p className="text-4xl font-bold text-red-800 mt-4">{stats.totalDeliveries}</p>
                        </div>
                    </div>

                    {/* You can add additional sections here */}

                </div>
            </main>
        </div>
    );
};

export default DLmanageDash;
