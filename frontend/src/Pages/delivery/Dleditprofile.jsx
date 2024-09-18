import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeliverySidebar from '../../Components/delivery/DeliverySidebar';

const DLEditProfile = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [driver, setDriver] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Fetch driver profile for sidebar
    useEffect(() => {
        const fetchDriverProfile = async () => {
            const driverToken = localStorage.getItem('driverToken');
            if (!driverToken) {
                navigate('/driver/login'); // Redirect to login if not authenticated
                return;
            }

            try {
                const { data } = await axios.get('/api/drivers/profile', {
                    headers: {
                        Authorization: `Bearer ${driverToken}`,
                    },
                });
                setDriver(data); // Set driver data for the sidebar
                setLoading(false);
            } catch (error) {
                console.error('Error fetching driver profile:', error);
                localStorage.removeItem('driverToken');
                navigate('/driver/login');
            }
        };

        fetchDriverProfile();
    }, [navigate]);

    // Handle form submission for updating the password
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Confirm before submitting
        const confirmChange = window.confirm('Are you sure you want to change your password?');
        if (!confirmChange) return;

        const driverToken = localStorage.getItem('driverToken');
        try {
            await axios.put(
                '/api/drivers/profile/password',
                { currentPassword, newPassword, confirmPassword },
                {
                    headers: {
                        Authorization: `Bearer ${driverToken}`,
                    },
                }
            );
            alert('Password updated successfully');
            navigate('/driver/profile');
        } catch (error) {
            setMessage(error.response.data.message || 'Error updating password');
        }
    };

    // Handle account deletion
    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');

        if (confirmDelete) {
            const driverToken = localStorage.getItem('driverToken');
            try {
                await axios.delete('/api/drivers/delete', {
                    headers: {
                        Authorization: `Bearer ${driverToken}`,
                    },
                });
                alert('Account deleted successfully.');
                localStorage.removeItem('driverToken');
                navigate('/');
            } catch (error) {
                setMessage(error.response.data.message || 'Error deleting account');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <DeliverySidebar driver={driver} />
            <div className="flex-grow p-6">
                <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>
                {message && <p className="text-red-500 mb-4">{message}</p>}

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Current Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">New Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Confirm New Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Change Password
                    </button>
                </form>

                <div className="mt-6">
                    <button
                        onClick={handleDeleteAccount}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                        Delete My Account
                    </button>
                </div>
                
            </div>
        </div>
    );
};

export default DLEditProfile;
