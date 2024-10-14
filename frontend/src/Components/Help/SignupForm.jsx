import { Link } from 'react-router-dom'
import { useState } from 'react'

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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
                    Create Customer Care Manager Account
                </h1>
                <p className="mb-5 text-center">
                    By creating a Farmcart account, you agree to our{' '}
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
                    <div className="flex items-center mb-4">
                        {/* First Name */}
                        <div className="flex flex-col w-full mr-2">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Enter First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="p-2 border rounded"
                                required
                            />
                        </div>
                        {/* Last Name */}
                        <div className="flex flex-col w-full">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Enter Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="p-2 border rounded"
                                required
                            />
                        </div>
                    </div>
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
                        Sign Up
                    </button>
                </form>
                {/* Already have an account section */}
                <div className="mt-4 text-center">
                    <p>
                        Already have an account?{' '}
                        <Link
                            to="/help/login"
                            className="text-[#75b100] font-semibold"
                        >
                            Log in here
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignupForm
