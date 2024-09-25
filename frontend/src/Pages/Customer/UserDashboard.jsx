import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import OrderTable from '../../Components/UserOrderTable'
import Breadcrumbs from '../../Components/Breadcrumbs'
import gold from '../../assets/premiumGold.png'
import silver from '../../assets/premiumSilver.png'
import regular from '../../assets/regular.png'
import axios from 'axios'
import Loading from '../../Components/Loading'

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
    }, [user])

    if (loading) {
        return <Loading />
    }

    return (
        <div className="relative min-h-screen bg-neutral-100 pr-8 pl-8">
            {/* Main Content */}
            <Breadcrumbs /> {/* Breadcrumbs at the top */}
            {/* Membership Banner */}
            <div className="flex w-fit items-center max-md:flex-col gap-6 bg-gradient-to-tr from-green-800 to-green-600 text-white px-6 py-3.5  mx-6 rounded font-[sans-serif] mt-4 shadow-sm">
                <p className="text-base flex-1 max-md:text-center">
                    Don't miss out on our amazing MEMBERSHIP PLANS! Upgrade to
                    Silver or Gold and enjoy exclusive benefits including
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
                <div className="flex basis-2/5 justify-between bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-700">
                    <div className="flex flex-col">
                        <img
                            src={user.pic}
                            alt="Profile"
                            className="h-16 w-16 rounded-full object-cover"
                        />
                        <h2 className="text-xl font-semibold">
                            {user.firstname} {user.lastname}
                        </h2>
                        <Link
                            to="/settings"
                            className="text-md text-green-600 hover:underline"
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
                <div className="flex basis-3/5 bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-700">
                    <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-500">
                            DEFAULT ADDRESS
                        </h3>
                        <p className="mt-2 text-gray-700">
                            {user.firstname} {user.lastname}
                        </p>
                        <p className="text-gray-500">
                            {user.defaultAddress.streetAddress},
                            {user.defaultAddress.city},
                            {user.defaultAddress.district} <br />
                            Postal Code: {user.defaultAddress.zipCode} <br />
                            {user.contactNumber}
                        </p>
                        <Link
                            to="/settings"
                            className="text-sm text-green-600 hover:underline"
                        >
                            Edit Address
                        </Link>
                    </div>
                </div>
            </div>
            {/* Recent Orders */}
{/* Recent Orders */}
<div className="max-w-full mx-2 p-6 bg-white rounded-lg shadow-lg border-2 border-green-400 mt-6">
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
            Recent Orders
        </h2>
        <Link
            to="/orderhistory"  
            className="text-green-700 underline text-sm"
        >
            View All
        </Link>
    </div>
    <OrderTable
        items={items}
        page={page}
        pages={pages}
        setPage={setPage}
    />
</div>

        </div>
    )
}

export default Dashboard
