import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import farmcartLogo from '../../assets/logo.png' // Update with correct path if needed

const AdminLogin = ({ manager }) => {
    // Receive the manager prop
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    // Hardcoded usernames and passwords for three users
    const users = [
        {
            email: 'sanjeewa@gmail.com',
            password: 'sanjeewa',
        },
        {
            email: 'admin@farmcart.com',
            password: 'password123',
        },
        {
            email: 'admin3@example.com',
            password: 'securePass',
        },
    ]

    // Login handler
    const handleLogin = (e) => {
        e.preventDefault()

        // Find matching user from the list
        const user = users.find(
            (user) => user.email === email && user.password === password
        )

        if (user) {
            // If user exists, save token and navigate based on manager prop
            const token =
                'd0ahfFiO0dPMd1StZ0W7fqYhxxuIJYtEDXgi6t39Pp2J2qaWyfcFT0gJKO3iT6pz' // Replace with actual token logic
            localStorage.setItem('staffToken', token) // Save token in local storage

            // Navigate based on the manager prop
            if (manager) {
                navigate('/manager/dashboard')
            } else {
                navigate('/admindashboard')
            }
            toast.success('Login successful!')
        } else {
            // If no match, show error message
            setError('Invalid email or password.')
            toast.error('Invalid email or password.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border-2 border-green-600">
                <img
                    src={farmcartLogo} // Replace with the path to your logo image
                    alt="Logo"
                    className="h-16 w-auto mb-4 mx-auto"
                />
                <div className="text-left mb-5">
                    <h2 className="text-3xl font-bold">Admin Login</h2>
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
            </div>
        </div>
    )
}

export default AdminLogin
