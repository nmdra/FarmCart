import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminCreateStaffPage = () => {
    const location = useLocation()
    const editMode = location.state?.editMode || false // Fallback to false if not editing
    const staffToEdit = location.state?.staffToEdit || {}

    const [formData, setFormData] = useState(
        editMode
            ? {
                  nic: staffToEdit.nic,
                  name: staffToEdit.name,
                  birthday: staffToEdit.birthday.split('T')[0],
                  email: staffToEdit.email,
                  phone: staffToEdit.phone,
                  address: staffToEdit.address,
              }
            : {
                  nic: '',
                  name: '',
                  birthday: '',
                  email: '',
                  phone: '',
                  address: '',
              }
    )

    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target

        // Validation for birthday: Ensure date is between 1980 and 2006
        if (name === 'birthday') {
            const minDate = new Date('1980-01-01')
            const maxDate = new Date('2006-12-31')
            const selectedDate = new Date(value)

            if (selectedDate < minDate || selectedDate > maxDate) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    birthday: 'Date must be between 1980 and 2006',
                }))
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, birthday: null }))
            }
        }

        // Update form data even if there are errors to let users correct input
        setFormData({ ...formData, [name]: value })
    }

    const handleNICKeyPress = (e) => {
        const inputValue = e.target.value + e.key

        // Regular expression for the first 11 characters as numbers and last character as a number or 'v'
        const allowedPattern = /^[0-9]{0,11}[0-9v]?$/i

        if (!allowedPattern.test(inputValue)) {
            e.preventDefault() // Prevent the keypress if it doesn't match the pattern
        }
    }

    const handleNameKeyPress = (e) => {
        const allowedChars = /^[a-zA-Z\s]*$/
        if (!allowedChars.test(e.key)) {
            e.preventDefault() // Prevent the keypress if it is not a letter or space
        }
    }

    const handlePhoneKeyPress = (e) => {
        const allowedChars = /^[0-9]*$/
        if (!allowedChars.test(e.key)) {
            e.preventDefault() // Prevent the keypress if it is not a number
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Check for errors before submitting
        if (
            errors.nic ||
            errors.name ||
            errors.phone ||
            errors.email ||
            errors.birthday
        ) {
            console.error(
                'Please fix the validation errors before submitting the form.'
            )
            return
        }

        try {
            if (editMode) {
                await axios.put(
                    `http://localhost:3000/api/staff/${staffToEdit._id}`,
                    formData
                )
            } else {
                await axios.post(
                    'http://localhost:3000/api/staff/Addstaff',
                    formData
                )
            }
            navigate('/staff') // Redirect to StaffPage after successful submission
        } catch (error) {
            console.error('Error submitting staff data:', error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border-2 border-green-600">
                <div className="text-left mb-5">
                    {/*       <img
          src={../} // Replace this with the actual path to your logo
          alt="FarmCart Logo"
          className="h-10 w-auto mb-4 mx-auto" // Adjust the size and margins as needed
        /> */}
                    <h2 className="text-3xl font-bold">
                        {editMode ? 'Edit Staff Member' : 'Add Staff Member'}
                    </h2>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* NIC Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">NIC</label>
                        <input
                            type="text"
                            name="nic"
                            value={formData.nic}
                            onChange={handleInputChange}
                            onKeyPress={handleNICKeyPress}
                            className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                            required
                            maxLength="12"
                            placeholder="Enter NIC"
                        />
                        {errors.nic && (
                            <p className="text-red-500 text-sm">{errors.nic}</p>
                        )}
                    </div>

                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            onKeyPress={handleNameKeyPress}
                            className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                            required
                            placeholder="Enter Name"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Birthday Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Birthday</label>
                        <input
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                            required
                            min="1980-01-01"
                            max="2006-12-31"
                        />
                        {errors.birthday && (
                            <p className="text-red-500 text-sm">
                                {errors.birthday}
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                            required
                            placeholder="Enter Email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Phone Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            onKeyPress={handlePhoneKeyPress}
                            className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                            required
                            maxLength="10"
                            placeholder="Enter Phone Number"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    {/* Address Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                            required
                            placeholder="Enter Address"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-lime-500 text-black rounded-lg hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400"
                    >
                        {editMode
                            ? 'Update Staff Member'
                            : 'Create Staff Member'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminCreateStaffPage
