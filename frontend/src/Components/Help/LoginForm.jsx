import { Link } from 'react-router-dom'
import { useState } from 'react'

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission logic here
        console.log('Form submitted:', formData)
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
                    >
                        Log In
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
