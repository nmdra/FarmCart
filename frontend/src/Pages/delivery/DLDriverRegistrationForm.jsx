import React, { useState } from 'react'
import axios from '../../../axios' // Import your axios instance with baseURL and interceptor
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2' // For user-friendly alerts

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
    const [idCardImage, setIdCardImage] = useState(null)
    const [licenseImage, setLicenseImage] = useState(null)
    const [personalImage, setPersonalImage] = useState(null)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const navigate = useNavigate()

    // Handle form input changes with validation
    const handleInputChange = (e) => {
        const { name, value } = e.target
        let errorMessage = ''

        // Basic validation rules
        if (name === 'email') {
            if (!/^.*@gmail\.com$/.test(value)) {
                errorMessage = 'Email must be a valid @gmail.com address.'
            }
        }

        if (name === 'phone') {
            if (!/^0\d{9}$/.test(value)) {
                errorMessage = 'Phone number must be 10 digits and start with 0.'
            }
        }

        // Add more validations here as needed

        setFormData({
            ...formData,
            [name]: value,
        })

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }))
    }

    // Handle file input changes
    const handleFileChange = (e, setImageFunction) => {
        setImageFunction(e.target.files[0])
    }

    // Handle form submission with validation
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // Check for validation errors before submitting
        if (Object.values(errors).some((error) => error)) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fix the validation errors before submitting.',
                customClass: {
                    confirmButton:
                        'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
                },
            })
            setLoading(false)
            return
        }

        try {
            const formDataObj = new FormData()
            Object.keys(formData).forEach((key) =>
                formDataObj.append(key, formData[key])
            )
            formDataObj.append('idCardImage', idCardImage)
            formDataObj.append('licenseImage', licenseImage)
            formDataObj.append('personalImage', personalImage)

            await axios.post('/d_forms', formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            Swal.fire({
                icon: 'success',
                title: 'Registration Successful',
                text: 'Your registration was successful!',
                customClass: {
                    confirmButton:
                        'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600',
                },
            })

            setLoading(false)
            navigate('/checkEmail')
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to submit the form. Please try again.',
                customClass: {
                    confirmButton:
                        'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
                },
            })
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Driver Registration Form
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* First Name */}
                        <div className="col-span-1">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="border p-2 rounded-md w-full"
                                required
                            />
                            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                        </div>

                        {/* Last Name */}
                        <div className="col-span-1">
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="border p-2 rounded-md w-full"
                                required
                            />
                            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                        </div>

                        {/* Full Name */}
                        <div className="col-span-2">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="border p-2 rounded-md w-full"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="col-span-2">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="border p-2 rounded-md w-full"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div className="col-span-2">
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="border p-2 rounded-md w-full"
                                required
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>

                        {/* Date of Birth */}
                        <div className="col-span-2">
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                className="border p-2 rounded-md w-full"
                                required
                            />
                        </div>

                        {/* ID Card Number */}
                        <div className="col-span-2">
                            <input
                                type="text"
                                name="idCardNumber"
                                placeholder="ID Card Number"
                                value={formData.idCardNumber}
                                onChange={handleInputChange}
                                className="border p-2 rounded-md w-full"
                                required
                            />
                        </div>

                        {/* License Card Number */}
                        <div className="col-span-2">
                            <input
                                type="text"
                                name="licenseCardNumber"
                                placeholder="License Card Number"
                                value={formData.licenseCardNumber}
                                onChange={handleInputChange}
                                className="border p-2 rounded-md w-full"
                                required
                            />
                        </div>

                        {/* Address */}
                        <div className="col-span-2">
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="border p-2 rounded-md w-full"
                                required
                            />
                        </div>

                        {/* Vehicle Number */}
                        <div className="col-span-2">
                            <input
                                type="text"
                                name="vehicleNumber"
                                placeholder="Vehicle Number"
                                value={formData.vehicleNumber}
                                onChange={handleInputChange}
                                className="border p-2 rounded-md w-full"
                                required
                            />
                        </div>

                        {/* Vehicle Type */}
                        <div className="col-span-2">
                            <select
                                name="vehicleType"
                                value={formData.vehicleType}
                                onChange={handleInputChange}
                                className="border p-2 rounded-md w-full"
                                required
                            >
                                <option value="">Select Vehicle Type</option>
                                <option value="Bike">Bike</option>
                                <option value="Three-Wheel">Three-Wheel</option>
                                <option value="Lorry">Lorry</option>
                            </select>
                        </div>
                    </div>

                    {/* File Upload Inputs */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            ID Card Image
                        </label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, setIdCardImage)}
                            className="border p-2 rounded-md w-full"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            License Image
                        </label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, setLicenseImage)}
                            className="border p-2 rounded-md w-full"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Personal Image
                        </label>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e, setPersonalImage)}
                            className="border p-2 rounded-md w-full"
                            required
                        />
                    </div>

                    {/* Error and Success Messages */}
                    {errors.submit && (
                        <p className="text-red-500 text-sm mt-2">{errors.submit}</p>
                    )}
                    {successMessage && (
                        <p className="text-green-500 text-sm mt-2">{successMessage}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-6 bg-green-500 text-white p-2 rounded-md w-full"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegisterDriverForm
