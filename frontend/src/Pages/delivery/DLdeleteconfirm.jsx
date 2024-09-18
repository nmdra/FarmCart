import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const DLDeleteConfirm = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleDeleteAccount = async () => {
        const driverToken = localStorage.getItem('driverToken');

        try {
            await axios.delete('/api/drivers/delete', {
                headers: {
                    Authorization: `Bearer ${driverToken}`,
                },
            });
            alert('Account deleted successfully.');
            localStorage.removeItem('driverToken');
            navigate('/'); // Redirect to home or login after deletion
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error deleting account');
        }
    };

    const handleCancel = () => {
        navigate('/driver/profile'); // Cancel and go back to profile page
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Are you sure?</h2>
                <p className="text-center mb-6">This action cannot be undone.</p>
                {message && <p className="text-red-500 mb-4">{message}</p>}
                <div className="flex justify-between">
                    <button
                        onClick={handleDeleteAccount}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                        Yes, Delete My Account
                    </button>
                    <button
                        onClick={handleCancel}
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DLDeleteConfirm;
