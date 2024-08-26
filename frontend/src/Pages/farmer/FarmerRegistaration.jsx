import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from '../../../axios'
import FarmCartLogo from '../../assets/logo.png'

const Register = () => {
    // State variables for form inputs and errors
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [BirthDay, setBirthDay] = useState('')
    const [NIC, setNIC] = useState('')
    const [Address, setAddress] = useState({
        houseNo: '',
        streetName: '',
        city: '',
    })
    const [contactNumber, setContactNumber] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    // Function to calculate age from birth date
    const calculateAge = (birthDate) => {
        const today = new Date()
        const birthDateObj = new Date(birthDate)
        let age = today.getFullYear() - birthDateObj.getFullYear()
        const monthDifference = today.getMonth() - birthDateObj.getMonth()
        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
        ) {
            age--
        }
        return age
    }

    // Validation function for name
    const validateName = (name) => {
        if (!/^[A-Za-z\s]+$/.test(name)) {
            return 'Name can only contain letters and spaces'
        }
        return ''
    }

    // Validation function for email
    const validateEmail = (email) => {
        if (!/^[\w-\.]+@gmail\.com$/.test(email)) {
            return 'Email must be a valid @gmail.com address'
        }
        return ''
    }

    // Validation function for password
    const validatePassword = (password) => {
        const passwordRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!passwordRegex.test(password)) {
            return 'Password must be at least 8 characters long and include at least one special character and one number.'
        }
        return ''
    }

    // Validation function for contact number
    const validateContactNumber = (contactNumber) => {
        const contactNumberRegex = /^0\d{9}$/
        if (!contactNumberRegex.test(contactNumber)) {
            return 'Contact number must be a 10-digit number starting with 0'
        }
        return ''
    }

    // Validation function for NIC
    const validateNIC = (NIC, BirthDay) => {
        // Regex to check if NIC is exactly 12 digits long and the last character is a digit or 'X' or 'V'
        const nicRegex = /^\d{11}[0-9XV]$/
        const birthYear = BirthDay.substring(0, 4)

        // Check if NIC is exactly 12 characters long and matches the birth year
        if (!nicRegex.test(NIC) || NIC.substring(0, 4) !== birthYear) {
            return 'Please enter a valid NIC '
        }

        return ''
    }

    // Validation function for age
    const validateAge = (birthDate) => {
        const age = calculateAge(birthDate)
        if (age < 18) {
            return 'You must be at least 18 years old to register'
        }
        return ''
    }

    // Handler for input changes with validation
    const handleInputChange = (e, validationFunc, field) => {
        const { value } = e.target
        let errorMessage = ''

        if (field === 'confirmPassword') {
            errorMessage =
                confirmPassword !== password ? 'Passwords do not match' : ''
        } else {
            errorMessage = validationFunc(value)
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: errorMessage,
        }))

        if (field === 'name') setName(value)
        if (field === 'email') setEmail(value)
        if (field === 'password') setPassword(value)
        if (field === 'confirmPassword') setConfirmPassword(value)
        if (field === 'contactNumber') setContactNumber(value)
        if (field === 'NIC') setNIC(value)
    }

    // Handler for date input change
    const handleDateChange = (e) => {
        const { value } = e.target
        setBirthDay(value)
        const ageErrorMessage = validateAge(value)
        const nicErrorMessage = validateNIC(NIC, value)
        setErrors((prevErrors) => ({
            ...prevErrors,
            age: ageErrorMessage,
            NIC: nicErrorMessage,
        }))
    }

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Check for existing errors before submitting
        if (
            Object.values(errors).some((error) => error) ||
            password !== confirmPassword
        ) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword:
                    password !== confirmPassword
                        ? 'Passwords do not match'
                        : '',
            }))
            return
        }

        try {
            // Send registration data to the server
            const response = await axios.post('farmers/register', {
                name,
                BirthDay,
                NIC,
                Address,
                email,
                contactNumber,
                password,
            })

            // Store token and redirect to home page
            localStorage.setItem('token', response.data.token)
            navigate('/')
        } catch (err) {
            console.error('Error:', err)
            if (err.response) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    submit: err.response.data.message || 'Something went wrong',
                }))
            } else if (err.request) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    submit: 'Network error, please try again',
                }))
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    submit: 'An unexpected error occurred',
                }))
            }
        }
    }

    return (
        <div className="flex min-h-screen w-screen items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <div className="text-center mb-8">
                    <img
                        src={FarmCartLogo}
                        alt="Logo"
                        className="h-5 w-auto mb-"
                    />
                    <h1 className="text-2xl font-semibold text-gray-800 mt-4">
                        Register
                    </h1>
                </div>
                {errors.submit && (
                    <p className="text-red-500 mb-4">{errors.submit}</p>
                )}
                <form onSubmit={handleSubmit}>
                    {/* Name input */}
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 text-left"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) =>
                                handleInputChange(e, validateName, 'name')
                            }
                            required
                            className={`mt-1 block w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'} bg-white text-black focus:ring-green-500 focus:border-green-500`}
                            placeholder="Enter your name"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Email input */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 text-left"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) =>
                                handleInputChange(e, validateEmail, 'email')
                            }
                            required
                            className={`mt-1 block w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-white text-black focus:ring-green-500 focus:border-green-500`}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* BirthDay input */}
                    <div className="mb-4">
                        <label
                            htmlFor="birthDay"
                            className="block text-sm font-medium text-gray-700 text-left"
                        >
                            Birth Day
                        </label>
                        <input
                            type="date"
                            id="birthDay"
                            value={BirthDay}
                            onChange={handleDateChange}
                            required
                            max={new Date().toISOString().split('T')[0]} // Ensures only past dates can be selected
                            min="1930-01-01" // Ensures the earliest selectable date is 1930-01-01
                            className={`mt-1 block w-full p-2 border rounded-md ${errors.age ? 'border-red-500' : 'border-gray-300'} bg-white text-black focus:ring-green-500 focus:border-green-500`}
                        />
                        {errors.age && (
                            <p className="text-red-500 text-sm">{errors.age}</p>
                        )}
                    </div>

                    {/* NIC input */}
                    <div className="mb-4">
                        <label
                            htmlFor="NIC"
                            className="block text-sm font-medium text-gray-700 text-left"
                        >
                            NIC
                        </label>
                        <input
                            type="text"
                            id="NIC"
                            value={NIC}
                            onChange={(e) =>
                                handleInputChange(
                                    e,
                                    (value) => validateNIC(value, BirthDay),
                                    'NIC'
                                )
                            }
                            required
                            className={`mt-1 block w-full p-2 border rounded-md ${errors.NIC ? 'border-red-500' : 'border-gray-300'} bg-white text-black focus:ring-green-500 focus:border-green-500`}
                            placeholder="Enter your NIC"
                        />
                        {errors.NIC && (
                            <p className="text-red-500 text-sm">{errors.NIC}</p>
                        )}
                    </div>

                    {/* Address input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 text-left">
                            Address
                        </label>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                            <div>
                                <label
                                    htmlFor="houseNo"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    House No
                                </label>
                                <input
                                    type="text"
                                    id="houseNo"
                                    value={Address.houseNo}
                                    onChange={(e) =>
                                        setAddress((prev) => ({
                                            ...prev,
                                            houseNo: e.target.value,
                                        }))
                                    }
                                    required
                                    className="mt-1 block w-full p-2 border rounded-md border-gray-300 bg-white text-black focus:ring-green-500 focus:border-green-500"
                                    placeholder="House No"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="streetName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Street Name
                                </label>
                                <input
                                    type="text"
                                    id="streetName"
                                    value={Address.streetName}
                                    onChange={(e) =>
                                        setAddress((prev) => ({
                                            ...prev,
                                            streetName: e.target.value,
                                        }))
                                    }
                                    required
                                    className="mt-1 block w-full p-2 border rounded-md border-gray-300 bg-white text-black focus:ring-green-500 focus:border-green-500"
                                    placeholder="Street Name"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="city"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    value={Address.city}
                                    onChange={(e) =>
                                        setAddress((prev) => ({
                                            ...prev,
                                            city: e.target.value,
                                        }))
                                    }
                                    required
                                    className="mt-1 block w-full p-2 border rounded-md border-gray-300 bg-white text-black focus:ring-green-500 focus:border-green-500"
                                    placeholder="City"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Number input */}
                    <div className="mb-4">
                        <label
                            htmlFor="contactNumber"
                            className="block text-sm font-medium text-gray-700 text-left"
                        >
                            Contact Number
                        </label>
                        <input
                            type="text"
                            id="contactNumber"
                            value={contactNumber}
                            onChange={(e) =>
                                handleInputChange(
                                    e,
                                    validateContactNumber,
                                    'contactNumber'
                                )
                            }
                            required
                            className={`mt-1 block w-full p-2 border rounded-md ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'} bg-white text-black focus:ring-green-500 focus:border-green-500`}
                            placeholder="Enter your contact number"
                        />
                        {errors.contactNumber && (
                            <p className="text-red-500 text-sm">
                                {errors.contactNumber}
                            </p>
                        )}
                    </div>

                    {/* Password input */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 text-left"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) =>
                                handleInputChange(
                                    e,
                                    validatePassword,
                                    'password'
                                )
                            }
                            required
                            className={`mt-1 block w-full p-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'} bg-white text-black focus:ring-green-500 focus:border-green-500`}
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password input */}
                    <div className="mb-4">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700 text-left"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) =>
                                handleInputChange(e, null, 'confirmPassword')
                            }
                            required
                            className={`mt-1 block w-full p-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} bg-white text-black focus:ring-green-500 focus:border-green-500`}
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {/* Submit button */}
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
                        >
                            Register
                        </button>
                    </div>

                    {/* Redirect link */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-green-600 hover:underline"
                            >
                                Login here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
