import React, { useState } from 'react'
import axios from '../../../axios' // Import your axios instance with baseURL and interceptor
import { useNavigate } from 'react-router-dom'

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
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const navigate = useNavigate()

    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    // Handle file input changes
    const handleFileChange = (e, setImageFunction) => {
        setImageFunction(e.target.files[0])
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const formDataObj = new FormData()
            Object.keys(formData).forEach((key) =>
                formDataObj.append(key, formData[key])
            )
            formDataObj.append('idCardImage', idCardImage)
            formDataObj.append('licenseImage', licenseImage)
            formDataObj.append('personalImage', personalImage)

            const response = await axios.post('/d_forms', formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            setSuccessMessage('Registration successful!')
            setLoading(false)
            navigate('/checkEmail')
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    'Failed to submit the form. Please try again.'
            )
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6">
                    Driver Registration Form
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md"
                            required
                        />
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md col-span-2"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md col-span-2"
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md col-span-2"
                            required
                        />
                        <input
                            type="date"
                            name="dateOfBirth"
                            placeholder="Date of Birth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md col-span-2"
                            required
                        />
                        <input
                            type="text"
                            name="idCardNumber"
                            placeholder="ID Card Number"
                            value={formData.idCardNumber}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md col-span-2"
                            required
                        />
                        <input
                            type="text"
                            name="licenseCardNumber"
                            placeholder="License Card Number"
                            value={formData.licenseCardNumber}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md col-span-2"
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md col-span-2"
                            required
                        />
                        <input
                            type="text"
                            name="vehicleNumber"
                            placeholder="Vehicle Number"
                            value={formData.vehicleNumber}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md col-span-2"
                            required
                        />
                        <select
                            name="vehicleType"
                            value={formData.vehicleType}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md col-span-2"
                            required
                        >
                            <option value="">Select Vehicle Type</option>
                            <option value="Bike">Bike</option>
                            <option value="Three-Wheel">Three-Wheel</option>
                            <option value="Lorry">Lorry</option>
                        </select>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            ID Card Image
                        </label>
                        <input
                            type="file"
                            onChange={(e) =>
                                handleFileChange(e, setIdCardImage)
                            }
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
                            onChange={(e) =>
                                handleFileChange(e, setLicenseImage)
                            }
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
                            onChange={(e) =>
                                handleFileChange(e, setPersonalImage)
                            }
                            className="border p-2 rounded-md w-full"
                            required
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                    {successMessage && (
                        <p className="text-green-500 text-sm mt-2">
                            {successMessage}
                        </p>
                    )}
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
