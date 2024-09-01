import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../axios'; // Corrected path

const DLDriverAccept = () => {
    const { id } = useParams(); // Get the form ID from the URL
    const [driverDetails, setDriverDetails] = useState(null);
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

    const handleApprove = async () => {
        try {
            // Add the driver to the system
            await axios.post(`/drivers/addDriver/${id}`);
    
            // Update the status of the delivery form to "Approved"
            await axios.put(`/d_forms/${id}/status`, { status: 'Approved' });
    
              // Send approval email
              await axios.post(`/email/send-approval-email/${id}`);
    
              alert('Driver approved, added to the system, and email sent');
              navigate('/manager/approve-driver');
            

            
        } catch (error) {
            console.error('Error approving driver:', error);
            alert('Failed to approve the driver.');
        }
    };
    

    const handleReject = async () => {
        try {
            await axios.put(`/d_forms/${id}/status`, { status: 'Rejected' });
            navigate('/manager/approve-driver');
        } catch (error) {
            console.error('Error rejecting driver:', error);
        }
    };

    if (!driverDetails) return <div>Loading...</div>;

    // Construct the full URL for each image
    const baseUrl = 'http://localhost:3000/';
    const idCardImageUrl = `${baseUrl}${driverDetails.idCardImageUrl}`;
    const licenseImageUrl = `${baseUrl}${driverDetails.licenseImageUrl}`;
    const personalImageUrl = `${baseUrl}${driverDetails.personalImageUrl}`;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gray-100 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-6 text-center">Review Driver</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {/* Profile Image */}
                <div className="flex flex-col items-center">
                    <img
                        src={personalImageUrl}
                        alt="Profile"
                        className="h-32 w-32 rounded-full object-cover mb-4"
                    />
                    <h3 className="text-lg font-semibold mb-1">{driverDetails.fullName}</h3>
                    <p className="text-gray-600">{driverDetails.email}</p>
                    <p className="text-gray-600">{driverDetails.phone}</p>
                    <p className="text-gray-600">{driverDetails.vehicleType}</p>
                </div>

                {/* Driver Details Table */}
                <div className="mt-8">
                    <table className="min-w-full bg-white border border-gray-200">
                        <tbody>
                            <tr>
                                <th className="px-4 py-2 text-left border">Full Name</th>
                                <td className="px-4 py-2 border">{driverDetails.fullName}</td>
                            </tr>
                            <tr>
                                <th className="px-4 py-2 text-left border">Email</th>
                                <td className="px-4 py-2 border">{driverDetails.email}</td>
                            </tr>
                            <tr>
                                <th className="px-4 py-2 text-left border">Phone</th>
                                <td className="px-4 py-2 border">{driverDetails.phone}</td>
                            </tr>
                            <tr>
                                <th className="px-4 py-2 text-left border">Date of Birth</th>
                                <td className="px-4 py-2 border">{new Date(driverDetails.dateOfBirth).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <th className="px-4 py-2 text-left border">ID Card Number</th>
                                <td className="px-4 py-2 border">{driverDetails.idCardNumber}</td>
                            </tr>
                            <tr>
                                <th className="px-4 py-2 text-left border">License Card Number</th>
                                <td className="px-4 py-2 border">{driverDetails.licenseCardNumber}</td>
                            </tr>
                            <tr>
                                <th className="px-4 py-2 text-left border">Address</th>
                                <td className="px-4 py-2 border">{driverDetails.address}</td>
                            </tr>
                            <tr>
                                <th className="px-4 py-2 text-left border">Vehicle Number</th>
                                <td className="px-4 py-2 border">{driverDetails.vehicleNumber}</td>
                            </tr>
                            <tr>
                                <th className="px-4 py-2 text-left border">Vehicle Type</th>
                                <td className="px-4 py-2 border">{driverDetails.vehicleType}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Uploaded Images */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-center mb-2">ID Card Image</h4>
                        <img src={idCardImageUrl} alt="ID Card" className="w-full h-64 object-cover border rounded-md" />
                    </div>
                    <div>
                        <h4 className="text-center mb-2">License Image</h4>
                        <img src={licenseImageUrl} alt="License" className="w-full h-64 object-cover border rounded-md" />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={handleApprove}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                    >
                        Approve
                    </button>
                    <button
                        onClick={handleReject}
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
