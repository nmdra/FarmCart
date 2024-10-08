import React, { useEffect, useState } from 'react'
import axios from 'axios'

const OrderTable = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        // Fetch all orders on component mount
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/od/g')
                setOrders(response.data)
            } catch (error) {
                console.error('Error fetching orders:', error)
            }
        }

        fetchOrders()
    }, [])

    const updateOrderStatus = async (orderId) => {
        try {
            const response = await axios.put(`/api/od/u/${orderId}/status`)
            const updatedOrder = response.data

            // Update order status in state
            setOrders(
                orders.map((order) =>
                    order._id === updatedOrder._id ? updatedOrder : order
                )
            )
        } catch (error) {
            console.error('Error updating order status:', error)
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Orders Table</h1>
            <table className="min-w-full bg-white border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Order ID</th>
                        <th className="border px-4 py-2">Customer Name</th>
                        <th className="border px-4 py-2">Shop Name</th>
                        <th className="border px-4 py-2">Order Status</th>
                        <th
                            className="border p
                        
                        x-4 py-2"
                        >
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td className="border px-4 py-2">
                                {order.orderID}
                            </td>
                            <td className="border px-4 py-2">
                                {order.customerName}
                            </td>
                            <td className="border px-4 py-2">
                                {order.shopName}
                            </td>
                            <td className="border px-4 py-2">
                                {order.orderStatus}
                            </td>
                            <td className="border px-4 py-2">
                                {order.orderStatus !== 'Delivered' ? (
                                    <button
                                        onClick={() =>
                                            updateOrderStatus(order._id)
                                        }
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    >
                                        Update Status
                                    </button>
                                ) : (
                                    <span>Delivered</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrderTable
