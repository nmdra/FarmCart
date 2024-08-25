import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import farmcartLogo from '../../assets/logo.png'

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get('token')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setError('')

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        try {
            const { data } = await axios.post(`/api/users/reset-pass`, {
                token,
                password,
            })
            setMessage(data.message)
            setTimeout(() => {
                navigate('/login')
            }, 3000) // Redirect after 3 seconds
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    'Failed to reset password. Please try again.'
            )
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm border-2 border-lime-600">
                <img
                    src={farmcartLogo} // Replace with the path to your logo image
                    alt="Logo"
                    className="h-5 w-auto mb-2" // Adjust the height as needed
                />
                <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
                            placeholder="Enter your new password"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
                            placeholder="Confirm your new password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-lime-600 text-white py-2 px-4 rounded-lg hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50 flex justify-center items-center"
                    >
                        Reset Password
                    </button>
                </form>
                {message && (
                    <p className="mt-4 text-green-600 font-medium">{message}</p>
                )}
                {error && (
                    <p className="mt-4 text-red-600 font-medium">{error}</p>
                )}
            </div>
        </div>
    )
}

export default ResetPassword
