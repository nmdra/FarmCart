import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const DLLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(
                'http://localhost:3000/api/drivers/login',
                { email, password }
            )
            localStorage.setItem('driverToken', data.token) // Store JWT token in localStorage
            navigate('/driver/dashboard') // Redirect to dashboard on successful login
        } catch (err) {
            setError('Invalid email or password')
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 p-6 bg-white rounded shadow">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Driver Login
                </h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default DLLogin
