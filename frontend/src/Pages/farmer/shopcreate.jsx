import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../Components/farmer/Farmer_sidebar'
import shop from '../../assets/shop.png'
import axios from '../../axios'
import { useDistricts } from '../../Hooks/district_City'
import Swal from 'sweetalert2'

const CreateShopPage = () => {
    const navigate = useNavigate()
    const { districts, cities, handleDistrictChange, handleCityChange } =
        useDistricts()

    const [formData, setFormData] = useState({
        name: '',
        district: '',
        address: {
            houseNo: '',
            streetName: '',
            city: '',
        },
        category: '', // No default value, empty string
        email: '',
        contactNumber: '',
        description: '',
        account_name: '',
        account_number: '',
        bank: '',
        branch: '',
    })
    const [shopImage, setshopImage] = useState(null) // Image preview URL
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadMessage, setUploadMessage] = useState('')
    const [error, setError] = useState(null)
    const [validationErrors, setValidationErrors] = useState({
        email: '',
        contactNumber: '',
    })
    const [loading, setLoading] = useState(false)

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        let errorMessage = ''

        // Restrict input directly in handleChange
        if (name === 'name') {
            if (!/^[A-Za-z\s]*$/.test(value)) {
                return // Prevent setting invalid value
            }
        }

        if (name === 'email') {
            if (!/^.*@gmail\.com$/.test(value)) {
                errorMessage = 'Email must be a valid @gmail.com address.'
            }
        }

        if (name === 'contactNumber') {
            if (!/^0\d{9}$/.test(value)) {
                errorMessage =
                    'Contact number must be 10 digits and start with 0.'
            }
        }

        if (name === 'account_name') {
            if (!/^[A-Za-z\s]*$/.test(value)) {
                return // Prevent setting invalid value
            }
        }

        if (name === 'account_number') {
            if (!/^\d*$/.test(value)) {
                return // Prevent setting invalid value
            }
        }

        if (name === 'bank') {
            if (!/^[A-Za-z\s]*$/.test(value)) {
                return // Prevent setting invalid value
            }
        }

        if (name === 'branch') {
            if (!/^[A-Za-z\s]*$/.test(value)) {
                return // Prevent setting invalid value
            }
        }

        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1]
            setFormData({
                ...formData,
                address: { ...formData.address, [addressField]: value },
            })
        } else {
            setFormData({ ...formData, [name]: value })
        }

        setValidationErrors({
            ...validationErrors,
            [name]: errorMessage,
        })
    }
    const handleDistrictChangeWrapper = (e) => {
        handleDistrictChange(e)
        setFormData({
            ...formData,
            district: e.target.value,
            address: { ...formData.address, city: '' },
        })
    }

    const handleCityChangeWrapper = (e) => {
        handleCityChange(e)
        setFormData({
            ...formData,
            address: { ...formData.address, city: e.target.value },
        })
    }
    // Handle image selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(file)
            setshopImage(URL.createObjectURL(file))
        }
    }

    // Handle image upload
    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadMessage('No file selected')
            return null
        }

        const formData = new FormData()
        formData.append('image', selectedFile)
        formData.append('folder', 'shops') // Specify folder if needed

        setLoading(true)

        try {
            const response = await axios.post('/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            setUploadMessage('Image uploaded successfully')
            return response.data.url // Return the image URL
        } catch (error) {
            setUploadMessage('Image upload failed')
            console.error(error)
            return null
        } finally {
            setLoading(false)
        }
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            validationErrors.name ||
            validationErrors.email ||
            validationErrors.contactNumber ||
            validationErrors.account_name ||
            validationErrors.account_number ||
            validationErrors.bank ||
            validationErrors.branch
        ) {
            setError('Please fix the validation errors before submitting.')
            return
        }

        try {
            const token = localStorage.getItem('token')
            if (!token) {
                throw new Error('No token found')
            }
            // First, upload the image and get the URL
            const imageUrl = await handleUpload()
            if (!imageUrl) {
                Swal.fire({
                    icon: 'error',
                    title: 'Upload Error',
                    text: 'Image upload failed, please try again.',
                    customClass: {
                        confirmButton:
                            'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
                    },
                })
                return
            }

            // Include imageUrl in formData
            const shopData = {
                ...formData,
                image: imageUrl, // Use `image` to match backend schema
            }

            await axios.post('/shops', shopData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Shop created successfully',
                customClass: {
                    confirmButton:
                        'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600',
                },
            })
            navigate('/myshops')
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    'Error creating shop. Please try again.'
            )
            console.error('Error creating shop:', err)
        }
    }

    // Handle cancel action
    const handleCancel = () => {
        navigate('/myshops') // Redirect to the shops list or any other desired route
    }

    return (
        <div className="flex  min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 pt-16 mt-16 pl-8 left-0 bottom-0 w-64 bg-gray-50 shadow-md">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <div className="flex-1 top-0 ml-64 p-32 pt-24 overflow-y-auto">
                {/* Create Shop Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 pl-8 rounded-lg shadow-md w-full mb-12"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Create Shop
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                        {/* Form Fields */}
                        <div className="md:col-span-2">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 text-left">
                                        Shop Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-left">
                                        District
                                    </label>
                                    <select
                                        name="district"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                        value={formData.district}
                                        onChange={handleDistrictChangeWrapper}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a district
                                        </option>
                                        {districts.map((district, index) => (
                                            <option
                                                key={index}
                                                value={district.name}
                                            >
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label className="block text-gray-700 text-left">
                                            House No
                                        </label>
                                        <input
                                            type="text"
                                            name="address.houseNo"
                                            className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                            value={formData.address.houseNo}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-gray-700 text-left">
                                            Street Name
                                        </label>
                                        <input
                                            type="text"
                                            name="address.streetName"
                                            className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                            value={formData.address.streetName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-left">
                                            City
                                        </label>
                                        <select
                                            name="address.city"
                                            className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                            value={formData.address.city}
                                            onChange={handleCityChangeWrapper}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select a city
                                            </option>
                                            {cities.map((city, index) => (
                                                <option
                                                    key={index}
                                                    value={city}
                                                >
                                                    {city}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-left">
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled hidden>
                                            Select Category
                                        </option>
                                        <option value="Vegetables">
                                            Vegetables
                                        </option>
                                        <option value="Fruits">Fruits</option>
                                        <option value="Spices">Spices</option>
                                    </select>
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
                                        required
                                    />
                                    {validationErrors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {validationErrors.email}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-left">
                                        Contact Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                    {validationErrors.contactNumber && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {validationErrors.contactNumber}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-left">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        maxLength={1000}
                                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="flex flex-col items-center mt-12">
                            <div className="w-40 h-40 border border-dashed border-gray-400 rounded-md overflow-hidden">
                                {shopImage ? (
                                    <img
                                        className="w-full h-full object-cover"
                                        src={shopImage}
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
                    {/* Bank details */}
                    <h3 className="text-lg font-semibold text-gray-800 pt-8 mb-4 text-left">
                        Bank Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="block text-gray-700 text-left">
                                Account Name
                            </label>
                            <input
                                type="text"
                                name="account_name"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={formData.account_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-gray-700 text-left">
                                Account Number
                            </label>
                            <input
                                type="text"
                                name="account_number"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={formData.account_number}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-gray-700 text-left">
                                Bank
                            </label>
                            <input
                                type="text"
                                name="bank"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={formData.bank}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-gray-700 text-left">
                                Branch
                            </label>
                            <input
                                type="text"
                                name="branch"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={formData.branch}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-x-5 pt-12 mt-2">
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-30 "
                        >
                            Create Shop
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-36"
                        >
                            Cancel
                        </button>
                    </div>

                    {/* Display general form error */}
                    {error && (
                        <p className="text-red-500 text-sm mt-4">{error}</p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default CreateShopPage
