import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DeliverySidebar from '../../Components/delivery/DeliverySidebar'
import Swal from 'sweetalert2'
import Loading from '../../Components/Loading'

const DLDriverProfile = () => {
    const [driverDetails, setDriverDetails] = useState({
        driverID: '',
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
    })
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(null) // State for image modal
    const navigate = useNavigate()

    // Fetch driver details on component mount
    useEffect(() => {
        const fetchDriverDetails = async () => {
            const driverToken = localStorage.getItem('driverToken')
            if (!driverToken) {
                navigate('/driver/login') // Redirect to login if token is missing
                return
            }

            try {
                const { data } = await axios.get('/api/drivers/profile', {
                    headers: {
                        Authorization: `Bearer ${driverToken}`,
                    },
                })

                setDriverDetails({
                    driverID: data.driverID,
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
                })
                setLoading(false) // Data has been loaded
            } catch (error) {
                console.error('Error fetching driver profile:', error)
                localStorage.removeItem('driverToken') // Remove token if invalid
                navigate('/driver/login') // Redirect to login on error
            }
        }

        fetchDriverDetails()
    }, [navigate])

    const handleEditProfile = () => {
        navigate('/driver/profile/edit') // Navigate to the edit profile page
    }

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl) // Open the modal with the selected image
    }

    const handleCloseModal = () => {
        setSelectedImage(null) // Close the modal
    }

    const idCardImageUrl = `${driverDetails.idCardImageUrl}`
    const licenseImageUrl = `${driverDetails.licenseImageUrl}`
    const personalImageUrl = `${driverDetails.personalImageUrl}`

    if (loading) {
        return (
            <div className="flex flex-1 min-h-screen justify-center items-center">
                <Loading />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Fixed Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <DeliverySidebar driver={driverDetails} />
            </aside>

            {/* Main content */}
            <div className="flex-1 ml-64 p-16 overflow-y-auto">
                <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
                        Driver Profile
                    </h2>

                    {/* Profile Image and Basic Information */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <div
                            className="flex flex-col items-center mb-8 cursor-pointer"
                            onClick={() => handleImageClick(personalImageUrl)}
                        >
                            <img
                                src={personalImageUrl}
                                alt="Driver Profile"
                                className="h-32 w-32 rounded-full object-cover shadow-lg mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-1">
                                {driverDetails.fullName}
                            </h3>
                            <p className="text-gray-600">
                                {driverDetails.email}
                            </p>
                            <p className="text-gray-600">
                                {driverDetails.phone}
                            </p>
                            <p className="text-gray-600">
                                {driverDetails.vehicleType}
                            </p>
                            <p className="text-gray-600">
                                {driverDetails.driverID}
                            </p>
                        </div>

                        {/* Driver Details in Two-Column Layout */}
                        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <div className="text-gray-700 font-semibold">
                                    Full Name:
                                </div>
                                <div className="text-gray-600">
                                    {driverDetails.fullName}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <div className="text-gray-700 font-semibold">
                                    Email:
                                </div>
                                <div className="text-gray-600">
                                    {driverDetails.email}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <div className="text-gray-700 font-semibold">
                                    Phone:
                                </div>
                                <div className="text-gray-600">
                                    {driverDetails.phone}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <div className="text-gray-700 font-semibold">
                                    Date of Birth:
                                </div>
                                <div className="text-gray-600">
                                    {new Date(
                                        driverDetails.dateOfBirth
                                    ).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <div className="text-gray-700 font-semibold">
                                    ID Card Number:
                                </div>
                                <div className="text-gray-600">
                                    {driverDetails.idCardNumber}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <div className="text-gray-700 font-semibold">
                                    License Card Number:
                                </div>
                                <div className="text-gray-600">
                                    {driverDetails.licenseCardNumber}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <div className="text-gray-700 font-semibold">
                                    Address:
                                </div>
                                <div className="text-gray-600">
                                    {driverDetails.address}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <div className="text-gray-700 font-semibold">
                                    Vehicle Number:
                                </div>
                                <div className="text-gray-600">
                                    {driverDetails.vehicleNumber}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <div className="text-gray-700 font-semibold">
                                    Vehicle Type:
                                </div>
                                <div className="text-gray-600">
                                    {driverDetails.vehicleType}
                                </div>
                            </div>
                        </div>

                        {/* Uploaded Images */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div
                                className="shadow-md p-4 bg-white rounded-lg cursor-pointer"
                                onClick={() => handleImageClick(idCardImageUrl)}
                            >
                                <h4 className="text-center mb-2 font-semibold">
                                    ID Card Image
                                </h4>
                                <img
                                    src={idCardImageUrl}
                                    alt="ID Card"
                                    className="w-full h-64 object-cover rounded-md shadow-lg transition-transform transform hover:scale-105"
                                />
                            </div>
                            <div
                                className="shadow-md p-4 bg-white rounded-lg cursor-pointer"
                                onClick={() =>
                                    handleImageClick(licenseImageUrl)
                                }
                            >
                                <h4 className="text-center mb-2 font-semibold">
                                    License Image
                                </h4>
                                <img
                                    src={licenseImageUrl}
                                    alt="License"
                                    className="w-full h-64 object-cover rounded-md shadow-lg transition-transform transform hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={handleEditProfile}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Image Modal */}
                {selectedImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded-lg shadow-lg relative max-w-xl max-h-[90vh]">
                            <button
                                className="absolute top-2 right-2 bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600"
                                onClick={handleCloseModal}
                            >
                                X
                            </button>
                            <img
                                src={selectedImage}
                                alt="Full View"
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DLDriverProfile
