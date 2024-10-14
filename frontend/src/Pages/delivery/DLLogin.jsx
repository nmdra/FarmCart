import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import farmcartLogo from '../../assets/logo.png'

const DLLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/drivers/login', {
                email,
                password,
            })
            localStorage.setItem('driverToken', data.token) // Store JWT token in localStorage
            navigate('/driver/dashboard') // Redirect to dashboard on successful login
        } catch (err) {
            setError('Invalid email or password')
            toast.error('Invalid email or password')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border-2 border-green-600">
                <img
                    src={farmcartLogo} // Replace with the path to your logo image
                    alt="Logo"
                    className="h-10 w-auto mb-4 mx-auto" // Adjust the height as needed
                />
                <div className="text-left mb-5">
                    <h2 className="text-3xl font-bold">Driver Login</h2>
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email address"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-lime-500 text-black rounded-lg hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400"
                    >
                        Login
                    </button>
                    <ToastContainer />
                </form>
                <div className="mt-4">
                    <Link
                        to="/forgot-password"
                        className="text-blue-600 hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </div>
                <div className="mt-4">
                    <span>If you don't have an account?</span>{' '}
                    <Link
                        to="/register-driver"
                        className="text-blue-600 hover:underline"
                    >
                        Register Now.
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DLLogin
