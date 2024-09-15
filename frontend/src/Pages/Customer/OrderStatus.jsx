import React from 'react'

const OrderStatus = () => {
    const order = {
        id: 4152,
        date: 'August 24, 2024',
        products: 3,
        billingAddress: {
            name: 'M. Sirisena',
            address: 'No. 61, Mahagomasekara Mawatha, New town, Polonnaruwa.',
            email: 'sirisena@gmail.com',
            phone: '027 2222301',
        },
        shippingAddress: {
            name: 'M. Sirisena',
            address: 'No. 61, Mahagomasekara Mawatha, New town, Polonnaruwa.',
            email: 'sirisena@gmail.com',
            phone: '027 2222301',
        },
        paymentMethod: 'Payhere',
        subtotal: 2500.0,
        discount: 10, // in percentage
        shipping: 'Free',
        total: 2250.0,
        status: 1, // 0: Order received, 1: Processing, 2: On the way, 3: Delivered
        productsList: [
            {
                name: 'Red Capsicum',
                price: 100.0,
                quantity: 6,
                image: 'https://via.placeholder.com/50x50', // Placeholder image
            },
            {
                name: 'Green Capsicum',
                price: 200.0,
                quantity: 2,
                image: 'https://via.placeholder.com/50x50',
            },
            {
                name: 'Green Chili',
                price: 150.0,
                quantity: 10,
                image: 'https://via.placeholder.com/50x50',
            },
        ],
    }

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg border-2 border-green-500 my-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Order Details</h2>
                <h4 className="font-semibold">ORDER ID: #{order.id}</h4>
                <h4 className="text-sm text-gray-500">
                    {order.date} • {order.products} Products
                </h4>
                <a href="/" className="text-green-600 text-sm">
                    Back to List
                </a>
            </div>
            <hr />
            <div className="grid grid-cols-2 gap-4 my-8">
                <div>
                    <h3 className="font-semibold mb-2">BILLING ADDRESS</h3>
                    <p>{order.billingAddress.name}</p>
                    <p>{order.billingAddress.address}</p>
                    <p>{order.billingAddress.phone}</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">SHIPPING ADDRESS</h3>
                    <p>{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>{order.shippingAddress.phone}</p>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="sr-only">Steps</h2>
                <div className="relative after:mt-4 after:block after:h-1 after:w-full after:rounded-lg after:bg-gray-200">
                    <ol className="grid grid-cols-4 text-sm font-medium text-gray-500">
                        <li
                            className={`relative flex justify-start ${order.status >= 0 ? 'text-blue-600' : 'text-gray-500'}`}
                        >
                            <span
                                className={`absolute -bottom-[1.75rem] left-0 rounded-full ${order.status >= 0 ? 'bg-blue-600' : 'bg-gray-600'} text-white`}
                            >
                                <svg
                                    className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            <span className="hidden sm:block">
                                Order received
                            </span>
                        </li>

                        <li
                            className={`relative flex justify-center ${order.status >= 1 ? 'text-blue-600' : 'text-gray-500'}`}
                        >
                            <span
                                className={`absolute -bottom-[1.75rem] left-1/2 -translate-x-1/2 rounded-full ${order.status >= 1 ? 'bg-blue-600' : 'bg-gray-600'} text-white`}
                            >
                                <svg
                                    className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            <span className="hidden sm:block">Processing</span>
                        </li>

                        <li
                            className={`relative flex justify-center ${order.status >= 2 ? 'text-blue-600' : 'text-gray-500'}`}
                        >
                            <span
                                className={`absolute -bottom-[1.75rem] left-1/2 -translate-x-1/2 rounded-full ${order.status >= 2 ? 'bg-blue-600' : 'bg-gray-600'} text-white`}
                            >
                                <svg
                                    className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            <span className="hidden sm:block">On the way</span>
                        </li>

                        <li
                            className={`relative flex justify-end ${order.status >= 3 ? 'text-blue-600' : 'text-gray-500'}`}
                        >
                            <span
                                className={`absolute -bottom-[1.75rem] right-0 rounded-full ${order.status >= 3 ? 'bg-blue-600' : 'bg-gray-600'} text-white`}
                            >
                                <svg
                                    className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            <span className="hidden sm:block">Delivered</span>
                        </li>
                    </ol>
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
                        {order.productsList.map((product, index) => (
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

            <div className="mt-8 flex justify-end pr-5">
                <div className="text-right">
                    <div className="text-lg ">
                        Subtotal:{' '}
                        <span className="text-gray-700">
                            Rs.{order.subtotal.toFixed(2)}
                        </span>
                    </div>
                    <div className="text-lg ">
                        Discount:{' '}
                        <span className="text-gray-700">
                            -{order.discount}%
                        </span>
                    </div>
                    <div className="text-lg ">
                        Shipping:{' '}
                        <span className="text-gray-700">{order.shipping}</span>
                    </div>
                    <div className="text-xl font-bold">
                        Total:{' '}
                        <span className="text-gray-700">
                            Rs.{order.total.toFixed(2)}
                        </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                        Payment Method: {order.paymentMethod}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderStatus
