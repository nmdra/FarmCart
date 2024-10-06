import React, { useEffect, useState } from 'react'
import axios from 'axios'

const OrderManager = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // Fetch orders when component mounts
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get('/api/orders') // Adjust the API endpoint as per your setup
                setOrders(data)
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    const updateOrderStatus = async (orderId, status) => {
        try {
            await axios.put(`/api/orders/${orderId}`, { orderStatus: status })
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId
                        ? { ...order, orderStatus: status }
                        : order
                )
            )
        } catch (error) {
            console.error('Error updating order status:', error)
        }
    }

    if (loading) return <p>Loading orders...</p>
    if (error) return <p>Error: {error}</p>

    return (
        //this is for test order manager module.
        <div>
            <h1>Order Manager</h1>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Farmer</th>
                        <th>Items</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.farmer?.shopId}</td>
                            <td>
                                {order.orderItems.map((item) => (
                                    <div key={item._id}>
                                        {item.name} x {item.quantity}
                                    </div>
                                ))}
                            </td>
                            <td>{order.totalPrice}</td>
                            <td>{order.orderStatus}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        updateOrderStatus(order._id, 'Shipped')
                                    }
                                >
                                    Mark as Shipped
                                </button>
                                <button
                                    onClick={() =>
                                        updateOrderStatus(
                                            order._id,
                                            'Delivered'
                                        )
                                    }
                                >
                                    Mark as Delivered
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrderManager
