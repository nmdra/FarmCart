import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const ShopPage = () => {
    const { id } = useParams() // shop ID from URL
    const [shop, setShop] = useState({})
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        // Fetch shop details and products
        const fetchShopDetails = async () => {
            try {
                const response = await axios.get(`/api/userShops/${id}`)
                setShop(response.data)
            } catch (error) {
                console.error('Failed to fetch shop details', error)
            }
        }

        fetchShopDetails()
    }, [id])

    // Search handler
    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    // Filter products based on search term
    const filteredProducts = shop.products?.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 grid grid-cols-1 justify-center px-32 py-12">
            <div className="shop-page p-8">
                <div className="shop-details mb-10 bg-white shadow-xl rounded-xl overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out">
                    <img
                        src={shop.image}
                        alt={shop.name}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-8">
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                            {shop.name}
                        </h1>
                        <p className="text-gray-700 text-lg mb-6">
                            {shop.description}
                        </p>
                        <div className="text-gray-600 text-md space-y-3">
                            <p>
                                <span className="font-semibold">Address:</span>{' '}
                                {shop.address?.houseNo}{' '}
                                {shop.address?.streetName}, {shop.address?.city}
                                , {shop.district}
                            </p>
                            <p>
                                <span className="font-semibold">Contact:</span>{' '}
                                {shop.contactNumber}
                            </p>
                            <p>
                                <span className="font-semibold">Email:</span>{' '}
                                {shop.email}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="product-search mb-6 w-2/4">
                    <input
                        type="text"
                        placeholder=" Search products..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border border-gray-300 rounded-full p-2 w-full hover:border-green-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition duration-200"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts?.map((product) => (
                        <div
                            key={product._id}
                            className="product-card border border-gray-300 rounded-lg shadow-lg p-4 bg-white flex flex-col justify-between hover:border-2 hover:border-green-500 transition duration-200"

                            /* Using flex and justify-between for vertical spacing */
                        >
                            <img
                                src={product.image.replace(/\.\w+$/, '.webp')}
                                alt={product.name}
                                className="w-full h-40 object-cover rounded-lg mb-2"
                            />
                            <h3 className="text-lg font-semibold">
                                {product.name}
                            </h3>
                            <p className="text-gray-700 mt-2">
                                {product.description}
                            </p>
                            <p className="text-lg font-bold mt-2">
                                Price: LKR {product.pricePerKg.toFixed(2)}
                            </p>

                            {/* Wrapping the button in a flex container with justify-center */}
                            <div className="mt-auto flex justify-center">
                                <Link
                                    to={`/shops/${id}/product/${product._id}`}
                                    className="w-35 block bg-green-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-600 transition duration-200 text-center"
                                    /* Button is now centered within the card */
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ShopPage
