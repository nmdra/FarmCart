import { useState, useEffect } from 'react'
import { useRegister } from '../Hooks/useRegister'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import farmcartLogo from '../assets/logo.png'

const Register = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const { register, error, isLoading } = useRegister()

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }
        await register(name, email, password)
        // Perform registration logic here
        // toast.success('Registration successful!');
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            setEmail('')
            setName('')
            setPassword('')
            setConfirmPassword('')
        }
    }, [error])

    // Strong password check function
    const validatePassword = (pwd) => {
        const hasUpperCase = /[A-Z]/.test(pwd)
        const hasLowerCase = /[a-z]/.test(pwd)
        const hasNumbers = /\d/.test(pwd)
        const hasSpecialChars = /[!@#$%^&*]/.test(pwd)
        const isLongEnough = pwd.length >= 8

        if (!isLongEnough) {
            setPasswordError('Password must be at least 8 characters long.')
        } else if (!hasUpperCase) {
            setPasswordError('Password must contain at least one uppercase letter.')
        } else if (!hasLowerCase) {
            setPasswordError('Password must contain at least one lowercase letter.')
        } else if (!hasNumbers) {
            setPasswordError('Password must contain at least one number.')
        } else if (!hasSpecialChars) {
            setPasswordError('Password must contain at least one special character.')
        } else {
            setPasswordError('') // Clear any error if password is strong
        }
    }


    // Validate confirm password
    const validateConfirmPassword = (confirmPwd) => {
        if (confirmPwd !== password) {
            setConfirmPasswordError('Passwords do not match.')
        } else {
            setConfirmPasswordError('') // Clear error if passwords match
        }
    }

    // Check confirm password on every change
    useEffect(() => {
        validateConfirmPassword(confirmPassword)
        validatePassword(password)
    }, [confirmPassword, password]) 

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-green-600 max-w-md w-full">
            {/* Image logo */}
            <img
                src={farmcartLogo} // Replace with the path to your logo image
                alt="Logo"
                className="h-5 w-auto mb-2" // Adjust the height as needed
            />
                <div className="text-left mb-5">
                    <h2 className="text-3xl font-bold">Create Account</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">
                            Name
                        </label>
                        <input
                            type="text" // Changed from 'name' to 'text' for correct input type
                            id="name"
                            className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter your full name"
                        />
                    </div>
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
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Create a strong password" 
                        />
                        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>} {/* Display password error message */}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Re-enter your password" 
                        />
                        {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>} {/* Display confirm password error message */}
                    </div>
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="w-full px-4 py-2 bg-lime-500 text-black rounded-lg hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400"
                    >
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-3 text-white"
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
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Loading...
                            </div>
                        ) : (
                            'Register'
                        )}
                    </button>
                    <ToastContainer />
                </form>
                <div className="mt-4">
                    Already have an account?  
                    <Link
                        to="/login"
                        className="text-blue-600 hover:underline"
                    >
                        Login here.
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register
