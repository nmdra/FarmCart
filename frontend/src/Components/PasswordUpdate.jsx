import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FaInfoCircle, FaEye, FaEyeSlash } from 'react-icons/fa'

const PasswordUpdate = () => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    // State for revealing passwords
    const [revealCurrentPassword, setRevealCurrentPassword] = useState(false)
    const [revealNewPassword, setRevealNewPassword] = useState(false)
    const [revealConfirmPassword, setRevealConfirmPassword] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const validatePassword = (pwd) => {
        const hasUpperCase = /[A-Z]/.test(pwd)
        const hasLowerCase = /[a-z]/.test(pwd)
        const hasNumbers = /\d/.test(pwd)
        const hasSpecialChars = /[!@#$%^&*]/.test(pwd)
        const isLongEnough = pwd.length >= 8

        if (!isLongEnough) {
            return 'Password must be at least 8 characters long.'
        } else if (!hasUpperCase) {
            return 'Password must contain at least one uppercase letter.'
        } else if (!hasLowerCase) {
            return 'Password must contain at least one lowercase letter.'
        } else if (!hasNumbers) {
            return 'Password must contain at least one number.'
        } else if (!hasSpecialChars) {
            return 'Password must contain at least one special character.'
        }

        return '' // No errors
    }

    const validateConfirmPassword = (confirmPwd) => {
        if (confirmPwd !== formData.newPassword) {
            return 'Passwords do not match.'
        }
        return '' // No errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { currentPassword, newPassword, confirmNewPassword } = formData

        // Validate before submitting
        const passwordValidationError = validatePassword(newPassword)
        const confirmPasswordValidationError =
            validateConfirmPassword(confirmNewPassword)

        if (passwordValidationError || confirmPasswordValidationError) {
            setPasswordError(passwordValidationError)
            setConfirmPasswordError(confirmPasswordValidationError)
            return
        }

        try {
            setIsLoading(true)
            const validationResponse = await axios.post(
                '/api/users/validate-password',
                { currentPassword }
            )

            if (!validationResponse.data.valid) {
                toast.error('Current password is incorrect')
                setIsLoading(false)
                return
            }

            // If validation is successful, proceed to update the password
            await axios.put('/api/users/update-password', { newPassword })
            toast.success('Password updated successfully')

            // Clear user data from localStorage
            localStorage.removeItem('user')

            // Redirect to the login page
            navigate('/login')
        } catch (error) {
            console.error('Error updating password:', error)
            toast.error('Failed to update password')
        } finally {
            setIsLoading(false)
        }
    }

    // UseEffect for live password validation
    useEffect(() => {
        if (formData.newPassword) {
            const error = validatePassword(formData.newPassword)
            setPasswordError(error)
        } else {
            setPasswordError('')
        }
    }, [formData.newPassword])

    useEffect(() => {
        if (formData.confirmNewPassword) {
            const error = validateConfirmPassword(formData.confirmNewPassword)
            setConfirmPasswordError(error)
        } else {
            setConfirmPasswordError('')
        }
    }, [formData.confirmNewPassword])

    return (
        <div className="max-w-full mx-8 my-6 p-6 bg-white rounded-lg shadow-md border-2 border-green-600">
            <h2 className="text-2xl font-semibold mb-4">Update Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Current Password
                    </label>
                    <div className="relative">
                        <input
                            type={revealCurrentPassword ? 'text' : 'password'}
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 border rounded-md"
                            placeholder="Current Password"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                            onClick={() =>
                                setRevealCurrentPassword(!revealCurrentPassword)
                            }
                        >
                            {revealCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <div className="relative">
                        <input
                            type={revealNewPassword ? 'text' : 'password'}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 border rounded-md"
                            placeholder="New Password"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                            onClick={() =>
                                setRevealNewPassword(!revealNewPassword)
                            }
                        >
                            {revealNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {passwordError && (
                        <p className="text-red-500 text-sm flex items-center">
                            <FaInfoCircle className="mr-1" /> {passwordError}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <input
                            type={revealConfirmPassword ? 'text' : 'password'}
                            name="confirmNewPassword"
                            value={formData.confirmNewPassword}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 border rounded-md"
                            placeholder="Confirm New Password"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                            onClick={() =>
                                setRevealConfirmPassword(!revealConfirmPassword)
                            }
                        >
                            {revealConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {confirmPasswordError && (
                        <p className="text-red-500 text-sm flex items-center">
                            <FaInfoCircle className="mr-1" />{' '}
                            {confirmPasswordError}
                        </p>
                    )}
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className={`w-full md:w-auto px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Updating...' : 'Update Password'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PasswordUpdate
