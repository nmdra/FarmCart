import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeliverySidebar from '../../Components/delivery/DeliverySidebar';

const DLDriverDashboard = () => {
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAvailable, setIsAvailable] = useState(false); // State for availability
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
                        Authorization: `Bearer ${driverToken}` // Pass token in headers
                    }
                });
                setDriver(data); // Set driver data from the response
                setIsAvailable(data.isAvailable); // Set initial availability
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
                        Authorization: `Bearer ${driverToken}` // Pass token in headers
                    }
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
                <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
                    <h1 className="text-3xl font-bold mb-6 text-center">Welcome, {driver.fullName}</h1>
                    
                    {/* Profile Info */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <p className="text-gray-600">Email: {driver.email}</p>
                                <p className="text-gray-600">Vehicle: {driver.vehicleType}</p>
                                <p className="text-gray-600">Phone: {driver.phone}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={toggleAvailability}
                                    className={`px-4 py-2 text-white rounded-md ${
                                        isAvailable ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                                >
                                    {isAvailable ? 'Available' : 'Unavailable'}
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* Availability Info */}
                        <p className="text-gray-700 font-semibold">
                            Availability: {isAvailable ? 'Available' : 'Not Available'}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DLDriverDashboard;
