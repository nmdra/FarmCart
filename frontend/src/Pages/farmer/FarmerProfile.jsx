import { useEffect, useState } from 'react'
import axios from '../../axios'
// import axios from 'axios'
import Sidebar from '../../Components/farmer/Farmer_sidebar'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNumber: '',
        NIC: '',
        BirthDay: '',
        Address: {
            houseNo: '',
            streetName: '',
            city: '',
        },
    })
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        contactNumber: '',
        BirthDay: '',
        NIC: '',
    })
    const [farmerImage, setfarmerImage] = useState()
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadMessage, setUploadMessage] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchFarmerDetails = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                const { data } = await axios.get('/farmers/profile', config)
                setFormData({
                    name: data.name,
                    email: data.email,
                    contactNumber: data.contactNumber,
                    NIC: data.NIC,
                    BirthDay: data.BirthDay,
                    Address: data.Address,
                })
                console.log(data.image)
                setfarmerImage(data.image)
            } catch (error) {
                console.error('Error fetching farmer details:', error)
            }
        }

        fetchFarmerDetails()
    }, [])

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

    const seperateYear = (birthDate) => {
        const birthDateObj = new Date(birthDate)
        let birthyear = birthDateObj.getFullYear()
        return birthyear
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        let error = ''
        let year = ''

        if (name === 'name') {
            if (!/^[A-Za-z\s]*$/.test(value)) {
                return
            }
        }

        if (name === 'email') {
            if (!/^.*@gmail\.com$/.test(value)) {
                error = 'Email must be a valid @gmail.com address.'
            }
        }

        if (name === 'contactNumber') {
            if (!/^0\d{9}$/.test(value)) {
                error = 'Contact number must be 10 digits and start with 0.'
            }
        }

        // Validate BirthDay
        if (name === 'BirthDay') {
            const age = calculateAge(value)
            year = seperateYear(value)
            if (age < 18) {
                error = 'You must be at least 18 years old to register.'
            }
            // Update NIC validation if necessary
            if (formData.NIC) {
                const nicYear = formData.NIC.slice(0, 4)
                if (year !== nicYear) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        NIC: 'please enter valid NIC.',
                    }))
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        NIC: '',
                    }))
                }
            }
        }

        if (name === 'NIC') {
            const nicRegex = /^\d{11}[0-9Vv]$/
            if (!nicRegex.test(value)) {
                error = 'Please enter a valid NIC.'
            }
        }

        if (name === 'password') {
            const passwordRegex =
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            if (!passwordRegex.test(value)) {
                error =
                    'Password must be at least 8 characters long and include at least one special character and one number.'
            }
        }
        if (name === 'confirmPassword') {
            if (value !== formData.password) {
                error = 'Passwords do not match.'
            }
        }
        // Handle changes for nested address fields
        if (name.startsWith('Address.')) {
            const addressField = name.split('.')[1]
            setFormData((prevData) => ({
                ...prevData,
                Address: { ...prevData.Address, [addressField]: value },
            }))
            return
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(file)
            setfarmerImage(URL.createObjectURL(file))
        }
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadMessage('No file selected')
            return null
        }
        const formData = new FormData()
        formData.append('image', selectedFile)
        formData.append('folder', 'farmers')

        setLoading(true)

        try {
            const response = await axios.post('/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            setUploadMessage('Image uploaded successfully')
            return response.data.url
        } catch (error) {
            setUploadMessage('Image upload failed')
            console.error(error)
            return null
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Check for any validation errors
        if (Object.values(errors).some((error) => error)) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fix the validation errors before submitting.',
                customClass: {
                    confirmButton:
                        'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
                },
            })
            return
        }

        try {
            const token = localStorage.getItem('token')
            const imageUrl = await handleUpload()

            // Create the farmer data with the new image URL
            const farmerData = {
                ...formData,
                image: imageUrl, // include the uploaded image URL
            }

            // Send the farmerData to the backend
            await axios.put('/farmers/profile', farmerData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Profile updated successfully',
                customClass: {
                    confirmButton:
                        'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600',
                },
            })
            navigate('/farmerdashboard')
        } catch (error) {
            console.error(
                'Error updating profile:',
                error.response?.data || error.message
            )
            alert(
                'An error occurred while updating the profile. Please try again.'
            )
        }
    }

    const handleDeleteAccount = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete the Account? This process cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'cancel!',
            customClass: {
                confirmButton:
                    'bg-red-500 text-white font-bold py-2 px-8 rounded hover:bg-red-600 mr-8',
                cancelButton:
                    'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 ',
            },
            buttonsStyling: false,
        })

        // Check if the user confirmed
        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                await axios.delete('/farmers/profile', config)
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Account deleted successfully',
                    customClass: {
                        confirmButton:
                            'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600',
                    },
                })
                navigate('/farmerlogin')
            } catch (error) {
                console.error(
                    'Error deleting account:',
                    error.response?.data?.message || error.message
                )
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while deleting the account. Please try again.',
                    customClass: {
                        confirmButton:
                            'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
                    },
                })
            }
        }
    }
    // Handle cancel action
    const handleCancel = () => {
        navigate('/farmerdashboard') // Redirect to the shops list or any other desired route
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Fixed Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <Sidebar />
            </aside>

            <div className="flex-1  ml-64 p-24 overflow-y-auto">
                {/* Account Settings Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 pl-8 rounded-lg shadow-md w-full mb-12"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Account Settings
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 text-left">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-left">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-left">
                                        Birthday
                                    </label>
                                    <input
                                        type="date"
                                        name="BirthDay"
                                        max={
                                            new Date()
                                                .toISOString()
                                                .split('T')[0]
                                        } // Ensures only past dates can be selected
                                        min="1930-01-01" // Ensures the earliest selectable date is 1930-01-01
                                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                        value={formData.BirthDay.substring(
                                            0,
                                            10
                                        )}
                                        onChange={handleChange}
                                    />
                                    {errors.BirthDay && (
                                        <p className="text-red-500 text-sm">
                                            {errors.BirthDay}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-left">
                                        NIC
                                    </label>
                                    <input
                                        type="text"
                                        name="NIC"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                        value={formData.NIC}
                                        onChange={handleChange}
                                    />
                                    {errors.NIC && (
                                        <p className="text-red-500 text-sm">
                                            {errors.NIC}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-left">
                                        Contact Number
                                    </label>
                                    <input
                                        type="text"
                                        name="contactNumber"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                    />
                                    {errors.contactNumber && (
                                        <p className="text-red-500 text-sm">
                                            {errors.contactNumber}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center mt-4">
                            {/* Image Upload */}
                            <div className="flex flex-col items-center mt-12">
                                <div className="w-40 h-40 border border-dashed border-gray-400 rounded-full overflow-hidden">
                                    {farmerImage ? (
                                        <img
                                            className="w-full h-full object-cover"
                                            src={farmerImage}
                                            alt="Product Preview"
                                        />
                                    ) : (
                                        <p className="text-gray-500 text-center mt-20">
                                            No image selected
                                        </p>
                                    )}
                                </div>
                                <label className="mt-4 bg-white text-green-500 hover:text-green-600 font-semibold py-2 px-4 border border-green-500 rounded cursor-pointer">
                                    Choose Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-x-5 pt-12 mt-2">
                        <button
                            type="submit"
                            className="flex justify-start mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex justify-start mt-6 bg-red-500 text-white py-2 px-8 rounded hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                {/* Address Settings Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 pl-8 rounded-lg shadow-md w-full mb-12"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Farmer Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-gray-700 text-left">
                                House No
                            </label>
                            <input
                                type="text"
                                name="Address.houseNo"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={formData.Address.houseNo}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-left">
                                Street Address
                            </label>
                            <input
                                type="text"
                                name="Address.streetName"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={formData.Address.streetName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-left">
                                City
                            </label>
                            <input
                                type="text"
                                name="Address.city"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={formData.Address.city}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div>
                            <label className="block text-gray-700 text-left">
                                Country
                            </label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={'Sri Lanka'}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="flex gap-x-5 pt-12 mt-2">
                        <button
                            type="submit"
                            className="flex justify-start mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex justify-start mt-6 bg-red-500 text-white py-2 px-8 rounded hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                {/* Delete Account Card */}
                <div className="bg-white p-6 pl-8 rounded-lg shadow-md w-full">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Delete Account
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Deleting your account is a permanent action and cannot
                        be undone. Please be sure before proceeding.
                    </p>
                    <button
                        onClick={handleDeleteAccount}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                        Delete My Account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
