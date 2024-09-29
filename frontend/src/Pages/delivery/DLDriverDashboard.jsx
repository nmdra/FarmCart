import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeliverySidebar from '../../Components/delivery/DeliverySidebar';

const DLDriverDashboard = () => {
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAvailable, setIsAvailable] = useState(false); // State for availability
    const [ongoingDeliveries, setOngoingDeliveries] = useState([]); // State for ongoing deliveries
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDriverProfile = async () => {
            const driverToken = localStorage.getItem('driverToken'); // Get token from localStorage
            if (!driverToken) {
                navigate('/driver/login'); // If no token, redirect to login page
                return;
            }

            try {
                const { data } = await axios.get('/api/drivers/profile', {
                    headers: {
                        Authorization: `Bearer ${driverToken}`, // Pass token in headers
                    },
                });
                setDriver(data); // Set driver data from the response
                setIsAvailable(data.isAvailable); // Set initial availability

                // Fetch ongoing deliveries assigned to this driver
                const deliveriesRes = await axios.get(`/api/delivery/ongoing/${data._id}`);
                setOngoingDeliveries(deliveriesRes.data);

                setLoading(false);
            } catch (err) {
                console.error('Error fetching driver profile:', err);
                localStorage.removeItem('driverToken'); // Remove invalid token
                navigate('/driver/login'); // Redirect to login on error
            }
        };

        fetchDriverProfile(); // Fetch the driver profile on component load
    }, [navigate]);

    const handleLogout = () => {
        navigate('/driver/logout'); // Navigate to the DLlogout page
    };

    const toggleAvailability = async () => {
        const driverToken = localStorage.getItem('driverToken');
        try {
            await axios.put(
                `/api/drivers/${driver._id}/availability`, // Backend endpoint for updating availability
                { isAvailable: !isAvailable },
                {
                    headers: {
                        Authorization: `Bearer ${driverToken}`, // Pass token in headers
                    },
                }
            );
            setIsAvailable(!isAvailable); // Toggle availability state
        } catch (error) {
            console.error('Error updating availability:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <DeliverySidebar driver={driver} handleLogout={handleLogout} />
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-64 p-16 overflow-y-auto">
                <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold mb-6 text-center">Welcome, {driver.fullName}</h1>

                    {/* Profile Info */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <p className="text-lg text-gray-600">Email: {driver.email}</p>
                                <p className="text-lg text-gray-600">Vehicle: {driver.vehicleType}</p>
                                <p className="text-lg text-gray-600">Phone: {driver.phone}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={toggleAvailability}
                                    className={`px-4 py-2 text-white font-bold rounded-md ${
                                        isAvailable ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                                    }`}
                                >
                                    {isAvailable ? 'Available' : 'Unavailable'}
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* Availability Info */}
                        <div className="text-lg text-gray-700 font-semibold">
                            Availability: {isAvailable ? 'Available' : 'Not Available'}
                        </div>
                    </div>

                    {/* Ongoing Deliveries Section */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Ongoing Deliveries</h2>
                        {ongoingDeliveries.length > 0 ? (
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2 border">Tracking ID</th>
                                        <th className="px-4 py-2 border">Shop Name</th>
                                        <th className="px-4 py-2 border">Pickup Address</th>
                                        <th className="px-4 py-2 border">Dropoff Address</th>
                                        <th className="px-4 py-2 border">Status</th>
                                        <th className="px-4 py-2 border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ongoingDeliveries.map((delivery) => (
                                        <tr key={delivery._id} className="hover:bg-gray-100">
                                            <td className="px-4 py-2 border">{delivery.trackingID}</td>
                                            <td className="px-4 py-2 border">{delivery.shopName}</td>
                                            <td className="px-4 py-2 border">{delivery.pickupAddress}</td>
                                            <td className="px-4 py-2 border">{delivery.dropOffAddress}</td>
                                            <td className="px-4 py-2 border">{delivery.deliveryStatus}</td>
                                            <td className="px-4 py-2 border">
                                                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No ongoing deliveries at the moment.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DLDriverDashboard;
