import { useEffect, useState } from 'react'
import axios from '../../../axios'
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
        navigate(`/shop/${shopId}`)
    }

    const handleAddNewShop = () => {
        navigate('/shopcreate')
    }

    return (
        <div className="flex min-h-screen w-screen bg-gray-100">
            <div className="p-6 pt-16 pl-8 rounded-lg shadow-md">
                <Sidebar />
            </div>

            <div className="flex-1 p-8 pt-16">
                <div className="grid grid-cols-4 gap-x-1 gap-y-8">
                    {/* Render shops */}
                    {shops.map((shop) => (
                        <div
                            key={shop._id}
                            className="relative bg-white rounded-lg shadow-md overflow-hidden h-72 w-72 flex flex-col"
                        >
                            <img
                                src={shopCover}
                                alt="Shop Cover"
                                className="object-cover h-full w-full"
                            />
                            <div className="absolute inset-0 flex flex-col justify-between p-4 bg-black bg-opacity-50">
                                <h2 className="text-xl font-semibold text-white">
                                    {shop.name}
                                </h2>
                                <div className="flex justify-center">
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

                    {/* Add New Shop Card */}
                    <div className="relative flex items-center justify-center bg-white rounded-lg shadow-md h-72 w-72">
                        <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
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
                                    Add New Shop
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyShop
