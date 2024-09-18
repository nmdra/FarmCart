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
        localStorage.removeItem('driverToken'); // Remove the token
        navigate('/driver/login'); // Redirect to login page
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
        <div className="flex">
            <DeliverySidebar driver={driver} handleLogout={handleLogout} /> {/* Pass handleLogout to sidebar */}
            
            <div className="p-6 w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Welcome, {driver.fullName}</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={toggleAvailability}
                        className={`px-4 py-2 text-white rounded ${
                            isAvailable ? 'bg-green-500' : 'bg-red-500'
                        }`}
                    >
                        {isAvailable ? 'Available' : 'Unavailable'}
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
            <p>Email: {driver.email}</p>
            <p>Vehicle: {driver.vehicleType}</p>
            <p>Phone: {driver.phone}</p>
            <p>Availability: {isAvailable ? 'Available' : 'Not Available'}</p>
        </div>
    </div>
);
};

export default DLDriverDashboard;
