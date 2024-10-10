import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../../axios' // Corrected path
import Swal from 'sweetalert2' // For sweet alerts
import DLmanageSidebar from '../../Components/delivery/DLmanageSidebar' // Import the DeliverySidebar component
import Loading from '../../Components/Loading'

const DLDriverAccept = () => {
    const { id } = useParams() // Get the form ID from the URL
    const [driverDetails, setDriverDetails] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl) // Open the modal with the selected image
    }

    const handleCloseModal = () => {
        setSelectedImage(null) // Close the modal
    }

    useEffect(() => {
        const fetchDriverDetails = async () => {
            try {
                const { data } = await axios.get(`/d_forms/${id}`)
                setDriverDetails(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching driver details:', error)
                setLoading(false)
            }
        }

        fetchDriverDetails()
    }, [id])

    const handleApprove = async () => {
        try {
            // Add the driver to the system
            await axios.post(`/drivers/addDriver/${id}`)

            // Update the status of the delivery form to "Approved"

            await axios.put(`/d_forms/${id}/status`, { status: 'Approved' })

            // Send approval email
            await axios.post(`/email/send-approval-email/${id}`)

            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'Driver Approved!',
                text: 'Driver added to the system and email sent successfully!',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton:
                        'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600',
                },
            })

            navigate('/manager/approve-driver')
        } catch (error) {
            console.error('Error approving driver:', error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to approve the driver.',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton:
                        'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
                },
            })
        }
    }

    const handleReject = async () => {
        try {
            await axios.put(`/d_forms/${id}/status`, { status: 'Rejected' })
            Swal.fire({
                icon: 'success',
                title: 'Driver Rejected',
                text: 'The driver request has been rejected.',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton:
                        'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600',
                },
            })
            navigate('/manager/approve-driver')
        } catch (error) {
            console.error('Error rejecting driver:', error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to reject the driver.',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton:
                        'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
                },
            })
        }
    }

    if (loading) {
        return (
            <div className="flex flex-1 min-h-screen justify-center items-center">
                <Loading />
            </div>
        )
    }

    if (!driverDetails)
        return <div className="text-center mt-10">Loading...</div>

    // Construct the full URL for each image
    const idCardImageUrl = `${driverDetails.idCardImageUrl}`
    const licenseImageUrl = `${driverDetails.licenseImageUrl}`
    const personalImageUrl = `${driverDetails.personalImageUrl}`

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <DLmanageSidebar />
            </aside>

            {/* Main content */}
            <div className="flex-1 ml-64 p-16 overflow-y-auto">
                <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-md">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Review Driver
                    </h2>

                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        {/* Profile Image and Details */}
                        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                            <div
                                className="flex flex-col items-center mb-8 cursor-pointer"
                                onClick={() =>
                                    handleImageClick(personalImageUrl)
                                }
                            >
                                <img
                                    src={personalImageUrl}
                                    alt="Driver Profile"
                                    className="h-40 w-40 rounded-full object-cover shadow-lg mb-4"
                                />
                                <h3 className="text-2xl font-bold mb-1">
                                    {driverDetails.firstName}{' '}
                                    {driverDetails.lastName}
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

                            {/* Professional Two-Column Layout */}
                            <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                                <h2 className="text-2xl font-bold text-center mb-8">
                                    Driver Information
                                </h2>

                                {/* Full Name */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                    <div className="text-gray-700 font-semibold">
                                        Full Name:
                                    </div>
                                    <div className="text-gray-600">
                                        {driverDetails.fullName}
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                    <div className="text-gray-700 font-semibold">
                                        Email:
                                    </div>
                                    <div className="text-gray-600">
                                        {driverDetails.email}
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                    <div className="text-gray-700 font-semibold">
                                        Phone:
                                    </div>
                                    <div className="text-gray-600">
                                        {driverDetails.phone}
                                    </div>
                                </div>

                                {/* Date of Birth */}
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

                                {/* ID Card Number */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                    <div className="text-gray-700 font-semibold">
                                        ID Card Number:
                                    </div>
                                    <div className="text-gray-600">
                                        {driverDetails.idCardNumber}
                                    </div>
                                </div>

                                {/* License Card Number */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                    <div className="text-gray-700 font-semibold">
                                        License Card Number:
                                    </div>
                                    <div className="text-gray-600">
                                        {driverDetails.licenseCardNumber}
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                    <div className="text-gray-700 font-semibold">
                                        Address:
                                    </div>
                                    <div className="text-gray-600">
                                        {driverDetails.address}
                                    </div>
                                </div>

                                {/* Vehicle Number */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                    <div className="text-gray-700 font-semibold">
                                        Vehicle Number:
                                    </div>
                                    <div className="text-gray-600">
                                        {driverDetails.vehicleNumber}
                                    </div>
                                </div>

                                {/* Vehicle Type */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                    <div className="text-gray-700 font-semibold">
                                        Vehicle Type:
                                    </div>
                                    <div className="text-gray-600">
                                        {driverDetails.vehicleType}
                                    </div>
                                </div>
                            </div>

                            {/* Uploaded Images with Clickable Modal */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div
                                    className="shadow-md p-4 bg-white rounded-lg cursor-pointer"
                                    onClick={() =>
                                        handleImageClick(idCardImageUrl)
                                    }
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
    )
}

export default DLDriverAccept
