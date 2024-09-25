import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import Loading from '../../Components/Loading'
import DownloadReceipt from './DownloadReceipt' 

const OrderStatus = () => {
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    // Create a URL object
    const urlObj = new URL(window.location.href)
    const orderID = urlObj.searchParams.get('id')

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await axios.get(`/api/orders/${orderID}`)
                setOrder(data) // Fetching the first order for now
                // console.log(data) // Log the fetched order
                setLoading(false)
            } catch (err) {
                console.error(err) // Log the actual error
                setError('Failed to fetch order details.')
                setLoading(false)
            }
        }

        // Only fetch the order if orderID is available
        if (orderID) {
            fetchOrder()
        } else {
            setLoading(false) // No orderID means we can't fetch the order
            setError('No order ID provided.')
        }
    }, [orderID]) // Add orderID as a dependency

    if (loading) return <Loading />
    if (error)
        return <div className="text-center py-4 text-red-500">{error}</div>
    if (!order) return <div className="text-center py-4">No order found</div>

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg border-2 border-green-500 my-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Order Details</h2>
                <h4 className="font-semibold">ORDER ID: #{order._id.slice(-12)}</h4>
                <h4 className="text-sm text-gray-500">
                    {/* {new Date(order.createdAt).toLocaleDateString()} •{' '} */}
                    {order.orderItems.length} Products
                </h4>
                <Link to="/orderhistory" className="text-green-600 text-sm">
                    Back to List
                </Link>
            </div>
            <hr />
            <div className="grid grid-cols-3 gap-4 my-8">
                <div>
                    <h3 className="font-semibold mb-2">BILLING ADDRESS</h3>
                    <p>{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>{order.shippingAddress.city}</p>
                    <p>{order.shippingAddress.phone}</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">SHIPPING ADDRESS</h3>
                    <p>{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>{order.shippingAddress.city}</p>
                    <p>{order.shippingAddress.phone}</p>
                </div>
                <div className="mb-4 border border-green-500 rounded-lg p-8 bg-slate-100">
                    <h3 className="font-semibold mb-2 text-center text-sm">
                        ORDER STATUS
                        <h4 className="font-medium mb-1 text-xl">
                            {order.orderStatus}
                        </h4>
                    </h3>
                </div>
            </div>

            <div className="border-t pt-4 rounded-lg border-2 p-2">
                <table className="w-full">
                    <thead>
                        <tr className="text-left">
                            <th className="pb-2">PRODUCT</th>
                            <th className="pb-2">PRICE</th>
                            <th className="pb-2">QUANTITY</th>
                            <th className="pb-2">SUBTOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.orderItems.map((product, index) => (
                            <tr key={index} className="border-t">
                                <td className="py-4 flex items-center">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-12 h-12 mr-4"
                                    />
                                    {product.name}
                                </td>
                                <td className="py-4">
                                    Rs.{product.price.toFixed(2)}
                                </td>
                                <td className="py-4">{product.quantity}</td>
                                <td className="py-4 font-semibold">
                                    Rs.
                                    {(product.price * product.quantity).toFixed(
                                        2
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex justify-end">
                <div className="text-right">
                    <h3 className="font-bold text-lg">
                        TOTAL: Rs.{order.totalPrice.toFixed(2)}
                    </h3>
                    <h3 className="font-bold text-lg">
                        DISCOUNT: Rs.
                        {order.couponDiscount
                            ? order.couponDiscount.toFixed(2)
                            : 0}
                    </h3>
                    <h3 className="font-bold text-lg">
                        SHIPPING COST: Rs.
                        {order.shippingCost ? order.shippingCost.toFixed(2) : 0}
                    </h3>
                    <h3 className="font-bold text-lg">
                        FINAL TOTAL: Rs.
                        {(
                            order.totalPrice -
                            (order.couponDiscount || 0) +
                            (order.shippingCost || 0)
                        ).toFixed(2)}
                    </h3>
                </div>
            </div>
            {/* Download receipt */}
            <div className="mt-6">
                <DownloadReceipt order={order} /> {/* Add the download button */}
            </div>
        </div>
    )
}

export default OrderStatus
