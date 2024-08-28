import { useEffect, useState } from 'react'
import axios from '../../../axios'
import Sidebar from '../../Components/farmer/Farmer_sidebar'
import profilepic from '../../assets/profile.png'
import { useNavigate } from 'react-router-dom'
const ProfilePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNumber: '',
        NIC: '',
        BirthDay: '',
        Address: {
            houseNo: '',
            streetName: '',
            city: '',
        },
    })
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        contactNumber: '',
        BirthDay: '',
        NIC: '',
    })
    const navigate = useNavigate()

    useEffect(() => {
        const fetchFarmerDetails = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                const { data } = await axios.get('/farmers/profile', config)
                setFormData({
                    name: data.name,
                    email: data.email,
                    contactNumber: data.contactNumber,
                    NIC: data.NIC,
                    BirthDay: data.BirthDay,
                    Address: data.Address,
                })
            } catch (error) {
                console.error('Error fetching farmer details:', error)
            }
        }

        fetchFarmerDetails()
    }, [])

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

    const validateName = (name) => {
        return /^[A-Za-z\s]+$/.test(name) // Only letters and spaces
    }

    const validateEmail = (email) => {
        return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email) // Must be a Gmail address
    }

    const validateContactNumber = (contactNumber) => {
        return (
            /^[0-9]{10}$/.test(contactNumber) && contactNumber.startsWith('0')
        ) // Must be 10 digits and start with 0
    }

    const validateNIC = (NIC, BirthDay) => {
        const nicRegex = /^\d{11}[0-9XV]$/
        const birthYear = BirthDay.substring(0, 4)

        return nicRegex.test(NIC) && NIC.substring(0, 4) === birthYear // NIC must match the birth year
    }

    const validateAge = (birthDate) => {
        const age = calculateAge(birthDate)
        return age >= 18 // Must be at least 18 years old
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        if (['houseNo', 'streetName', 'city'].includes(name)) {
            setFormData((prevData) => ({
                ...prevData,
                Address: {
                    ...prevData.Address,
                    [name]: value,
                },
            }))
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }))
        }

        let error = ''
        switch (name) {
            case 'name':
                error = validateName(value)
                    ? ''
                    : 'Name must contain only letters and spaces'
                break
            case 'email':
                error = validateEmail(value)
                    ? ''
                    : 'Email must be a valid Gmail address.'
                break
            case 'contactNumber':
                error = validateContactNumber(value)
                    ? ''
                    : 'Contact number must be 10 digits long and start with 0.'
                break
            case 'BirthDay':
                error = validateAge(value)
                    ? ''
                    : 'You must be at least 18 years old'
                break
            case 'NIC':
                error = validateNIC(value, formData.BirthDay)
                    ? ''
                    : 'Please enter a valid NIC'
                break
            default:
                break
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (Object.values(errors).some((error) => error)) {
            alert('Please fix the errors in the form before submitting.')
            return
        }

        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            await axios.put('/farmers/profile', formData, config)
            alert('Profile updated successfully')
            navigate('/farmerdashboard')
        } catch (error) {
            console.error(
                'Error updating profile:',
                error.response?.data || error.message
            )
            alert(
                'An error occurred while updating the profile. Please try again.'
            )
        }
    }

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete your account? This action cannot be undone.'
        )
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                await axios.delete('/farmers/profile', config)
                alert('Account deleted successfully')
                navigate('/')
            } catch (error) {
                console.error(
                    'Error deleting account:',
                    error.response?.data?.message || error.message
                )
                alert(
                    'An error occurred while deleting the account. Please try again.'
                )
            }
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Fixed Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-32">
                <Sidebar />
            </aside>

            <div className="flex-1  ml-64 p-24 overflow-y-auto">
                {/* Account Settings Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 pl-8 rounded-lg shadow-md w-full mb-12"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Account Settings
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 text-left">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-left">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-left">
                                        Birthday
                                    </label>
                                    <input
                                        type="date"
                                        name="BirthDay"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                        value={formData.BirthDay.substring(
                                            0,
                                            10
                                        )}
                                        onChange={handleChange}
                                    />
                                    {errors.BirthDay && (
                                        <p className="text-red-500 text-sm">
                                            {errors.BirthDay}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-left">
                                        NIC
                                    </label>
                                    <input
                                        type="text"
                                        name="NIC"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                        value={formData.NIC}
                                        onChange={handleChange}
                                    />
                                    {errors.NIC && (
                                        <p className="text-red-500 text-sm">
                                            {errors.NIC}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-left">
                                        Contact Number
                                    </label>
                                    <input
                                        type="text"
                                        name="contactNumber"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                    />
                                    {errors.contactNumber && (
                                        <p className="text-red-500 text-sm">
                                            {errors.contactNumber}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center mt-4">
                            <img
                                className="w-32 h-32 rounded-full object-cover"
                                src={profilepic}
                                alt="Profile"
                            />
                            <button
                                type="button"
                                className="mt-4 bg-white text-green-500 hover:text-green-600 font-semibold py-2 px-4 border border-green-500 rounded"
                            >
                                Choose Image
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="flex justify-start mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                        Save Changes
                    </button>
                </form>

                {/* Address Settings Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 pl-8 rounded-lg shadow-md w-full mb-12"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Farmer Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-gray-700 text-left">
                                House No
                            </label>
                            <input
                                type="text"
                                name="houseNo"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={formData.Address.houseNo}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-left">
                                Street Address
                            </label>
                            <input
                                type="text"
                                name="streetName"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={formData.Address.streetName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-left">
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={formData.Address.city}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div>
                            <label className="block text-gray-700 text-left">
                                Country
                            </label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={'Sri Lanka'}
                                readOnly
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="flex justify-start mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                        Save Changes
                    </button>
                </form>

                {/* Delete Account Card */}
                <div className="bg-white p-6 pl-8 rounded-lg shadow-md w-full">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Delete Account
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Deleting your account is a permanent action and cannot
                        be undone. Please be sure before proceeding.
                    </p>
                    <button
                        onClick={handleDeleteAccount}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                        Delete My Account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
