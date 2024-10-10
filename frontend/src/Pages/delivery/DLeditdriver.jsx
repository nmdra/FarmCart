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
    const [isEditing, setIsEditing] = useState(false)
    const [errors, setErrors] = useState({}) // Error state for validation
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

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
        return (
            <div className="flex flex-1 min-h-screen justify-center items-center">
                <Loading />
            </div>
        )
    }

    // Construct the full URL for each image
    //const baseUrl = 'http://localhost:3000/'
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

    // Handler to cancel the edits
    const handleCancel = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will cancel your changes!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel',
            cancelButtonText: 'No, continue editing',
            customClass: {
                confirmButton:
                    'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
                cancelButton:
                    'bg-gray-300 text-black font-bold py-2 px-4 rounded hover:bg-gray-400',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/manager/view-driver/${id}`) // Navigate back to the driver view page
            }
        })
    }

    // Handler to save the edits
    const handleSaveChanges = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You are about to save changes to this driver's details!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, save changes',
            cancelButtonText: 'No, cancel',
            customClass: {
                confirmButton:
                    'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600',
                cancelButton:
                    'bg-gray-300 text-black font-bold py-2 px-4 rounded hover:bg-gray-400',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                // Call the update API to save the details
                axios
                    .put(`/drivers/update/${id}`, driverDetails)
                    .then(() => {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Driver details have been updated.',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            customClass: {
                                confirmButton:
                                    'bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600',
                            },
                        }).then(() => {
                            navigate(`/manager/view-driver/${id}`) // Navigate back to the driver view page
                        })
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'There was an error updating the driver details.',
                            icon: 'error',
                            confirmButtonText: 'OK',
                            customClass: {
                                confirmButton:
                                    'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
                            },
                        })
                        console.error('Error updating driver details:', error)
                    })
            }
        })
    }

    // Function to calculate age from birth date
    const calculateAge = (birthDate) => {
        const today = new Date()
        const birthDateObj = new Date(birthDate)
        let age = today.getFullYear() - birthDateObj.getFullYear()
        const monthDifference = today.getMonth() - birthDateObj.getMonth()
        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
        ) {
            age--
        }
        return age
    }

    // Handler for input changes with validation
    const handleInputChange = (e) => {
        const { name, value } = e.target
        let errorMessage = ''

        // Validate Name
        if (name === 'fullName') {
            if (!/^[A-Za-z\s]*$/.test(value)) {
                errorMessage = 'Name should only contain alphabets and spaces.'
                return
            }
        }

        // Validate Contact Number
        if (name === 'phone') {
            if (!/^0\d{9}$/.test(value)) {
                errorMessage =
                    'Contact number must be 10 digits and start with 0.'
            }
        }

        setDriverDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }))

        // Set error message for the field
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }))
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
                        Edit Driver Details
                    </h2>

                    {/* Profile Image and Basic Information */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <div className="flex flex-col items-center mb-8">
                            <img
                                src={personalImageUrl}
                                alt="Driver Profile"
                                className="h-32 w-32 rounded-full object-cover shadow-lg mb-4 cursor-pointer"
                                onClick={() =>
                                    handleImageClick(personalImageUrl)
                                } // Click to enlarge
                            />
                            <h3 className="text-2xl font-bold">
                                {' '}
                                {driverDetails.firstName}{' '}
                                {driverDetails.lastName}{' '}
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
                            <p className="text-gray-600">
                                {driverDetails.driverID}
                            </p>
                        </div>

                        {/* Detailed Information Form */}
                        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                            <h2 className="text-2xl font-bold text-center mb-8">
                                Driver Information
                            </h2>

                            {/* Full Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <label className="text-gray-700 font-semibold">
                                    Full Name:
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={driverDetails.fullName}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 rounded-md"
                                />
                                {errors.fullName && (
                                    <p className="text-red-500">
                                        {errors.fullName}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <label className="text-gray-700 font-semibold">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={driverDetails.email}
                                    readOnly // Make email field non-editable
                                    className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            {/* Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <label className="text-gray-700 font-semibold">
                                    Phone:
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={driverDetails.phone}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 rounded-md"
                                />
                                {errors.phone && (
                                    <p className="text-red-500">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            {/* Date of Birth */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <label className="text-gray-700 font-semibold">
                                    Date of Birth:
                                </label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={driverDetails.dateOfBirth.substring(
                                        0,
                                        10
                                    )}
                                    readOnly // Make email field non-editable
                                    className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            {/* ID Card Number */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <label className="text-gray-700 font-semibold">
                                    ID Card Number:
                                </label>
                                <input
                                    type="text"
                                    name="idCardNumber"
                                    value={driverDetails.idCardNumber}
                                    readOnly // Make email field non-editable
                                    className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            {/* License Card Number */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <label className="text-gray-700 font-semibold">
                                    License Card Number:
                                </label>
                                <input
                                    type="text"
                                    name="licenseCardNumber"
                                    value={driverDetails.licenseCardNumber}
                                    readOnly // Make email field non-editable
                                    className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            {/* Address */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <label className="text-gray-700 font-semibold">
                                    Address:
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={driverDetails.address}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 rounded-md"
                                />
                                {errors.address && (
                                    <p className="text-red-500">
                                        {errors.address}
                                    </p>
                                )}
                            </div>

                            {/* Vehicle Number */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <label className="text-gray-700 font-semibold">
                                    Vehicle Number:
                                </label>
                                <input
                                    type="text"
                                    name="vehicleNumber"
                                    value={driverDetails.vehicleNumber}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 rounded-md"
                                />
                                {errors.vehicleNumber && (
                                    <p className="text-red-500">
                                        {errors.vehicleNumber}
                                    </p>
                                )}
                            </div>

                            {/* Vehicle Type */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                <label className="text-gray-700 font-semibold">
                                    Vehicle Type:
                                </label>
                                <select
                                    name="vehicleType"
                                    value={driverDetails.vehicleType}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="Bike">Bike</option>
                                    <option value="Three-Wheel">
                                        Three-Wheel
                                    </option>
                                    <option value="Lorry">Lorry</option>
                                </select>
                                {errors.vehicleType && (
                                    <p className="text-red-500">
                                        {errors.vehicleType}
                                    </p>
                                )}
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
                            onClick={handleSaveChanges}
                            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-md"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-md"
                        >
                            Cancel
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
