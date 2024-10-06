import { useState } from 'react'
import axios from 'axios'
import farmcartLogo from '../../assets/logo.png'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setError('')
        setLoading(true)

        try {
            const { data } = await axios.post('/api/users/forgot-password', {
                verifyEmail: email,
            })
            toast.success('Email sent successfully')
            setMessage(data.message)
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    'Something went wrong. Please try again.'
            )
        } finally {
            setLoading(false)
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
                <h2 className="text-2xl font-semibold mb-6">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-600 focus:border-transparent"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-lime-600 text-white py-2 px-4 rounded-lg hover:bg-lime-700 flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-opacity-50"
                        disabled={loading}
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 mr-3 text-white"
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
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                        ) : (
                            'Submit'
                        )}
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

export default ForgotPassword
