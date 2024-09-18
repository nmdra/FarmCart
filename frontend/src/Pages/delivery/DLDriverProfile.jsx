import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeliverySidebar from '../../Components/delivery/DeliverySidebar';

const DLDriverProfile = () => {
    const [driverDetails, setDriverDetails] = useState({
        fullName: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        vehicleNumber: '',
        vehicleType: '',
        idCardNumber: '',
        licenseCardNumber: '',
        idCardImageUrl: '',
        licenseImageUrl: '',
        personalImageUrl: '',
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch driver details on component mount
    useEffect(() => {
        const fetchDriverDetails = async () => {
            const driverToken = localStorage.getItem('driverToken');
            if (!driverToken) {
                navigate('/driver/login'); // Redirect to login if token is missing
                return;
            }

            try {
                const { data } = await axios.get('/api/drivers/profile', {
                    headers: {
                        Authorization: `Bearer ${driverToken}`,
                    },
                });

                // Set the driver details in state
                setDriverDetails({
                    fullName: data.fullName,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    dateOfBirth: data.dateOfBirth.substring(0, 10), // Format date
                    address: data.address,
                    vehicleNumber: data.vehicleNumber,
                    vehicleType: data.vehicleType,
                    idCardNumber: data.idCardNumber,
                    licenseCardNumber: data.licenseCardNumber,
                    idCardImageUrl: data.idCardImageUrl,
                    licenseImageUrl: data.licenseImageUrl,
                    personalImageUrl: data.personalImageUrl,
                });
                setLoading(false); // Data has been loaded
            } catch (error) {
                console.error('Error fetching driver profile:', error);
                localStorage.removeItem('driverToken'); // Remove token if invalid
                navigate('/driver/login'); // Redirect to login on error
            }
        };

        fetchDriverDetails();
    }, [navigate]);

    const handleEditProfile = () => {
        navigate('/driver/profile/edit'); // Navigate to the edit profile page
    };


 // Handle account deletion
 const handleDeleteAccount = async () => {
      // Navigate to the delete confirmation page
      navigate('/driver/delete-confirmation');
};




    const baseUrl = 'http://localhost:3000/';
    const idCardImageUrl = `${baseUrl}${driverDetails.idCardImageUrl}`;
    const licenseImageUrl = `${baseUrl}${driverDetails.licenseImageUrl}`;
    const personalImageUrl = `${baseUrl}${driverDetails.personalImageUrl}`;

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <DeliverySidebar driver={driverDetails} /> {/* Pass driver details to sidebar */}
            <div className="flex-grow p-6">
                <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
                    <h2 className="text-3xl font-bold mb-6 text-center">Driver Profile</h2>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        {/* Profile Image */}
                        <div className="flex flex-col items-center mb-8">
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
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleEditProfile}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Edit Profile
                            </button>
                        </div>


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
            </div>
        </div>
    );
};

export default DLDriverProfile;
