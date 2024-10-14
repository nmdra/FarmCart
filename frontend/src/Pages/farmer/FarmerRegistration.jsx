import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from '../../axios'
import Swal from 'sweetalert2'
import logo from '../../assets/logo.png'

const Register = () => {
    // State variables for form inputs and errors
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        BirthDay: '',
        NIC: '',
        Address: {
            houseNo: '',
            streetName: '',
            city: '',
        },
        contactNumber: '',
        password: '',
        confirmPassword: '',
    })

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

    // Handler for input changes with validation
    const handleInputChange = (e) => {
        const { name, value } = e.target
        let errorMessage = ''

        if (name === 'name') {
            if (!/^[A-Za-z\s]*$/.test(value)) {
                return
            }
        }

        if (name === 'email') {
            if (!/^.*@gmail\.com$/.test(value)) {
                errorMessage = 'Email must be a valid @gmail.com address.'
            }
        }

        if (name === 'contactNumber') {
            if (!/^\d*$/.test(value)) {
                return // Prevent setting invalid value
            }
            if (value.length > 10) {
                return // Prevent setting values longer than 10 digits
            }
            if (!/^0\d{9}$/.test(value)) {
                errorMessage =
                    'Contact number must be 10 digits and start with 0.'
            }
        }

        // Validate BirthDay
        if (name === 'BirthDay') {
            const age = calculateAge(value)
            if (age < 18) {
                errorMessage = 'You must be at least 18 years old to register.'
            }
            // Ensure NIC year matches BirthDay year
            const birthYear = new Date(value).getFullYear()
            if (
                formData.NIC &&
                !formData.NIC.startsWith(birthYear.toString())
            ) {
                errorMessage = 'Please Enter valid NIC'
            }
        }

        // Validate NIC
        if (name === 'NIC') {
            const nicRegex = /^\d{11}[0-9Vv]$/
            const birthYear = new Date(formData.BirthDay)
                .getFullYear()
                .toString()

            if (!nicRegex.test(value)) {
                errorMessage = 'Please Enter valid NIC'
            } else if (!value.startsWith(birthYear)) {
                errorMessage = 'Please Enter valid NIC'
            }
        }
        if (name === 'password') {
            const passwordRegex =
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            if (!passwordRegex.test(value)) {
                errorMessage =
                    'Password must be at least 8 characters long and include at least one special character and one number.'
            }
        }
        if (name === 'confirmPassword') {
            if (value !== formData.password) {
                errorMessage = 'Passwords do not match.'
            }
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }))
    }

    // Handler for address input changes
    const handleAddressChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            Address: { ...prevData.Address, [name]: value },
        }))
    }

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Check for form validation errors
        if (
            Object.values(errors).some((error) => error) ||
            formData.password !== formData.confirmPassword
        ) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword:
                    formData.password !== formData.confirmPassword
                        ? 'Passwords do not match'
                        : '',
            }))
            return
        }

        try {
            const response = await axios.post('farmers/register', {
                name: formData.name,
                BirthDay: formData.BirthDay,
                NIC: formData.NIC,
                Address: formData.Address,
                email: formData.email,
                contactNumber: formData.contactNumber,
                password: formData.password,
            })

            localStorage.setItem('token', response.data.token)
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'You Registered successfully',
                customClass: {
                    confirmButton:
                        'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600',
                },
            })
            navigate('/farmerlogin')
        } catch (err) {
            console.error('Error:', err)
            setErrors((prevErrors) => ({
                ...prevErrors,
                submit: err.response?.data?.message || 'Something went wrong',
            }))
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center  px-[8rem] pb-[8rem] pt-8">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className=" p-10 bg-white rounded-lg border w-[600px] ">
                <div className="mb-8 text-center">
                    <img src={logo} alt="Logo" className="w-48 mx-auto" />
                    <h1 className="mt-4 text-4xl font-semibold text-gray-800">
                        Register
                    </h1>
                </div>
                {errors.submit && (
                    <p className="mb-4 text-red-500">{errors.submit}</p>
                )}
                <form onSubmit={handleSubmit}>
                    {/* Name input */}
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-left text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name" // Add name attribute
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className={
                                'w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black'
                            }
                            placeholder="Enter your name"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center w-full gap-x-4">
                        {/* Email input */}
                        <div className="w-full mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-left text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email" // Add name attribute
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className={
                                    'w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black'
                                }
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Contact Number input */}
                        <div className="w-full mb-4">
                            <label
                                htmlFor="contactNumber"
                                className="block text-sm font-medium text-left text-gray-700"
                            >
                                Contact Number
                            </label>
                            <input
                                type="text"
                                id="contactNumber"
                                name="contactNumber" // Add name attribute
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                required
                                className={
                                    'w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black'
                                }
                                placeholder="Enter your contact number"
                            />
                            {errors.contactNumber && (
                                <p className="text-sm text-red-500">
                                    {errors.contactNumber}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center w-full gap-x-4">
                        {/* BirthDay input */}
                        <div className="w-full mb-4">
                            <label
                                htmlFor="birthDay"
                                className="block text-sm font-medium text-left text-gray-700"
                            >
                                Birth Day
                            </label>
                            <input
                                type="date"
                                id="BirthDay"
                                name="BirthDay" // Add name attribute
                                value={formData.BirthDay}
                                onChange={handleInputChange}
                                required
                                max={new Date().toISOString().split('T')[0]} // Ensures only past dates can be selected
                                min="1930-01-01" // Ensures the earliest selectable date is 1930-01-01
                                className={
                                    'w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black'
                                }
                            />
                            {errors.BirthDay && (
                                <p className="text-sm text-red-500">
                                    {errors.BirthDay}
                                </p>
                            )}
                        </div>
                        {/* NIC input */}
                        <div className="w-full mb-4">
                            <label
                                htmlFor="NIC"
                                className="block text-sm font-medium text-left text-gray-700"
                            >
                                NIC
                            </label>
                            <input
                                type="text"
                                id="NIC"
                                name="NIC" // Add name attribute
                                value={formData.NIC}
                                onChange={handleInputChange}
                                required
                                className={
                                    'w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black'
                                }
                                placeholder="Enter your NIC"
                            />
                            {errors.NIC && (
                                <p className="text-sm text-red-500">
                                    {errors.NIC}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Address inputs */}
                    <label>Address</label>
                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex-1">
                            <label
                                htmlFor="houseNo"
                                className="block text-sm font-medium text-left text-gray-700"
                            >
                                House No
                            </label>
                            <input
                                type="text"
                                id="houseNo"
                                name="houseNo" // Add name attribute
                                value={formData.Address.houseNo}
                                onChange={handleAddressChange}
                                required
                                className={
                                    'w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black'
                                }
                                placeholder="Enter your house number"
                            />
                        </div>

                        <div className="flex-1">
                            <label
                                htmlFor="streetName"
                                className="block text-sm font-medium text-left text-gray-700"
                            >
                                Street Name
                            </label>
                            <input
                                type="text"
                                id="streetName"
                                name="streetName" // Add name attribute
                                value={formData.Address.streetName}
                                onChange={handleAddressChange}
                                required
                                className={
                                    'w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black'
                                }
                                placeholder="Enter your street name"
                            />
                        </div>

                        <div className="flex-1">
                            <label
                                htmlFor="city"
                                className="block text-sm font-medium text-left text-gray-700"
                            >
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city" // Add name attribute
                                value={formData.Address.city}
                                onChange={handleAddressChange}
                                required
                                className={
                                    'w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black'
                                }
                                placeholder="Enter your city"
                            />
                        </div>
                    </div>

                    <div className="flex items-center w-full gap-x-4 ">
                        {/* Password input */}
                        <div className="w-full mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-left text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password" // Add name attribute
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className={
                                    'w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black'
                                }
                                placeholder="Enter your password"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password input */}
                        <div className="w-full mb-4">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-left text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                                className={
                                    'w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black'
                                }
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link
                        to="/farmerlogin"
                        className="text-green-500 hover:underline"
                    >
                        Already have an account? Log in
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register
