import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from '../../axios'
import Sidebar from '../../Components/farmer/shop_sidebar'
import shopCover from '../../assets/shop.png'

const Shop = () => {
    const { id } = useParams()
    const [shop, setShop] = useState(null)
    const [orderStats, setOrderStats] = useState({
        totalOrders: 0,
        ongoingOrders: 0,
        completedOrders: 0,
    })

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                // Set shopId in localStorage
                localStorage.setItem('shopId', id)

                // Fetch shop details
                const { data: shopData } = await axios.get(
                    `/shops/${id}`,
                    config
                )
                setShop(shopData)

                // Fetch orders related to the shop
                const { data: orders } = await axios.get(
                    `/orders?shopId=${id}`,
                    config
                )

                // Calculate order stats
                const totalOrders = orders.filter(
                    (order) => order.orderStatus !== 'Reject'
                ).length
                const completedOrders = orders.filter(
                    (order) => order.orderStatus === 'Delivered'
                ).length
                const ongoingOrders = totalOrders - completedOrders

                // Update state with the calculated order stats
                setOrderStats({
                    totalOrders,
                    ongoingOrders,
                    completedOrders,
                })
            } catch (error) {
                console.error('Error fetching shop details or orders:', error)
            }
        }

        fetchShop()
    }, [id])

    if (!shop) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex  min-h-screen bg-gray-50">
            <aside className="fixed top-28 left-0 bottom-0 w-64 o bg-gray-50 shadow-md pl-8 pt-8">
                <Sidebar />
            </aside>

            <div className="flex-1 ml-64 p-24 pt-12 overflow-y-auto">
                {/* Shop Name and Cover Image Card */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full ">
                    <div className="relative">
                        <img
                            src={shop.image || shopCover}
                            alt={shop.name}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <h2 className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">
                            {shop.name}
                        </h2>
                    </div>
                </div>

                {/* Shop Details Card */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex w-full">
                    <div className="w-1/2 pr-4 text-left pl-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Details
                        </h3>
                        <p className="text-gray-900">{shop.name}</p>
                        <p className="text-gray-900">{shop.district}</p>
                        <p className="text-gray-900">
                            {shop.address.houseNo}, {shop.address.streetName},{' '}
                            {shop.address.city}
                        </p>
                        <p className="text-gray-900">{shop.email}</p>
                        <p className="text-gray-900">{shop.contactNumber}</p>
                        <Link
                            to="/farmerShop/profile"
                            className="text-green-500 mt-2 inline-block font-bold"
                        >
                            Edit Details
                        </Link>
                    </div>
                    <div className="w-1/2 pl-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            About
                        </h3>
                        <p className="text-gray-700">{shop.description}</p>
                    </div>
                </div>

                {/* Order Stats Cards */}
                <div className="flex gap-x-10">
                    <div className="bg-custom-green p-6 rounded-lg shadow-md w-2/3 text-center">
                        <h3 className="text-2xl font-bold text-white">
                            {orderStats.totalOrders}
                        </h3>
                        <p className="text-white">Total Orders</p>
                    </div>
                    <div className="bg-custom-green p-6 rounded-lg shadow-md w-2/3 text-center">
                        <h3 className="text-2xl font-bold text-white">
                            {orderStats.ongoingOrders}
                        </h3>
                        <p className="text-white">Ongoing Orders</p>
                    </div>
                    <div className="bg-custom-green p-6 rounded-lg shadow-md w-2/3 text-center">
                        <h3 className="text-2xl font-bold text-white">
                            {orderStats.completedOrders}
                        </h3>
                        <p className="text-white">Completed Orders</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop
