import { useEffect, useState } from 'react'
import axios from '../../../axios'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../Components/farmer/shop_sidebar'
import vege from '../../assets/vege.png'
import addShopIcon from '../../assets/addshop.png'

const Products = () => {
    const [products, setProducts] = useState([])
    const shopId = localStorage.getItem('shopId')
    const navigate = useNavigate()

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
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const token = localStorage.getItem('token')
                const shopId = localStorage.getItem('shopId') // Ensure this is valid
                console.log('Deleting product:', productID)
                console.log('Shop ID:', shopId) // Log the shop ID
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
                alert('Product deleted successfully')

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
                alert('Error deleting product. Please try again.')
            }
        }
    }
    const handleAddNewProduct = () => {
        navigate('/addproduct')
    }

    return (
        <div className="flex min-h-screen w-screen bg-gray-100">
            <div className="p-6 pt-16 pl-8 rounded-lg shadow-md">
                <Sidebar />
            </div>

            <div className="flex-1 p-8 pt-16">
                <div className="grid grid-cols-5 gap-x-1 gap-y-8">
                    {/* Render products */}
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="relative bg-white rounded-lg shadow-md h-65 w-60 flex flex-col"
                        >
                            {/* Upper half - Product Image */}
                            <div className="h-1/2">
                                <img
                                    src={vege}
                                    alt="Product"
                                    className="object-cover h-full w-full"
                                />
                            </div>

                            {/* Lower half - Product details */}
                            <div className="h-1/2 p-2 bg-white">
                                <h2 className="text-lg font-semibold text-gray-800 text-left">
                                    {product.name}
                                </h2>
                                <h4 className="text-sm text-gray-600 text-left">
                                    {product.description}
                                </h4>
                                <h4 className="text-sm font-semibold text-gray-600 text-left">
                                    RS. {product.pricePerKg} - 1Kg
                                </h4>
                                <div className="flex justify-between mt-1">
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

                    {/* Add New Product */}
                    <div className="relative flex items-center justify-center bg-white rounded-lg shadow-md h-65 w-60">
                        <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
                            <img
                                src={addShopIcon}
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
                </div>
            </div>
        </div>
    )
}

export default Products
