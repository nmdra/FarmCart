import React, { useState } from 'react'
import axios from '../../axios'

const CreateOrderForm = () => {
    const [orderID, setOrderID] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [customerAddress, setCustomerAddress] = useState({
        streetAddress: '',
        city: '',
        zipCode: '',
        district: '',
    })
    const [shopName, setShopName] = useState('')
    const [shopAddress, setShopAddress] = useState({
        houseNo: '',
        streetName: '',
        city: '',
    })
    const [orderStatus, setOrderStatus] = useState('Pending')
    const [deliveryDate, setDeliveryDate] = useState('')
    const [deliverName, setDeliverName] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newOrder = {
            orderID,
            customerName,
            customerAddress,
            shopName,
            shopAddress,
            orderStatus,
            deliveryDate,
            deliverName,
        }

        try {
            const response = await axios.post(
                'http://localhost:3000/api/od/a',
                newOrder
            )
            console.log('Order created:', response.data)
        } catch (error) {
            console.error('Error creating order:', error)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8 space-y-4"
        >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Create a New Order
            </h2>

            {/* Order ID */}
            <div className="mb-4">
                <label
                    htmlFor="orderID"
                    className="block text-sm font-medium text-gray-700"
                >
                    Order ID
                </label>
                <input
                    id="orderID"
                    type="text"
                    value={orderID}
                    onChange={(e) => setOrderID(e.target.value)}
                    placeholder="Enter Order ID"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
            </div>

            {/* Customer Name */}
            <div className="mb-4">
                <label
                    htmlFor="customerName"
                    className="block text-sm font-medium text-gray-700"
                >
                    Customer Name
                </label>
                <input
                    id="customerName"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter Customer Name"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
            </div>

            {/* Customer Address */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Customer Address
                </label>
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Street Address"
                        value={customerAddress.streetAddress}
                        onChange={(e) =>
                            setCustomerAddress({
                                ...customerAddress,
                                streetAddress: e.target.value,
                            })
                        }
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={customerAddress.city}
                        onChange={(e) =>
                            setCustomerAddress({
                                ...customerAddress,
                                city: e.target.value,
                            })
                        }
                        className="p-2 w-full border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Zip Code"
                        value={customerAddress.zipCode}
                        onChange={(e) =>
                            setCustomerAddress({
                                ...customerAddress,
                                zipCode: e.target.value,
                            })
                        }
                        className="p-2 w-full border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="District"
                        value={customerAddress.district}
                        onChange={(e) =>
                            setCustomerAddress({
                                ...customerAddress,
                                district: e.target.value,
                            })
                        }
                        className="p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>
            </div>

            {/* Shop Name */}
            <div className="mb-4">
                <label
                    htmlFor="shopName"
                    className="block text-sm font-medium text-gray-700"
                >
                    Shop Name
                </label>
                <input
                    id="shopName"
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="Enter Shop Name"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
            </div>

            {/* Shop Address */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Shop Address
                </label>
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="House No"
                        value={shopAddress.houseNo}
                        onChange={(e) =>
                            setShopAddress({
                                ...shopAddress,
                                houseNo: e.target.value,
                            })
                        }
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Street Name"
                        value={shopAddress.streetName}
                        onChange={(e) =>
                            setShopAddress({
                                ...shopAddress,
                                streetName: e.target.value,
                            })
                        }
                        className="p-2 w-full border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={shopAddress.city}
                        onChange={(e) =>
                            setShopAddress({
                                ...shopAddress,
                                city: e.target.value,
                            })
                        }
                        className="p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>
            </div>

            {/* Order Status */}
            <div className="mb-4">
                <label
                    htmlFor="orderStatus"
                    className="block text-sm font-medium text-gray-700"
                >
                    Order Status
                </label>
                <select
                    id="orderStatus"
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                >
                    <option value="Pending">Pending</option>
                    <option value="Ready">Ready</option>
                    <option value="Picked Up">Picked Up</option>
                    <option value="On The Way">On The Way</option>
                    <option value="Delivered">Delivered</option>
                </select>
            </div>

            {/* Delivery Date */}
            <div className="mb-4">
                <label
                    htmlFor="deliveryDate"
                    className="block text-sm font-medium text-gray-700"
                >
                    Delivery Date
                </label>
                <input
                    id="deliveryDate"
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
            </div>

            {/* Deliver Name */}
            <div className="mb-4">
                <label
                    htmlFor="deliverName"
                    className="block text-sm font-medium text-gray-700"
                >
                    Deliver Name
                </label>
                <input
                    id="deliverName"
                    type="text"
                    value={deliverName}
                    onChange={(e) => setDeliverName(e.target.value)}
                    placeholder="Enter Deliver Name"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
                Create Order
            </button>
        </form>
    )
}

export default CreateOrderForm
