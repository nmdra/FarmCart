import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import OrderTable from '../../Components/UserOrderTable'
// import Breadcrumbs from '../../Components/Breadcrumbs'
import gold from '../../assets/premiumGold.png'
import silver from '../../assets/premiumSilver.png'
import regular from '../../assets/regular.png'
import axios from 'axios'
import Loading from '../../Components/Loading'
import ProductCarousel from '../../Components/ProductCarosul'

function Dashboard() {
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))

    const rowsPerPage = 2
    const pages = Math.ceil(orders?.length / rowsPerPage)

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage
        return Array.isArray(orders) ? orders.slice(start, end) : []
    }, [page, orders])

    useEffect(() => {
        document.title = 'FarmCart : Dashboard'
    }, [])

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                const res = await axios.get(
                    `/api/orders/get-user-orders/${user._id}` // user id
                )
                setOrders(res.data) // Set the orders with the fetched data
                setLoading(false)
            } catch (error) {
                console.error('Error fetching user orders:', error)
                setLoading(false)
            }
        }

        if (user?._id) {
            fetchUserOrders()
        }
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <div className="relative min-h-screen pt-6 pb-6 pl-8 pr-8 bg-neutral-100">
            {/* Main Content */}
            {/* <Breadcrumbs /> Breadcrumbs at the top */}
            {/* Membership Banner */}
            <div className="flex w-fit items-center max-md:flex-col gap-6 bg-gradient-to-tr from-green-800 to-green-600 text-white px-6 py-3.5  mx-6 rounded font-[sans-serif] mt-4 shadow-sm">
                <p className="flex-1 text-base max-md:text-center">
                    Don&apos;t miss out on our amazing MEMBERSHIP PLANS! Upgrade
                    to Silver or Gold and enjoy exclusive benefits including
                    discounts and free delivery.
                </p>
                <div className="flex items-center">
                    <Link to="/membership">
                        <button
                            type="button"
                            className="bg-slate-100 hover:bg-slate-200 hover:scale-110 transition-transform text-green-900 py-2.5 px-5 rounded text-md shadow-sm"
                        >
                            Get Offer
                        </button>
                    </Link>
                </div>
            </div>
            {/* Profile and Billing Section */}
            <div className="flex flex-row gap-4 mt-4">
                {/* Profile Section */}
                <div className="flex justify-between p-4 bg-white border-l-4 border-green-700 rounded-lg shadow-sm basis-2/5">
                    <div className="flex flex-col">
                        <img
                            src={user.pic}
                            alt="Profile"
                            className="object-cover w-16 h-16 rounded-full"
                        />
                        <h2 className="text-xl font-semibold">
                            {user.firstname} {user.lastname}
                        </h2>
                        <Link
                            to="/settings"
                            className="text-green-600 text-md hover:underline"
                        >
                            Edit Profile
                        </Link>
                    </div>
                    <div className="flex flex-col bg-transparent rounded-full">
                        <img
                            src={
                                user.membershipType === 'gold'
                                    ? gold
                                    : user.membershipType === 'silver'
                                      ? silver
                                      : regular
                            }
                            alt="Plan Icon"
                            className="w-20 h-20 rounded-full"
                        />
                        <p className="text-gray-600 text-md">
                            {user.membershipType.toUpperCase()}
                        </p>
                    </div>
                </div>

                {/* Billing Address */}
                {/* Billing Address */}
                <div className="flex p-4 bg-white border-l-4 border-green-700 rounded-lg shadow-sm basis-3/5">
                    <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-500">
                            DEFAULT ADDRESS
                        </h3>
                        {user?.defaultAddress &&
                        user?.defaultAddress.streetAddress ? (
                            <>
                                <p className="mt-2 text-gray-700">
                                    {user.firstname} {user.lastname}
                                </p>
                                <p className="text-gray-500">
                                    {user.defaultAddress.streetAddress},{' '}
                                    {user.defaultAddress.city},{' '}
                                    {user.defaultAddress.district} <br />
                                    Postal Code: {
                                        user.defaultAddress.zipCode
                                    }{' '}
                                    <br />
                                    {user.contactNumber}
                                </p>
                                <Link
                                    to="/settings"
                                    className="text-sm text-green-600 hover:underline"
                                >
                                    Edit Address
                                </Link>
                            </>
                        ) : (
                            <div>
                                <p className="mt-2 text-red-500">
                                    Complete your profile by adding a default
                                    address.
                                </p>
                                <Link to="/settings">
                                    <button
                                        type="button"
                                        className="mt-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                                    >
                                        Click here
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Recent Orders */}
            {/* Recent Orders */}
            <ProductCarousel />
            <div className="max-w-full p-6 mx-2 mt-6 bg-white border-2 border-green-400 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Recent Orders
                    </h2>
                    <Link
                        to="/orderhistory"
                        className="text-sm text-green-700 underline"
                    >
                        View All
                    </Link>
                </div>
                <OrderTable
                    items={items}
                    page={pages}
                    pages={1}
                    setPage={setPage}
                />
            </div>
        </div>
    )
}

export default Dashboard
