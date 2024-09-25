import { useEffect, useState } from 'react'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../Components/farmer/Farmer_sidebar'
import shopCover from '../../assets/shop.png'
import addShopIcon from '../../assets/addshop.png'

const MyShop = () => {
    const [shops, setShops] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                console.log(token)
                const { data } = await axios.get('/shops', config)
                setShops(data)
            } catch (error) {
                console.error('Error fetching shops:', error)
            }
        }

        fetchShops()
    }, [])

    const handleViewShop = (shopId) => {
        navigate(`/farmerShop/${shopId}`)
    }

    const handleAddNewShop = () => {
        navigate('/shopcreate')
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Fixed Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md p-8 pt-16 mt-16">
                <Sidebar />
            </aside>

            <div className="flex-1 p-8 pt-24 overflow-y-auto ml-64">
                {/* Add New Shop Section */}
                <div className="flex items-start space-x-4 mb-12">
                    {/* Add New Shop Card */}
                    <div className="relative flex items-center justify-center bg-white rounded-lg shadow-md h-60 w-60">
                        <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
                            <img
                                src={addShopIcon}
                                alt="Add Shop"
                                className="w-45 h-40 mb-6"
                            />
                            <div className="flex justify-center">
                                <button
                                    onClick={handleAddNewShop}
                                    className="bg-green-500 text-white hover:bg-green-600 font-semibold py-2 px-4 rounded w-40 text-center"
                                >
                                    Create New Shop
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Note Section */}
                    <div className="flex flex-col justify-center pl-24">
                        <div className="text-m text-center leading-relaxed">
                            <h2 className="font-bold">Welcome to Fram Cart!</h2>
                            <p>
                                To create a new shop, simply click the "Add New
                                Shop" button. <br />
                                Please ensure that all the necessary information
                                is provided so that your shop can be easily
                                found by customers. <br />
                                You’re welcome to create multiple shops.
                                However, if any of your shops receive more than
                                5 negative reviews or <br />
                                complaints, there might be consequences,
                                including possible legal actions and
                                restrictions on your shop account.
                            </p>
                            <h3 className="font-semibold mt-4">
                                We appreciate your understanding and wish you
                                the very best in your business journey!
                            </h3>
                        </div>
                    </div>
                </div>

                {/* Shops Grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-8 pt-4">
                    {/* Render shops */}
                    {shops.map((shop) => (
                        <div
                            key={shop._id}
                            className="relative bg-white rounded-lg shadow-md overflow-hidden h-72 w-85 flex flex-col"
                        >
                            <img
                                src={shop.image || shopCover}
                                alt="Shop Cover"
                                className="object-cover h-full w-full"
                            />
                            <div className="absolute inset-0 flex flex-col justify-between p-4 bg-black bg-opacity-50">
                                <h2 className="text-3xl font-semibold text-white text-center pt-8">
                                    {shop.name}
                                </h2>
                                <div className="flex justify-center pb-16">
                                    <button
                                        onClick={() => handleViewShop(shop._id)}
                                        className="bg-green-500 text-white hover:bg-green-600 font-semibold py-2 px-4 rounded w-40 text-center"
                                    >
                                        View Shop
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

export default MyShop
