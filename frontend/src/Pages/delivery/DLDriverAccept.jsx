import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../axios'; // Corrected path

const DLDriverAccept = () => {
    const { id } = useParams(); // Get the form ID from the URL
    const [driverDetails, setDriverDetails] = useState(null);
    const [status, setStatus] = useState(''); // Status can be 'Approved' or 'Rejected'
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDriverDetails = async () => {
            try {
                const { data } = await axios.get(`/d_forms/${id}`);
                setDriverDetails(data);
            } catch (error) {
                console.error('Error fetching driver details:', error);
            }
        };

        fetchDriverDetails();
    }, [id]);

    const handleStatusUpdate = async (newStatus) => {
        try {
            await axios.put(`/d_forms/${id}/status`, { status: newStatus });
            setStatus(newStatus);
            navigate('/manager/approve-driver');
        } catch (error) {
            console.error(`Error updating form status to ${newStatus}:`, error);
        }
    };

    if (!driverDetails) return <div>Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-100 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Review Driver</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={driverDetails.personalImageUrl}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{driverDetails.fullName}</h3>
                    <p className="text-gray-600">{driverDetails.email}</p>
                    <p className="text-gray-600">{driverDetails.phone}</p>
                    <p className="text-gray-600 mb-4">{driverDetails.vehicleType}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                        <h4 className="font-semibold mb-2">ID Card Image</h4>
                        <img src={driverDetails.idCardImageUrl} alt="ID Card" className="w-full h-auto rounded-lg" />
                    </div>
                    <div className="text-center">
                        <h4 className="font-semibold mb-2">License Image</h4>
                        <img src={driverDetails.licenseImageUrl} alt="License" className="w-full h-auto rounded-lg" />
                    </div>
                </div>
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={() => handleStatusUpdate('Approved')}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                        Approve
                    </button>
                    <button
                        onClick={() => handleStatusUpdate('Rejected')}
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DLDriverAccept;
