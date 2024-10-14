import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ShopList = () => {
    const [shops, setShops] = useState([]) // State to hold shop data
    const [loading, setLoading] = useState(true) // Loading state
    const [error, setError] = useState(null) // Error state

    const navigate = useNavigate()

    // Fetch shops from API when the component mounts
    useEffect(() => {
        const fetchShops = async () => {
            try {
                // Use the VITE_API_URL environment variable from .env file
                const { data } = await axios.get(`/api/shops/all-shops`)
                setShops(data) // Set shop data in state
                setLoading(false) // Turn off loading
            } catch (error) {
                console.error('Error fetching shops:', error)
                setError('Failed to fetch shops') // Set error message
                setLoading(false) // Turn off loading
            }
        }

        fetchShops() // Call the fetch function
    }, []) // Empty dependency array to only run on mount

    if (loading) {
        return <p>Loading shops...</p> // Show loading state
    }

    if (error) {
        return <p>{error}</p> // Show error state
    }

    return (
        <div id="shop-list" className="mx-auto max-w-7xl py-[5rem]">
            <h1 className="pb-10 text-4xl">Shop List</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                {shops.map((shop, index) => (
                    <div
                        key={index}
                        className="border-2 p-2 border-[#b8f724] rounded-lg cursor-pointer transition-transform transform hover:scale-105 hover:border-[#f3ffc6] hover:shadow-lg"
                        onClick={() => navigate(`/shops/${shop._id}`)} // Navigate to shop page on click
                    >
                        <div>
                            <img
                                src={shop.image.replace(/\.\w+$/, '.webp')}
                                alt={shop.name}
                                className="object-cover w-[300px] h-[200px] rounded-md transition-transform transform hover:scale-103"
                            />
                        </div>
                        <div className="flex flex-col py-3 gap-y-2">
                            <div className="">
                                <h1 className="text-xl ">{shop.name}</h1>
                            </div>
                            <div className="flex items-center gap-3 ">
                                <h1>{shop.category}</h1>
                                <h1>{shop.district}</h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center pt-10 pb-[6rem] ">
                <button
                    className="px-10 py-4 bg-[#b8f724] rounded-lg hover:bg-[#f3ffc6]"
                    onClick={() => navigate('/shops')}
                >
                    View More
                </button>
            </div>
            <div className=" h-[0.6vh] bg-[#f3ffc6] max-w-3xl mx-auto"></div>
        </div>
    )
}

export default ShopList
