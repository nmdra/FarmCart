import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../axios'; // Ensure correct path to axios
import DLmanageSidebar from '../../Components/delivery/DLmanageSidebar'; // Sidebar component

const DLViewDriver = () => {
    const { id } = useParams(); // Get the driver ID from the URL
    const [driverDetails, setDriverDetails] = useState(null);
    const navigate = useNavigate();

    // Fetch driver details on component load
    useEffect(() => {
        const fetchDriverDetails = async () => {
            try {
                const { data } = await axios.get(`/drivers/get/${id}`); // Fetch driver details by ID
                setDriverDetails(data);
            } catch (error) {
                console.error('Error fetching driver details:', error);
                // Handle error or navigate to an error page
            }
        };

        fetchDriverDetails();
    }, [id]);

    if (!driverDetails) {
        return <div className="text-center mt-10">Loading...</div>;
    }

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
            <main className="flex-1 ml-64 p-16 overflow-y-auto">
                <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
                    <h2 className="text-3xl font-bold mb-6 text-center">Driver Details</h2>
                    
                    {/* Profile Image and Details */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
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
                        <div className="overflow-x-auto">
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
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DLViewDriver;
