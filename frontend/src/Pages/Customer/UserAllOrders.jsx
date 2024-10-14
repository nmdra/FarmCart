import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import OrderTable from '../../Components/UserOrderTable'
import Loading from '../../Components/Loading'
// import ProgressBar from '../../Components/Order/ProgressBar'

function UserAllOrders() {
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [orders, setOrders] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))

    const rowsPerPage = 8
    const pages = Math.ceil(orders?.length / rowsPerPage)

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage
        return Array.isArray(orders) ? orders.slice(start, end) : []
    }, [page, orders])

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                const res = await axios.get(
                    `/api/orders/get-user-orders/${user._id}` // change
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
        return (
            <div>
                <Loading />
            </div>
        )
    }

    return (
        <div className="relative min-h-screen bg-neutral-100 pr-18 pl-18">
            {/* <div>
                <ProgressBar currentStep={3} />
            </div> */}
            <div className="p-1 mt-0">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border-2 border-green-400 mt-4">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        All Orders
                    </h2>
                    <OrderTable
                        items={items}
                        page={page}
                        pages={pages}
                        setPage={setPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default UserAllOrders
