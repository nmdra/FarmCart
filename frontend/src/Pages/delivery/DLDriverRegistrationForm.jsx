import React, { useState } from 'react'
import axios from '../../axios' // Import your axios instance with baseURL and interceptor
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2' // For user-friendly alerts
import farmcartLogo from '../../assets/logo.png' // Import your logo

const RegisterDriverForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        idCardNumber: '',
        licenseCardNumber: '',
        address: '',
        vehicleNumber: '',
        vehicleType: '',
    })

    // State for images and their URLs
    const [idCardImageUrl, setIdCardImageUrl] = useState(null)
    const [licenseImageUrl, setLicenseImageUrl] = useState(null)
    const [personalImageUrl, setPersonalImageUrl] = useState(null)

    // State for image previews
    const [previewIdCard, setPreviewIdCard] = useState(null)
    const [previewLicense, setPreviewLicense] = useState(null)
    const [previewPersonal, setPreviewPersonal] = useState(null)

    // State for error and loading states
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState({
        idCard: false,
        license: false,
        personal: false,
    })
    const [successMessage, setSuccessMessage] = useState('')
    const navigate = useNavigate()

    // Function to calculate age from birth date
    const calculateAge = (dateOfBirth) => {
        const today = new Date()
        const birthDateObj = new Date(dateOfBirth)
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

    /// Handler for input changes with validation
    const handleInputChange = (e) => {
        const { name, value } = e.target
        let errorMessage = ''

        if (name === 'firstName') {
            if (!/^[A-Za-z\s]*$/.test(value)) {
                return
            }
        }

        if (name === 'lastName') {
            if (!/^[A-Za-z\s]*$/.test(value)) {
                return
            }
        }

        if (name === 'fullName') {
            if (!/^[A-Za-z\s]*$/.test(value)) {
                return
            }
        }

        if (name === 'email') {
            // Remove any leading or trailing spaces
            const trimmedValue = value.trim()

            // Advanced email validation regex
            const emailRegex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

            // Check if there are any spaces in the email
            if (/\s/.test(trimmedValue)) {
                errorMessage = 'Email cannot contain spaces.'
            } else if (!emailRegex.test(trimmedValue)) {
                errorMessage =
                    'Email must be a valid address (e.g., name@example.com).'
            }
        }

        if (name === 'phone') {
            if (!/^\d*$/.test(value)) {
                return // Prevent setting invalid value
            }
            if (value.length > 10) {
                return // Prevent setting values longer than 10 digits
            }
            if (!/^0\d{9}$/.test(value)) {
                errorMessage =
                    'Contact number must be 10 digits and start with 0.'
            }
        }

        // Validate BirthDay
        if (name === 'dateOfBirth') {
            const age = calculateAge(value)
            if (age < 18) {
                errorMessage = 'You must be at least 18 years old to register.'
            }
            // Ensure NIC year matches BirthDay year
            const birthYear = new Date(value).getFullYear()
            if (
                formData.NIC &&
                !formData.NIC.startsWith(birthYear.toString())
            ) {
                errorMessage = 'Please Enter valid NIC'
            }
        }

        // Validate NIC
        if (name === 'idCardNumber') {
            const nicRegex = /^\d{11}[0-9Vv]$/
            const birthYear = new Date(formData.dateOfBirth)
                .getFullYear()
                .toString()

            // Ensure the NIC is not longer than 12 characters
            if (value.length > 12) {
                return
                errorMessage = 'NIC cannot exceed 12 characters.'
            } else if (!nicRegex.test(value)) {
                errorMessage = 'Please enter a valid NIC.'
            } else if (!value.startsWith(birthYear)) {
                errorMessage =
                    'Please enter a valid NIC that matches your birth year.'
            }
        }

        // Validate Vehicle Number
        if (name === 'vehicleNumber') {
            const vehicleRegex6 = /^[A-Z]{2}[0-9]{4}$/ // For 6 characters (AA0000 to ZZ9999)
            const vehicleRegex7 = /^[A-Z]{3}[0-9]{4}$/ // For 7 characters (AAA0000 to ZZZ9999)

            if (!(vehicleRegex6.test(value) || vehicleRegex7.test(value))) {
                errorMessage =
                    'Vehicle number must be in uppercase and follow the format AA0000 or AAA0000.'
            }
            if (value.length > 7) {
                return // Prevent setting values longer than 10 digits
            }
        }

        // Validate Vehicle Number
        if (name === 'licenseCardNumber') {
            const vehicleRegex6 = /^[A-B]{1}[0-9]{6}$/ // For 6 characters (AA0000 to ZZ9999)

            if (!vehicleRegex6.test(value)) {
                errorMessage =
                    'licenseCardNumber must be in uppercase and follow the format A000000 .'
            }
            if (value.length > 7) {
                return // Prevent setting values longer than 7 digits
            }
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }))
    }

    // Handle image file changes, upload to Cloudinary, and set previews with validation
    const handleFileChange = async (
        e,
        setImageUrlFunction,
        setPreviewFunction,
        type
    ) => {
        const file = e.target.files[0]
        const validFileTypes = ['image/png', 'image/jpeg', 'image/jpg']

        if (file) {
            // Check if file type is valid
            if (!validFileTypes.includes(file.type)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid File Type',
                    text: 'Please upload a valid image file (PNG or JPEG).',
                })
                return // Exit if invalid file type
            }

            setPreviewFunction(URL.createObjectURL(file)) // Set preview URL
            setLoading({ ...loading, [type]: true }) // Set loading state

            try {
                const formData = new FormData()
                formData.append('image', file)
                formData.append('folder', 'drivers') // Upload to "drivers" folder in Cloudinary

                const response = await axios.post('/images', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })

                setImageUrlFunction(response.data.url) // Set Cloudinary image URL
                Swal.fire({
                    icon: 'success',
                    title: `${type} uploaded successfully!`,
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Upload Error',
                    text: 'Failed to upload image. Please try again.',
                })
            } finally {
                setLoading({ ...loading, [type]: false }) // Remove loading state
            }
        }
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Prevent submission if any images are still uploading
        if (loading.idCard || loading.license || loading.personal) {
            Swal.fire({
                icon: 'info',
                title: 'Please Wait',
                text: 'Wait for all images to finish uploading before submitting.',
            })
            return
        }

        try {
            const formDataObj = {
                ...formData,
                idCardImageUrl,
                licenseImageUrl,
                personalImageUrl,
            }

            await axios.post('/d_forms', formDataObj)

            Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                text: 'Your registration was successful!',
            })

            navigate('/driver/login')
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text:
                    error.response?.data?.message ||
                    'Failed to submit the form. Please try again.',
            })
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div>
                {/* New Login Section */}
                <div className="max-w-1-md min-w-full bg-white p-4 rounded-lg shadow-lg border-2">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-700 text-sm">
                            Do you have an account?
                        </p>
                        <button
                            className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            onClick={() => navigate('/driver/login')} // Navigate to the login page
                        >
                            Login
                        </button>
                    </div>
                </div>

                <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg border-2 border-green-600">
                    <img
                        src={farmcartLogo} // Replace with the path to your logo image
                        alt="Logo"
                        className="h-10 w-auto mb-4 mx-auto" // Adjust the height as needed
                    />
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        Driver Registration Form
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Input fields for registration */}
                            <div className="col-span-1">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                                    required
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-sm">
                                        {errors.firstName}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1">
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                                    required
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-sm">
                                        {errors.lastName}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-2">
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-2">
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                                    required
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-2">
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                                    required
                                />

                                {errors.dateOfBirth && (
                                    <p className="text-red-500 text-sm">
                                        {errors.dateOfBirth}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-2">
                                <input
                                    type="text"
                                    name="idCardNumber"
                                    placeholder="ID Card Number"
                                    value={formData.idCardNumber}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                                    required
                                />

                                {errors.idCardNumber && (
                                    <p className="text-red-500 text-sm">
                                        {errors.idCardNumber}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-2">
                                <input
                                    type="text"
                                    name="licenseCardNumber"
                                    placeholder="License Card Number"
                                    value={formData.licenseCardNumber}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                                    required
                                />
                                {errors.licenseCardNumber && (
                                    <p className="text-red-500 text-sm">
                                        {errors.licenseCardNumber}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-2">
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <input
                                    type="text"
                                    name="vehicleNumber"
                                    placeholder="Vehicle Number"
                                    value={formData.vehicleNumber}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                                    required
                                />

                                {errors.vehicleNumber && (
                                    <p className="text-red-500 text-sm">
                                        {errors.vehicleNumber}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-2">
                                <select
                                    name="vehicleType"
                                    value={formData.vehicleType}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                                    required
                                >
                                    <option value="">
                                        Select Vehicle Type
                                    </option>
                                    <option value="Bike">Bike</option>
                                    <option value="Three-Wheel">
                                        Three-Wheel
                                    </option>
                                    <option value="Lorry">Lorry</option>
                                </select>
                            </div>
                        </div>

                        {/* ID Card Image Upload */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                ID Card Image
                            </label>
                            <input
                                type="file"
                                onChange={(e) =>
                                    handleFileChange(
                                        e,
                                        setIdCardImageUrl,
                                        setPreviewIdCard,
                                        'idCard'
                                    )
                                }
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg"
                                required
                            />
                            {loading.idCard && (
                                <div className="mt-2">
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 0114.276-4.8L4.64 12H4z"
                                        ></path>
                                    </svg>
                                </div>
                            )}
                            {previewIdCard && (
                                <img
                                    src={`${idCardImageUrl}`}
                                    alt="ID Card Preview"
                                    className="mt-2 w-32 h-32 object-cover"
                                />
                            )}
                        </div>

                        {/* License Image Upload */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                License Image
                            </label>
                            <input
                                type="file"
                                onChange={(e) =>
                                    handleFileChange(
                                        e,
                                        setLicenseImageUrl,
                                        setPreviewLicense,
                                        'license'
                                    )
                                }
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg"
                                required
                            />
                            {loading.license && (
                                <div className="mt-2">
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 0114.276-4.8L4.64 12H4z"
                                        ></path>
                                    </svg>
                                </div>
                            )}
                            {previewLicense && (
                                <img
                                    src={`${licenseImageUrl}`}
                                    alt="License Preview"
                                    className="mt-2 w-32 h-32 object-cover"
                                />
                            )}
                        </div>

                        {/* Personal Image Upload */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Personal Image
                            </label>
                            <input
                                type="file"
                                onChange={(e) =>
                                    handleFileChange(
                                        e,
                                        setPersonalImageUrl,
                                        setPreviewPersonal,
                                        'personal'
                                    )
                                }
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg"
                                required
                            />
                            {loading.personal && (
                                <div className="mt-2">
                                    <svg
                                        className="animate-spin h-5 w-5 mr-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 0114.276-4.8L4.64 12H4z"
                                        ></path>
                                    </svg>
                                </div>
                            )}
                            {previewPersonal && (
                                <img
                                    src={`${personalImageUrl}`}
                                    alt="Personal Preview"
                                    className="mt-2 w-32 h-32 object-cover"
                                />
                            )}
                        </div>

                        {successMessage && (
                            <p className="text-green-500 text-sm mt-2">
                                {successMessage}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="mt-6 w-full bg-lime-500 text-black py-2 px-4 rounded-lg hover:bg-lime-600"
                            disabled={
                                loading.idCard ||
                                loading.license ||
                                loading.personal
                            }
                        >
                            {loading.idCard ||
                            loading.license ||
                            loading.personal
                                ? 'Uploading...'
                                : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterDriverForm
