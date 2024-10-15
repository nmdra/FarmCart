import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // Base API URL from environment variable
    const API_URL = import.meta.env.VITE_API_URL

    // Use navigate to redirect the user
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // Use the API_URL from the environment variable
            const response = await axios.post(
                `${API_URL}/help/auth/login`,
                formData
            )
            console.log('Login successful:', response.data)

            // Store the token in localStorage
            localStorage.setItem('token', response.data.token)

            // Redirect to dashboard after successful login
            navigate('/help/dashboard')
        } catch (err) {
            console.error('Login failed:', err)
            setError('Invalid email or password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="px-[5rem] ">
                <h1 className="mb-5 text-4xl font-bold text-center">
                    Customer Care Manager Login
                </h1>
                <p className="mb-5 text-center">
                    By logging in, you agree to our{' '}
                    <span className="text-[#75b100]">
                        <Link to="/terms-of-service">Terms of Service</Link>
                    </span>{' '}
                    and{' '}
                    <span className="text-[#75b100]">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                    </span>
                    .
                </p>

                {error && <p className="text-center text-red-500">{error}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="p-2 border rounded"
                            required
                        />
                    </div>
                    {/* Password */}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="p-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#99dd05] text-black rounded p-2 hover:bg-[#5a9100] transition"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                {/* Need an account section */}
                <div className="mt-4 text-center">
                    <p>
                        Don&apos;t have an account?{' '}
                        <Link
                            to="/help/signup"
                            className="text-[#75b100] font-semibold"
                        >
                            Sign up here
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
