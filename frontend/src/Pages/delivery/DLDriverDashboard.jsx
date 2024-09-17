import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeliverySidebar from '../../Components/delivery/DeliverySidebar';

const DLDriverDashboard = () => {
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true);
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

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex">
            <DeliverySidebar />
            <div className="p-6 w-full">
                <h1 className="text-2xl font-bold">Welcome, {driver.fullName}</h1>
                <p>Email: {driver.email}</p>
                <p>Vehicle: {driver.vehicleType}</p>
                <p>Phone: {driver.phone}</p>
                <p>Availability: {driver.isAvailable ? 'Available' : 'Not Available'}</p>
                <button
                    onClick={handleLogout}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default DLDriverDashboard;
