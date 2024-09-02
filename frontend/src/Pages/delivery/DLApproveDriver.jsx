import React, { useState, useEffect } from 'react';
import axios from '../../../axios'; // Updated import path to match your project structure
import { useNavigate } from 'react-router-dom';

const DLApproveDriver = () => {
    const [pendingForms, setPendingForms] = useState([]);
    const navigate = useNavigate();

    // Fetch pending forms when the component loads
    useEffect(() => {
        const fetchPendingForms = async () => {
            try {
                const { data } = await axios.get('/d_forms/pending-forms');
                setPendingForms(data);
            } catch (error) {
                console.error('Error fetching pending forms:', error);
            }
        };

        fetchPendingForms();
    }, []);

    // Handle reviewing a driver by navigating to the review page
    const handleReview = (id) => {
        navigate(`/manager/approve-driver/${id}`);    };

    // Display a message if there are no pending forms
    if (pendingForms.length === 0) {
        return <div className="text-center text-xl font-semibold mt-10">No pending forms to approve.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-100 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Pending Driver Approvals</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 border">Full Name</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Phone</th>
                            <th className="px-4 py-2 border">Vehicle Type</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingForms.map((form) => (
                            <tr key={form._id}>
                                <td className="px-4 py-2 border text-center">{form.fullName}</td>
                                <td className="px-4 py-2 border text-center">{form.email}</td>
                                <td className="px-4 py-2 border text-center">{form.phone}</td>
                                <td className="px-4 py-2 border text-center">{form.vehicleType}</td>
                                <td className="px-4 py-2 border text-center">
                                    <button
                                        onClick={() => handleReview(form._id)}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                                    >
                                        Review
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DLApproveDriver;
