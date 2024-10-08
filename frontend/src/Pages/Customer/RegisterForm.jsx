import { useState, useEffect } from 'react'
import { useRegister } from '../../Hooks/CustomerHooks/useRegister'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import farmcartLogo from '../../assets/logo.png'
import { FaInfoCircle } from 'react-icons/fa'

const Register = () => {
    const [email, setEmail] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const { register, error, isLoading } = useRegister()

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }
        await register(firstname, lastname, email, password)
    }

    useEffect(() => {
        document.title = 'FarmCart : Register'
    }, [])

    useEffect(() => {
        if (error) {
            toast.error(error)
            setEmail('')
            setFirstName('')
            setLastName('')
            setPassword('')
            setConfirmPassword('')
        }
    }, [error])

    const validateFirstName = (name) => {
        const namePattern = /^[a-zA-Z\s]+$/
        if (!namePattern.test(name)) {
            setFirstNameError('First Name can only contain letters and spaces.')
            return false
        }
        if (name.length < 2) {
            setFirstNameError('First Name must be at least 2 characters long.')
            return false
        }
        setFirstNameError('')
        return true
    }

    const validateLastName = (name) => {
        const namePattern = /^[a-zA-Z\s]+$/
        if (!namePattern.test(name)) {
            setLastNameError('Last Name can only contain letters and spaces.')
            return false
        }
        if (name.length < 2) {
            setLastNameError('Last Name must be at least 2 characters long.')
            return false
        }
        setLastNameError('')
        return true
    }

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailPattern.test(email)) {
            setEmailError('Invalid email format.')
            return false
        }
        setEmailError('')
        return true
    }

    const validatePassword = (pwd) => {
        const hasUpperCase = /[A-Z]/.test(pwd)
        const hasLowerCase = /[a-z]/.test(pwd)
        const hasNumbers = /\d/.test(pwd)
        const hasSpecialChars = /[!@#$%^&*]/.test(pwd)
        const isLongEnough = pwd.length >= 8

        if (!isLongEnough) {
            setPasswordError('Password must be at least 8 characters long.')
            return false
        } else if (!hasUpperCase) {
            setPasswordError(
                'Password must contain at least one uppercase letter.'
            )
            return false
        } else if (!hasLowerCase) {
            setPasswordError(
                'Password must contain at least one lowercase letter.'
            )
            return false
        } else if (!hasNumbers) {
            setPasswordError('Password must contain at least one number.')
            return false
        } else if (!hasSpecialChars) {
            setPasswordError(
                'Password must contain at least one special character.'
            )
            return false
        }
        setPasswordError('')
        return true
    }

    const validateConfirmPassword = (confirmPwd) => {
        if (confirmPwd !== password) {
            setConfirmPasswordError('Passwords do not match.')
            return false
        }
        setConfirmPasswordError('')
        return true
    }

    useEffect(() => {
        if (firstname) validateFirstName(firstname)
        if (email) validateEmail(email)
        if (password) validatePassword(password)
        if (lastname) validateLastName(lastname)
        if (confirmPassword) validateConfirmPassword(confirmPassword)
    }, [firstname, lastname, email, password, confirmPassword])

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-green-600 max-w-md w-full">
                <img
                    src={farmcartLogo}
                    alt="Logo"
                    className="h-5 w-auto mb-2"
                />
                <div className="text-left mb-5">
                    <h2 className="text-3xl font-bold">Create Account</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-1 flex space-x-4">
                        <div className="w-1/2">
                            <label
                                htmlFor="firstname"
                                className="block text-gray-700"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                                value={firstname}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div className="w-1/2">
                            <label
                                htmlFor="lastname"
                                className="block text-gray-700"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                className="mt-1 block w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                                value={lastname}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                placeholder="Enter your last name"
                            />
                        </div>
                    </div>
                    {firstNameError && (
                        <p className="text-red-500 text-sm flex items-center">
                            {' '}
                            <FaInfoCircle className="mr-1" /> {firstNameError}
                        </p>
                    )}
                    {lastNameError && (
                        <p className="text-red-500 text-sm flex items-center">
                            {' '}
                            <FaInfoCircle className="mr-1" /> {lastNameError}
                        </p>
                    )}

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
                            placeholder="Enter your email"
                        />
                        {emailError && (
                            <p className="text-red-500 text-sm flex items-center">
                                <FaInfoCircle className="mr-1" /> {emailError}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
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
                            placeholder="Create a strong password"
                        />
                        {passwordError && (
                            <p className="text-red-500 text-sm flex items-center">
                                <FaInfoCircle className="mr-1" />{' '}
                                {passwordError}
                            </p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-gray-700"
                        >
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
                        {confirmPasswordError && (
                            <p className="text-red-500 text-sm flex items-center">
                                <FaInfoCircle className="mr-1" />{' '}
                                {confirmPasswordError}
                            </p>
                        )}
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
                </form>
                <p className="text-sm mt-2 text-gray-600">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="font-medium text-lime-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register
