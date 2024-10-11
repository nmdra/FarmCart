import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loading from '../../Components/Loading'
import DistrictsData from '../../lib/DistrictData'

const ShopList = () => {
    const [shops, setShops] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOrder, setSortOrder] = useState('asc')
    const [filterCategory, setFilterCategory] = useState('')
    const [filterDistrict, setFilterDistrict] = useState('')
    const [loading, setLoading] = useState(true) // Loading state

    // Fetch shops on component mount
    useEffect(() => {
        const fetchShops = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
                const { data } = await axios.get('/api/userShops', config)

                setShops(data.shops)
            } catch (error) {
                console.error('Error fetching shops:', error)
            } finally {
                setLoading(false) // Set loading to false after fetch
            }
        }

        fetchShops()
    }, [])

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }

    // Filtering and Sorting Logic
    const filteredShops = shops
        .filter((shop) =>
            shop.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((shop) =>
            filterCategory ? shop.category === filterCategory : true
        )
        .filter((shop) =>
            filterDistrict ? shop.district === filterDistrict : true
        )
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name)
            } else {
                return b.name.localeCompare(a.name)
            }
        })

    return (
        <div className="relative min-h-screen bg-gray-50 grid grid-cols-1 justify-center">
            <div className="flex flex-col lg:flex-row">
                {/* Sidebar */}
                <div className="w-full lg:w-1/6 p-4 bg-white shadow-md rounded mb-4 lg:mb-0">
                    <h2 className="text-xl font-bold mb-4">Filters</h2>
                    <div className="mb-4">
                        <label className="block mb-2">Sort by:</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="asc">Name (A-Z)</option>
                            <option value="desc">Name (Z-A)</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Category:</label>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">All Categories</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="fruits">Fruits</option>
                            <option value="Spices">Spices</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">District:</label>
                        <select
                            value={filterDistrict}
                            onChange={(e) => setFilterDistrict(e.target.value)}
                            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">All Districts</option>
                            {Object.keys(DistrictsData).map((district) => (
                                <option key={district} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    {/* Promotional Banner */}
                    {/* <div className="bg-blue-500 text-white text-center p-4 mb-6 rounded">
          <h2 className="text-xl font-bold">Special Promotion: 20% off on all products!</h2>
        </div> */}

                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="   Search shops..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-5 border border-gray-300 rounded-full p-2 w-full hover:border-green-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition duration-200"
                    />

                    {/* Loading Message */}
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredShops.length > 0 ? (
                                filteredShops.map((shop) => (
                                    <div
                                        key={shop._id}
                                        className="bg-white p-4 rounded-lg shadow hover:border-2 hover:border-green-500 transition duration-200"
                                    >
                                        {shop.image && (
                                            <img
                                                src={shop.image.replace(
                                                    /\.\w+$/,
                                                    '.webp'
                                                )}
                                                alt={`${shop.name} image`}
                                                className="w-full h-32 object-cover rounded-t-lg mb-4"
                                            />
                                        )}
                                        <h3 className="text-lg font-semibold">
                                            {shop.name}
                                        </h3>
                                        <p className="text-gray-600">
                                            {shop.address.streetName},{' '}
                                            {shop.address.city}, {shop.district}
                                        </p>
                                        <p className="text-gray-500">
                                            {shop.email}
                                        </p>

                                        <Link
                                            to={`/shops/${shop._id}`}
                                            className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200"
                                        >
                                            View Shop
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>No shops found</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShopList
