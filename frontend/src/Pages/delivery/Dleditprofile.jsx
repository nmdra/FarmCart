import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DeliverySidebar from '../../Components/delivery/DeliverySidebar'
import Swal from 'sweetalert2'
import Loading from '../../Components/Loading'

const DLEditProfile = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [driver, setDriver] = useState(null)
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    // Fetch driver profile for sidebar
    useEffect(() => {
        const fetchDriverProfile = async () => {
            const driverToken = localStorage.getItem('driverToken')
            if (!driverToken) {
                navigate('/driver/login') // Redirect to login if not authenticated
                return
            }

            try {
                const { data } = await axios.get('/api/drivers/profile', {
                    headers: {
                        Authorization: `Bearer ${driverToken}`,
                    },
                })
                setDriver(data) // Set driver data for the sidebar
                setLoading(false)
            } catch (error) {
                console.error('Error fetching driver profile:', error)
                localStorage.removeItem('driverToken')
                navigate('/driver/login')
            }
        }

        fetchDriverProfile()
    }, [navigate])

    // Handle form submission for updating the password
    const handleSubmit = async (e) => {
        e.preventDefault()

        const confirmChange = await Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to change your password?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, change it!',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton:
                    'bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600',
                cancelButton:
                    'bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600',
            },
            buttonsStyling: false,
        })

        if (!confirmChange.isConfirmed) return

        const driverToken = localStorage.getItem('driverToken')
        try {
            await axios.put(
                '/api/drivers/profile/password',
                { currentPassword, newPassword, confirmPassword },
                {
                    headers: {
                        Authorization: `Bearer ${driverToken}`,
                    },
                }
            )
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Password updated successfully',
                customClass: {
                    confirmButton:
                        'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600',
                },
            })
            navigate('/driver/profile')
        } catch (error) {
            setMessage(error.response.data.message || 'Error updating password')
        }
    }

    // Handle account deletion
    const handleDeleteAccount = async () => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete your account? This process cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton:
                    'bg-red-500 text-white font-bold py-2 px-8 rounded hover:bg-red-600 mr-8',
                cancelButton:
                    'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600',
            },
            buttonsStyling: false,
        })

        if (confirmDelete.isConfirmed) {
            const driverToken = localStorage.getItem('driverToken')
            try {
                await axios.delete('/api/drivers/delete', {
                    headers: {
                        Authorization: `Bearer ${driverToken}`,
                    },
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Account deleted successfully',
                    customClass: {
                        confirmButton:
                            'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600',
                    },
                })
                localStorage.removeItem('driverToken')
                navigate('/')
            } catch (error) {
                setMessage(
                    error.response.data.message || 'Error deleting account'
                )
            }
        }
    }
    // New onChange handler for password validation
    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        let errorMessage = ''

        // Password validation
        if (name === 'newPassword') {
            const passwordRegex =
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            if (!passwordRegex.test(value)) {
                errorMessage =
                    'Password must be at least 8 characters long and include at least one special character and one number.'
            }
            setNewPassword(value) // Update newPassword state
        }

        // Confirm password validation
        if (name === 'confirmPassword') {
            if (value !== newPassword) {
                errorMessage = 'Passwords do not match.'
            }
            setConfirmPassword(value) // Update confirmPassword state
        }

        setMessage(errorMessage) // Set validation error message
    }

    if (loading) {
        return (
            <div className="flex flex-1 min-h-screen justify-center items-center">
                <Loading />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <DeliverySidebar driver={driver} />
            </aside>

            <div className="flex-grow ml-64 p-24">
                {/* Security Message */}
                <div className="bg-red-500 text-white p-4 rounded-md mb-6 text-center">
                    <strong>
                        Because of security reasons, you cannot change your
                        details. If you have anything to update, contact us
                        through email.
                    </strong>
                </div>
                <div className="bg-white p-6 rounded-md shadow-md w-full mb-12">
                    <h2 className="text-2xl font-semibold text-center mb-6">
                        Edit Profile
                    </h2>
                    {message && <p className="text-red-500 mb-4">{message}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-2 text-gray-700 text-left font-semibold">
                                Current Password
                            </label>
                            <input
                                type="password"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-gray-700 text-left font-semibold">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={newPassword}
                                onChange={handlePasswordChange} // Trigger validation on change
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2 text-gray-700 text-left font-semibold">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={confirmPassword}
                                onChange={handlePasswordChange} // Trigger validation on change
                                required
                            />
                        </div>

                        {message && <p className="text-red-500">{message}</p>}

                        <button
                            type="submit"
                            className="w-full py-2 mt-6 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            Change Password
                        </button>
                    </form>
                </div>

                <div className="mt-6 bg-white p-6 rounded-md shadow-md w-full">
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

export default DLEditProfile
