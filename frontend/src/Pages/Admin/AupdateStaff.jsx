import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../axios'
import Swal from 'sweetalert2'
import Sidebar from '../../Components/Admin/AsideBar'

const UpdateStaff = () => {
    const navigate = useNavigate()
    const { id } = useParams() // Get the staff ID from the URL
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
        role: '',
    })
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({
        nic: '',
        email: '',
        phone: '',
        birthday: '',
        role: '',
    })

    // Fetch staff member details
    useEffect(() => {
        const fetchStaffDetails = async () => {
            try {
                const { data } = await axios.get(`/staff/${id}`)
                setFormData(data)
            } catch (err) {
                console.error('Error fetching staff details:', err)
                Swal.fire('Error', 'Error fetching staff details', 'error')
            } finally {
                setLoading(false)
            }
        }

        fetchStaffDetails()
    }, [id])

    // Helper for validation
    const validateField = (name, value) => {
        let error = ''

        if (name === 'nic') {
            const nicRegex = /^[0-9]{0,11}[0-9v]?$/i
            error = !nicRegex.test(value) ? 'Invalid NIC format' : ''
        }

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            error = !emailRegex.test(value) ? 'Invalid email format' : ''
        }

        if (name === 'phone') {
            const phoneRegex = /^\d+$/
            error = !phoneRegex.test(value)
                ? 'Phone number must be digits only'
                : ''
        }

        if (name === 'birthday') {
            const minDate = new Date('1980-01-01')
            const maxDate = new Date('2006-12-31')
            const selectedDate = new Date(value)
            if (selectedDate < minDate || selectedDate > maxDate) {
                error = 'Birthday must be between 1980 and 2006'
            }
        }

        return error
    }

    // Handle input change with validation
    const handleChange = (e) => {
        const { name, value } = e.target
        const error = validateField(name, value)

        setFormData({ ...formData, [name]: value })
        setErrors({ ...errors, [name]: error })
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Object.values(errors).some((err) => err)) {
            Swal.fire('Validation Error', 'Please fix the errors', 'error')
            return
        }

        try {
            await axios.put(`/staff/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            Swal.fire('Success', 'Staff member updated successfully', 'success')
            navigate('/staff')
        } catch (err) {
            console.error('Error updating staff:', err)
            Swal.fire(
                'Error',
                'Error updating staff member, please try again',
                'error'
            )
        }
    }

    const handleCancel = () => {
        navigate('/staff')
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-24 mt-16">
                <Sidebar />
            </aside>

            <div className="flex-1 p-32 ml-64 overflow-y-auto">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-12 pl-6 rounded-lg shadow-md w-full"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Update Staff Member
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
                                    required
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-xs">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
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
                                    <option value="Blog Manager">
                                        Blog Manager
                                    </option>
                                    <option value="Order Manager">
                                        Order Manager
                                    </option>
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

                    <div className="flex gap-6 mt-8">
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateStaff
