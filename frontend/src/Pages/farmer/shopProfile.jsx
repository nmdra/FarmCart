import { useEffect, useState } from 'react'
import axios from '../../axios'
import Sidebar from '../../Components/farmer/shop_sidebar'
import placeholderImage from '../../assets/shop.png'
import { useNavigate } from 'react-router-dom'
import { useDistricts } from '../../Hooks/district_City'
import Swal from 'sweetalert2'

// Function to decrypt text (if needed)

const ShopProfile = () => {
    const id = localStorage.getItem('shopId')
    const [formData, setFormData] = useState({
        name: '',
        district: '',
        address: {
            houseNo: '',
            streetName: '',
            city: '',
        },
        category: '',
        email: '',
        contactNumber: '',
        description: '',
        account_name: '',
        account_number: '',
        bank: '',
        branch: '',
    })
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        contactNumber: '',
        category: '',
    })
    const [shopImage, setshopImage] = useState(placeholderImage)
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadMessage, setUploadMessage] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const { districts, cities, handleDistrictChange, handleCityChange } =
        useDistricts()

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                const { data } = await axios.get(`/shops/${id}`, config)
                setFormData({
                    name: data.name,
                    district: data.district,
                    address: {
                        houseNo: data.address.houseNo,
                        streetName: data.address.streetName,
                        city: data.address.city,
                    },
                    category: data.category,
                    email: data.email,
                    contactNumber: data.contactNumber,
                    description: data.description,
                    account_name: data.account_name,
                    account_number: data.account_number,
                    bank: data.bank,
                    branch: data.branch,
                })
                setshopImage(data.image)

                if (data.district) {
                    handleDistrictChange({ target: { value: data.district } })
                }
            } catch (error) {
                console.error('Error fetching shop details:', error)
            }
        }

        fetchShop()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        let error = ''

        // Restrict input directly in handleChange
        if (name === 'name') {
            if (!/^[A-Za-z\s]*$/.test(value)) {
                return // Prevent setting invalid value
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
            setFormData((prevData) => ({
                ...prevData,
                address: { ...prevData.address, [addressField]: value },
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

    const DistrictChange = (e) => {
        handleDistrictChange(e)
        setFormData((prevData) => ({
            ...prevData,
            district: e.target.value,
            address: { ...prevData.address, city: '' },
        }))
    }

    const CityChange = (e) => {
        handleCityChange(e)
        setFormData((prevData) => ({
            ...prevData,
            address: { ...prevData.address, city: e.target.value },
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(file)
            setshopImage(URL.createObjectURL(file))
        }
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadMessage('No file selected')
            return null
        }
        const formData = new FormData()
        formData.append('image', selectedFile)
        formData.append('folder', 'shops')

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

        setLoading(true)

        try {
            const token = localStorage.getItem('token')
            if (!token) throw new Error('No token found')

            const imageUrl = await handleUpload()

            const shopData = {
                ...formData,
                image: imageUrl,
            }

            await axios.put(`/shops/${id}`, shopData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Shop details updated successfully',
                customClass: {
                    confirmButton:
                        'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600',
                },
            })
            navigate(`/shop/${id}`)
        } catch (error) {
            console.error('Error updating shop details:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteShop = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete the Shop? This process cannot be undone.',
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
            setLoading(true)
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                await axios.delete(`/shops/${id}`, config)
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Shop deleted successfully',
                    customClass: {
                        confirmButton:
                            'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600',
                    },
                })
                navigate('/myshops')
            } catch (error) {
                console.error('Error deleting shop:', error)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while deleting the shop. Please try again.',
                    customClass: {
                        confirmButton:
                            'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
                    },
                })
            } finally {
                setLoading(false)
            }
        }
    }
    // Handle cancel action
    const handleCancel = () => {
        navigate(`/shop/${id}`)
    }
    return (
        <div className="flex min-h-screen  bg-gray-50">
            <aside className="fixed top-0 pt-16 mt-16 pl-8 left-0 bottom-0 w-64 bg-gray-50 shadow-md">
                <Sidebar />
            </aside>

            <div className="flex-1 top-0 ml-64 p-24 pt-16 overflow-y-auto">
                {/* Shop Details Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 pl-8 rounded-lg shadow-md w-full mb-12"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Shop Details
                    </h3>
                    <div className="grid  md:grid-cols-2 gap-6">
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
                                />
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
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email}
                                </p>
                            )}
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
                                />
                                {errors.contactNumber && (
                                    <p className="text-red-500 text-sm">
                                        {errors.contactNumber}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-700 text-left">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
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
                    <div className="flex space-x-4 mt-6">
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-red-500 text-white py-2 px-8 rounded hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                {/* Shop Address Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 pl-8 rounded-lg shadow-md w-full mb-12"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Shop Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 text-left">
                                District
                            </label>
                            <select
                                name="district"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={formData.district}
                                onChange={(e) => {
                                    DistrictChange(e)
                                    handleChange(e)
                                }}
                            >
                                <option value="" disabled hidden>
                                    Select District
                                </option>
                                {districts.map((district, index) => (
                                    <option key={index} value={district.name}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-gray-700 text-left">
                                Country
                            </label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value="Sri Lanka"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div className="flex flex-col">
                            <label className="block text-gray-700 text-left">
                                House No
                            </label>
                            <input
                                type="text"
                                name="address.houseNo"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={formData.address.houseNo}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-gray-700 text-left">
                                Street Address
                            </label>
                            <input
                                type="text"
                                name="address.streetName"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={formData.address.streetName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-left">
                                City
                            </label>
                            <select
                                name="city"
                                className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                value={formData.address.city}
                                onChange={(e) => {
                                    handleChange(e)
                                    CityChange(e)
                                }}
                            >
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex space-x-4 mt-6">
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-red-500 text-white py-2 px-8 rounded hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
                {/*Bank Details Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 pl-8 rounded-lg shadow-md w-full mb-12"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Bank Details
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 text-left">
                                    Account Name
                                </label>
                                <input
                                    type="text"
                                    name="account_name"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                    value={formData.account_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-left">
                                    Account Number
                                </label>
                                <input
                                    type="text"
                                    name="account_number"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                    value={formData.account_number}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 text-left">
                                    Bank
                                </label>
                                <input
                                    type="text"
                                    name="bank"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                    value={formData.bank}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-left">
                                    Branch
                                </label>
                                <input
                                    type="text"
                                    name="branch"
                                    className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                    value={formData.branch}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-4 mt-6">
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-red-500 text-white py-2 px-8 rounded hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                {/* Delete Shop Card */}
                <div className="bg-white p-8 pl-8 rounded-lg shadow-md w-full">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Delete Shop
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Deleting your shop is a permanent action and cannot be
                        undone. Please be sure before proceeding.
                    </p>
                    <button
                        onClick={handleDeleteShop}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                        Delete Shop
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShopProfile
