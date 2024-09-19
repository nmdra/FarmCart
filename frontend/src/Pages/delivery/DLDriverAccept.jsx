import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../axios'; // Corrected path
import Swal from 'sweetalert2'; // For sweet alerts
import DLmanageSidebar from '../../Components/delivery/DLmanageSidebar'; // Import the DeliverySidebar component

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

            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Driver Approved!',
                text: 'Driver added to the system and email sent successfully!',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600',
                },
            });
    
            navigate('/manager/approve-driver');
        } catch (error) {
            console.error('Error approving driver:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to approve the driver.',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
                },
            });
        }
    };

    const handleReject = async () => {
        try {
            await axios.put(`/d_forms/${id}/status`, { status: 'Rejected' });
            Swal.fire({
                icon: 'success',
                title: 'Driver Rejected',
                text: 'The driver request has been rejected.',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600',
                },
            });
            navigate('/manager/approve-driver');
        } catch (error) {
            console.error('Error rejecting driver:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to reject the driver.',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
                },
            });
        }
    };

    if (!driverDetails) return <div className="text-center mt-10">Loading...</div>;

    // Construct the full URL for each image
    const baseUrl = 'http://localhost:3000/';
    const idCardImageUrl = `${baseUrl}${driverDetails.idCardImageUrl}`;
    const licenseImageUrl = `${baseUrl}${driverDetails.licenseImageUrl}`;
    const personalImageUrl = `${baseUrl}${driverDetails.personalImageUrl}`;

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <DLmanageSidebar />
            </aside>
            
            {/* Main content */}
            <div className="flex-1 ml-64 p-16 overflow-y-auto">
                <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-md">
                    <h2 className="text-3xl font-bold mb-8 text-center">Review Driver</h2>

                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        {/* Profile Image */}
                        <div className="flex flex-col items-center mb-8">
                            <img
                                src={personalImageUrl}
                                alt="Profile"
                                className="h-32 w-32 rounded-full object-cover mb-4 shadow-md"
                            />
                            <h3 className="text-xl font-bold mb-1">{driverDetails.fullName}</h3>
                            <p className="text-gray-600">{driverDetails.email}</p>
                            <p className="text-gray-600">{driverDetails.phone}</p>
                            <p className="text-gray-600">{driverDetails.vehicleType}</p>
                        </div>

                        {/* Driver Details Table */}
                        <div className="mt-8">
                            <table className="min-w-full bg-white border border-gray-200">
                                <tbody>
                                    <tr className="bg-gray-50">
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
    <div className="shadow-md">
        <h4 className="text-center mb-2 font-semibold">ID Card Image</h4>
        <img
            src={idCardImageUrl}
            alt="ID Card"
            className="w-full h-auto max-h-64 object-contain border rounded-md shadow-md cursor-pointer"
            onClick={() => window.open(idCardImageUrl, '_blank')} // Opens image in new tab on click
        />
    </div>
    <div className="shadow-md">
        <h4 className="text-center mb-2 font-semibold">License Image</h4>
        <img
            src={licenseImageUrl}
            alt="License"
            className="w-full h-auto max-h-64 object-contain border rounded-md shadow-md cursor-pointer"
            onClick={() => window.open(licenseImageUrl, '_blank')} // Opens image in new tab on click
        />
    </div>
</div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={handleApprove}
                                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-md"
                            >
                                Approve
                            </button>
                            <button
                                onClick={handleReject}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-md"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DLDriverAccept;
