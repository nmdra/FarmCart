import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../../axios' // Ensure correct path to axios
import DLmanageSidebar from '../../Components/delivery/DLmanageSidebar' // Sidebar component
import Swal from 'sweetalert2'
import Loading from '../../Components/Loading'

const DLViewDriver = () => {
    const { id } = useParams() // Get the driver ID from the URL
    const [driverDetails, setDriverDetails] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null) // For image pop-up
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    // Fetch driver details on component load
    useEffect(() => {
        const fetchDriverDetails = async () => {
            try {
                const { data } = await axios.get(`/drivers/get/${id}`) // Fetch driver details by ID
                setDriverDetails(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching driver details:', error)
                setLoading(false)
            }
        }

        fetchDriverDetails()
    }, [id])

    if (loading) {
        return (
            <div className="flex flex-1 min-h-screen justify-center items-center">
                <Loading />
            </div>
        )
    }

    if (!driverDetails) {
        return <div className="text-center mt-10">Loading...</div>
    }

    // Construct the full URL for each image
    const idCardImageUrl = `${driverDetails.idCardImageUrl}`
    const licenseImageUrl = `${driverDetails.licenseImageUrl}`
    const personalImageUrl = `${driverDetails.personalImageUrl}`

    // Handler to open image in a modal
    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl)
    }

    // Handler to close the modal
    const handleCloseModal = () => {
        setSelectedImage(null)
    }

    // Handler to delete the driver
    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action will delete the driver!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton:
                    'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
                cancelButton:
                    'bg-gray-300 text-black font-bold py-2 px-4 rounded hover:bg-gray-400',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                // Call delete API
                axios
                    .delete(`/drivers/delete/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'The driver has been deleted.',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            customClass: {
                                confirmButton:
                                    'bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600',
                            },
                        }).then(() => {
                            navigate('/alldrivers') // Navigate back to the drivers list
                        })
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'There was an error deleting the driver.',
                            icon: 'error',
                            confirmButtonText: 'OK',
                            customClass: {
                                confirmButton:
                                    'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
                            },
                        })
                        console.error('Error deleting driver:', error)
                    })
            }
        })
    }

    // Handler to edit the driver
    const handleEdit = () => {
        navigate(`/driver/edit/${id}`) // Navigate to edit driver page
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <DLmanageSidebar />
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-64 p-16 overflow-y-auto">
                <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
                        Driver Details
                    </h2>

                    {/* Profile Image and Basic Information */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                            <div
                                className="flex flex-col items-center mb-8 cursor-pointer"
                                onClick={() =>
                                    handleImageClick(personalImageUrl)
                                }
                            >
                                <img
                                    src={personalImageUrl}
                                    alt="Driver Profile"
                                    className="h-32 w-32 rounded-full object-cover shadow-lg mb-4"
                                />
                                <h3 className="text-2xl font-bold">
                                    {driverDetails.firstName}{' '}
                                    {driverDetails.lastName}
                                </h3>
                                <p className="text-gray-500">
                                    {driverDetails.email}
                                </p>
                                <p className="text-gray-500">
                                    {driverDetails.phone}
                                </p>
                                <p className="text-gray-500">
                                    {driverDetails.vehicleType}
                                </p>
                            </div>
                        </div>

                        {/* Detailed Information Cards */}
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
                    </div>

                    {/* Images Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                className="w-full h-64 object-cover border rounded-md shadow-md"
                            />
                        </div>
                        <div
                            className="shadow-md p-4 bg-white rounded-lg cursor-pointer"
                            onClick={() => handleImageClick(licenseImageUrl)}
                        >
                            <h4 className="text-center mb-2 font-semibold">
                                License Image
                            </h4>
                            <img
                                src={licenseImageUrl}
                                alt="License"
                                className="w-full h-64 object-cover border rounded-md shadow-md"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex justify-between">
                        <button
                            onClick={handleEdit}
                            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-md"
                        >
                            Edit Details
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-md"
                        >
                            Delete
                        </button>
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
            </main>
        </div>
    )
}

export default DLViewDriver
