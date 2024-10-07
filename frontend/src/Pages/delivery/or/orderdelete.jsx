import React, { useState, useEffect } from 'react'
import axios from 'axios'

const OrdersTable = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        // Fetch orders from the backend
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/api/od/g'
                ) // Ensure this route is correct
                setOrders(response.data)
            } catch (error) {
                console.error('Error fetching orders:', error)
            }
        }

        fetchOrders()
    }, [])

    // Function to delete an order
    const deleteOrder = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                // Send DELETE request to the backend
                await axios.delete(`http://localhost:3000/api/od/d/${id}`)

                // Remove the order from the UI after successful deletion
                setOrders(orders.filter((order) => order._id !== id))
            } catch (error) {
                console.error('Error deleting order:', error)
            }
        }
    }

    return (
        <div className="container">
            <h1>Order List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Shop Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order.orderID}</td>
                                <td>{order.customerName}</td>
                                <td>{order.shopName}</td>
                                <td>{order.orderStatus}</td>
                                <td>
                                    <button
                                        onClick={() => deleteOrder(order._id)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No orders found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default OrdersTable
