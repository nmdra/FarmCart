import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'
import Swal from 'sweetalert2'
import Sidebar from '../../Components/Admin/AsideBar'

const AddStaff = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        nic: '',
        email: '',
        birthday: '',
        phone: '',
        home: '',
        street: '',
        city: '',
        role: '', // role is initialized here
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({
        nic: '',
        email: '',
        phone: '',
        birthday: '',
        role: '', // Add error state for role
    })

    // Handle input change with validation
    const handleChange = (e) => {
        const { name, value } = e.target
        let error = ''

        // NIC validation: Allow only 11 digits followed by an optional 'v'
        if (name === 'nic') {
            const nicRegex = /^[0-9]{0,11}[0-9v]?$/i
            error = !nicRegex.test(value) ? 'Invalid NIC format' : ''
        }

        // Email validation
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            error = !emailRegex.test(value) ? 'Invalid email format' : ''
        }

        // Phone validation: Only digits allowed
        if (name === 'phone') {
            const phoneRegex = /^\d+$/
            error = !phoneRegex.test(value)
                ? 'Phone number must be digits only'
                : ''
        }

        // Birthday validation: Ensure date is between 1980 and 2006
        if (name === 'birthday') {
            const minDate = new Date('1980-01-01')
            const maxDate = new Date('2006-12-31')
            const selectedDate = new Date(value)

            if (selectedDate < minDate || selectedDate > maxDate) {
                error = 'Birthday must be between 1980 and 2006'
            }
        }

        // Update state
        setFormData({ ...formData, [name]: value })
        setErrors({ ...errors, [name]: error })
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        // Check for errors before submitting
        if (Object.values(errors).some((err) => err)) {
            Swal.fire('Validation Error', 'Please fix the errors', 'error')
            return
        }

        try {
            setLoading(true)

            const staffData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                nic: formData.nic,
                email: formData.email,
                birthday: formData.birthday,
                phone: formData.phone,
                Address: {
                    home: formData.home,
                    street: formData.street,
                    city: formData.city,
                },
                role: formData.role,
            }

            await axios.post('/staff', staffData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

            Swal.fire('Success', 'Staff member added successfully', 'success')
            navigate('/staff')
        } catch (err) {
            console.error('Error adding staff:', err)
            Swal.fire(
                'Error',
                'Error adding staff member, please try again',
                'error'
            )
        } finally {
            setLoading(false)
        }
    }

    // Handle keypress for NIC field
    const handleNICKeyPress = (e) => {
        const inputValue = e.target.value + e.key
        const allowedPattern = /^[0-9]{0,11}[0-9v]?$/i
        if (!allowedPattern.test(inputValue)) {
            e.preventDefault()
        }
    }

    // Handle keypress for name field (letters only)
    const handleNameKeyPress = (e) => {
        const allowedChars = /^[a-zA-Z\s]*$/
        if (!allowedChars.test(e.key)) {
            e.preventDefault()
        }
    }

    // Handle keypress for phone field (digits only and limit to 10 digits)
    const handlePhoneKeyPress = (e) => {
        const allowedChars = /^[0-9]*$/
        if (
            !allowedChars.test(e.key) ||
            (e.target.value.length >= 10 && e.key !== 'Backspace')
        ) {
            e.preventDefault()
        }
    }

    const handleCancel = () => {
        navigate('/staff')
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-24 mt-16">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-32 ml-64 overflow-y-auto">
                {/* Add Staff Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-12 pl-6 rounded-lg shadow-md w-full"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Add Staff Member
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">
                            <div>
                                <label className="block text-gray-700">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    onKeyPress={handleNameKeyPress}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    onKeyPress={handleNameKeyPress}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">
                                    NIC
                                </label>
                                <input
                                    type="text"
                                    name="nic"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    value={formData.nic}
                                    onChange={handleChange}
                                    onKeyPress={handleNICKeyPress}
                                    required
                                />
                                {errors.nic && (
                                    <p className="text-red-500 text-xs">
                                        {errors.nic}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-700">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onKeyPress={handlePhoneKeyPress}
                                    required
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-xs">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                            {/* Birthday Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    Birthday
                                </label>
                                <input
                                    type="date"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleChange}
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
                            {/* Role Dropdown */}
                            <div>
                                <label className="block text-gray-700">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    required
                                >
                                    <option value="" disabled>
                                        Select a role
                                    </option>
                                    <option value="Manager">Manager</option>
                                    <option value="Deliver">
                                        Delivery Guy
                                    </option>
                                    <option value="Finance Manager">
                                        Finance Manager
                                    </option>
                                    <option value="Blog manager">
                                        Deliver
                                    </option>
                                    <option value="Order manager">
                                        Order Manger
                                    </option>
                                    {/* Add more roles as needed */}
                                </select>
                                {errors.role && (
                                    <p className="text-red-500 text-sm">
                                        {errors.role}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-1 space-y-4">
                            <div>
                                <label className="block text-gray-700">
                                    Home
                                </label>
                                <input
                                    type="text"
                                    name="home"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    value={formData.home}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">
                                    Street
                                </label>
                                <input
                                    type="text"
                                    name="street"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    value={formData.street}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add Staff'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddStaff
