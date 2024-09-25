import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../Components/farmer/shop_sidebar'
import axios from '../../axios'
import Swal from 'sweetalert2'

const UpdateProduct = () => {
    const shopId = localStorage.getItem('shopId')
    const productId = localStorage.getItem('productId')
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        pricePerKg: '',
        description: '',
    })
    const [productImage, setProductImage] = useState(null) // Image preview URL
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadMessage, setUploadMessage] = useState('')
    const [error, setError] = useState({
        name: '',
        pricePerKg: '',
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                const { data } = await axios.get(
                    `/shops/${shopId}/products/${productId}`,
                    config
                )
                setFormData({
                    name: data.name,
                    pricePerKg: data.pricePerKg,
                    description: data.description,
                })
                setProductImage(data.image)
            } catch (error) {
                console.error('Error fetching Product details:', error)
            }
        }

        fetchProduct()
    }, [shopId, productId]) // Depend on both shopId and productId

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        let error = ''

        // Restrict input directly in handleChange
        if (name === 'name') {
            if (!/^[A-Za-z\s]*$/.test(value)) {
                return // Prevent setting invalid value
            }
        }
        // Validates a double value with up to two decimal places
        if (name == 'pricePerKg') {
            if (!/^\d+(\.\d{1,2})?$/.test(value)) {
                error = 'Please enter a valid price.'
            }
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))

        setError((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }))
    }

    // Handle image selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(file)
            setProductImage(URL.createObjectURL(file))
        }
    }

    // Handle image upload
    const handleUpload = async () => {
        console.log('upload')
        if (!selectedFile) {
            setUploadMessage('No file selected')
            return null
        }
        const formData = new FormData()
        formData.append('image', selectedFile)
        formData.append('folder', 'products') // Specify folder if needed

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
        if (Object.values(error).some((error) => error)) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please fix the errors in the form before submitting.',
                customClass: {
                    confirmButton:
                        'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
                },
            })
            return
        }

        try {
            const token = localStorage.getItem('token')
            if (!token) {
                throw new Error('No token found')
            }
            // First, upload the image and get the URL
            const imageUrl = await handleUpload()

            // Include imageUrl in formData
            const productData = {
                ...formData,
                image: imageUrl, // Use `image` to match backend schema
            }

            await axios.put(
                `/shops/${shopId}/products/${productId}`,
                productData,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Product updated successfully',
                customClass: {
                    confirmButton:
                        'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600',
                },
            })
            navigate(`/shop/${shopId}/productpage`)
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    'Error updating product. Please try again.'
            )
            console.error('Error updating product:', err)
        }
    }

    // Handle cancel action
    const handleCancel = () => {
        navigate(`/shop/${shopId}/productpage`)
    }

    return (
        <div className="flex min-h-screen w-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-24 mt-16">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <div className="flex-1 ml-64 p-24 overflow-y-auto">
                {/* Update Product Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 pl-8 rounded-lg shadow-md w-2/3 mb-12"
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Update Product
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Form Fields */}
                        <div className="md:col-span-2">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 text-left">
                                        Product Name
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
                                        Price per Kg
                                    </label>
                                    <input
                                        type="number"
                                        name="pricePerKg"
                                        className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
                                        value={formData.pricePerKg}
                                        onChange={handleChange}
                                        required
                                    />
                                    {error.pricePerKg && (
                                        <p className="text-red-500 text-sm">
                                            {error.pricePerKg}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-left">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        maxLength={100}
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
                                {productImage ? (
                                    <img
                                        className="w-full h-full object-cover"
                                        src={productImage}
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

                    {/* Buttons */}
                    <div className="flex gap-x-5 mt-2">
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-30"
                        >
                            Update Product
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-36"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProduct
