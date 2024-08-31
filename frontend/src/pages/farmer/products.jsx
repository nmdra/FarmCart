import { useEffect, useState } from 'react'
import axios from '../../../axios'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../Components/farmer/shop_sidebar'
import addproduct from '../../assets/addpoduct.png'
import Swal from 'sweetalert2'

const Products = () => {
    const [products, setProducts] = useState([])
    const shopId = localStorage.getItem('shopId')
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('') // State for the search term

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                const { data } = await axios.get(
                    `/shops/${shopId}/products`,
                    config
                )
                setProducts(data)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        }

        fetchProducts()
    }, [shopId])

    const handleUpdateProduct = (productID) => {
        localStorage.setItem('productId', productID)
        navigate(`/UpdateProduct`)
    }

    const handleDeleteProduct = async (productID) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this product? This process cannot be undone.',
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
                if (!token) {
                    throw new Error('No token found')
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

                const response = await axios.delete(
                    `/shops/${shopId}/products/${productID}`,
                    config
                )
                console.log('Product deleted:', response.data)
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Product deleted successfully',
                    customClass: {
                        confirmButton:
                            'bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600',
                    },
                })

                // Refresh the product list after deletion
                const updatedProducts = products.filter(
                    (product) => product._id !== productID
                )
                setProducts(updatedProducts)
            } catch (error) {
                console.error(
                    'Error deleting product:',
                    error.response?.data?.message || error.message
                )
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error deleting product. Please try again.',
                    customClass: {
                        confirmButton:
                            'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
                    },
                })
            }
        }
    }

    const handleAddNewProduct = () => {
        navigate('/addproduct')
    }

    // Filter products based on search term
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="flex min-h-screen bg-gray-50 ">
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-32">
                <Sidebar />
            </aside>

            <div className="flex-1 ml-64 p-8 pt-24 overflow-y-auto">
                {/* Search Bar */}
                <div className="flex justify-end pe-16 mb-6">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-600 rounded-lg p-2 w-80 h-10 focus:outline-none focus:ring-2 focus:ring-green-500 text-center"
                    />
                </div>

                <div className="grid grid-cols-4 gap-x-8 gap-y-12">
                    {/* Add New Product */}
                    <div className="relative flex items-center justify-center bg-white rounded-lg shadow-md h-65 w-60">
                        <div className="absolute inset-0 flex flex-col justify-center items-center p-12">
                            <img
                                src={addproduct}
                                alt="Add Product"
                                className="w-32 h-32 mb-4"
                            />
                            <button
                                onClick={handleAddNewProduct}
                                className="bg-green-500 text-white hover:bg-green-600 font-semibold py-2 px-4 rounded text-center"
                            >
                                Add New Product
                            </button>
                        </div>
                    </div>
                    {/* Render products */}
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="relative bg-white rounded-lg shadow-md w-60 h-70 flex flex-col fixed"
                        >
                            {/* Upper half - Product Image */}
                            <div className="flex-shrink-0 w-full h-1/2 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt="Product"
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Lower half - Product details */}
                            <div className="flex-1 p-2 bg-white">
                                <h2 className="text-lg font-semibold text-gray-800 text-left">
                                    {product.name}
                                </h2>
                                <h4 className="text-sm text-gray-600 text-left">
                                    {product.description}
                                </h4>
                                <h4 className="text-sm font-semibold text-gray-600 text-left">
                                    RS. {product.pricePerKg} - 1Kg
                                </h4>
                                <div className="flex justify-between mt-2">
                                    <button
                                        onClick={() =>
                                            handleUpdateProduct(product._id)
                                        }
                                        className="bg-green-500 text-white hover:bg-green-600 font-semibold py-2 px-4 rounded text-center"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteProduct(product._id)
                                        }
                                        className="bg-red-500 text-white hover:bg-red-600 font-semibold py-2 px-4 rounded text-center"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Products
