import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DeliverySidebar from '../../Components/delivery/DeliverySidebar'
import Loading from '../../Components/Loading'

import {
    FaCheck,
    FaTruck,
    FaClipboardCheck,
    FaShippingFast,
} from 'react-icons/fa' // Import icons for status

const DLDriverDashboard = () => {
    const [driver, setDriver] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isAvailable, setIsAvailable] = useState(false) // State for availability
    const [nicMatchesPassword, setNicMatchesPassword] = useState(false) // State for NIC and password check
    const [ongoingDeliveries, setOngoingDeliveries] = useState([]) // State for ongoing deliveries
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDriverProfile = async () => {
            const driverToken = localStorage.getItem('driverToken') // Get token from localStorage
            if (!driverToken) {
                navigate('/driver/login') // If no token, redirect to login page
                return
            }

            try {
                const { data } = await axios.get('/api/drivers/profile', {
                    headers: {
                        Authorization: `Bearer ${driverToken}`, // Pass token in headers
                    },
                })
                setDriver(data) // Set driver data from the response
                setIsAvailable(data.isAvailable) // Set initial availability

                // Check if NIC and password are the same
                const nicCheckRes = await axios.get(
                    '/api/drivers/nic-password-check',
                    {
                        headers: {
                            Authorization: `Bearer ${driverToken}`, // Pass token in headers
                        },
                    }
                )
                setNicMatchesPassword(nicCheckRes.data.nicMatchesPassword) // Set NIC and password equality check result

                // Fetch ongoing deliveries assigned to this driver
                const deliveriesRes = await axios.get(
                    `/api/delivery/ongoing/${data._id}`
                )
                setOngoingDeliveries(deliveriesRes.data)

                setLoading(false)
            } catch (err) {
                console.error('Error fetching driver profile:', err)
                localStorage.removeItem('driverToken') // Remove invalid token
                navigate('/driver/login') // Redirect to login on error
            }
        }

        fetchDriverProfile() // Fetch the driver profile on component load
    }, [navigate])

    const handleLogout = () => {
        navigate('/driver/logout') // Navigate to the DLlogout page
    }

    const toggleAvailability = async () => {
        const driverToken = localStorage.getItem('driverToken')
        try {
            await axios.put(
                `/api/drivers/${driver._id}/availability`, // Backend endpoint for updating availability
                { isAvailable: !isAvailable },
                {
                    headers: {
                        Authorization: `Bearer ${driverToken}`, // Pass token in headers
                    },
                }
            )
            setIsAvailable(!isAvailable) // Toggle availability state
        } catch (error) {
            console.error('Error updating availability:', error)
        }
    }

    const handleStatusUpdate = async (deliveryId, currentStatus) => {
        let newStatus

        // Determine next status
        if (currentStatus === 'Ready') {
            newStatus = 'Picked Up'
        } else if (currentStatus === 'Picked Up') {
            newStatus = 'On The Way'
        } else if (currentStatus === 'On The Way') {
            newStatus = 'Delivered'
        } else {
            return // If already delivered or status is not eligible for change, do nothing
        }

        try {
            const driverToken = localStorage.getItem('driverToken')
            await axios.put(
                `/api/delivery/${deliveryId}/status`,
                { deliveryStatus: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${driverToken}`,
                    },
                }
            )

            // Update the delivery status in the state
            setOngoingDeliveries((prevDeliveries) =>
                prevDeliveries.map((delivery) =>
                    delivery._id === deliveryId
                        ? { ...delivery, deliveryStatus: newStatus }
                        : delivery
                )
            )
        } catch (error) {
            console.error('Error updating delivery status:', error)
        }
    }

    const handleViewDelivery = (deliveryId) => {
        navigate(`/driver/delivery/${deliveryId}`) // Redirect to delivery view page
    }

    if (loading) {
        return (
            <div className="flex flex-1 min-h-screen justify-center items-center">
                <Loading />
            </div>
        )
    }

    // Helper function to render delivery status with icons
    const renderDeliveryStatus = (status) => {
        if (status === 'Ready') {
            return <FaClipboardCheck className="text-yellow-500" />
        } else if (status === 'Picked Up') {
            return <FaTruck className="text-blue-500" />
        } else if (status === 'On The Way') {
            return <FaShippingFast className="text-green-500" />
        } else if (status === 'Delivered') {
            return <FaCheck className="text-gray-500" />
        }
    }

    // Helper function to render progress bar based on status
    const renderProgressBar = (status) => {
        const progress =
            status === 'Ready'
                ? 25
                : status === 'Picked Up'
                  ? 50
                  : status === 'On The Way'
                    ? 75
                    : 100
        const bgColor = progress === 100 ? 'bg-gray-400' : 'bg-green-500'

        return (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className={`${bgColor} h-2.5 rounded-full`}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <DeliverySidebar driver={driver} handleLogout={handleLogout} />
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-64 p-16 overflow-y-auto">
                {/* NIC and Password Equality Check */}
                {nicMatchesPassword && (
                    <div className="bg-red-500 text-white p-4 rounded-md mb-6 text-center">
                        <strong>Warning:</strong> Your NIC number and password
                        are the same. Please update your password for better
                        security. When you change the password, you can assign
                        orders.
                    </div>
                )}

                <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Welcome, {driver.fullName}
                    </h1>

                    {/* Profile Info */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <p className="text-lg text-gray-600">
                                    Email: {driver.email}
                                </p>
                                <p className="text-lg text-gray-600">
                                    Vehicle: {driver.vehicleType}
                                </p>
                                <p className="text-lg text-gray-600">
                                    Phone: {driver.phone}
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                {!nicMatchesPassword && (
                                    <button
                                        onClick={toggleAvailability}
                                        className={`px-4 py-2 text-white font-bold rounded-md ${
                                            isAvailable
                                                ? 'bg-green-500 hover:bg-green-600'
                                                : 'bg-red-500 hover:bg-red-600'
                                        }`}
                                    >
                                        {isAvailable
                                            ? 'Available'
                                            : 'Unavailable'}
                                    </button>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* Availability Info */}
                        <div className="text-lg text-gray-700 font-semibold">
                            Availability:{' '}
                            {isAvailable ? 'Available' : 'Not Available'}
                        </div>
                    </div>

                    {/* Ongoing Deliveries Section */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">
                            Ongoing Deliveries
                        </h2>

                        {ongoingDeliveries.length > 0 ? (
                            <div className="space-y-6">
                                {ongoingDeliveries.map((delivery) => (
                                    <div
                                        key={delivery._id}
                                        className="bg-white p-6 shadow-lg rounded-lg"
                                    >
                                        {/* Delivery Tracking ID */}
                                        <h3 className="text-xl font-semibold mb-4">
                                            Tracking ID: {delivery.trackingID}
                                        </h3>

                                        {/* Delivery Status Progress Bar */}
                                        <div className="relative pt-1 mb-4">
                                            <div className="flex mb-2 items-center justify-between">
                                                <div>
                                                    <span className="text-base font-medium text-green-500">
                                                        Status:{' '}
                                                        {
                                                            delivery.deliveryStatus
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="overflow-hidden h-6 mb-4 text-xs flex rounded bg-gray-200">
                                                <div
                                                    style={{
                                                        width: `${
                                                            delivery.deliveryStatus ===
                                                            'Ready'
                                                                ? 25
                                                                : delivery.deliveryStatus ===
                                                                    'Picked Up'
                                                                  ? 50
                                                                  : delivery.deliveryStatus ===
                                                                      'On The Way'
                                                                    ? 75
                                                                    : 100
                                                        }%`,
                                                    }}
                                                    className={`${
                                                        delivery.deliveryStatus ===
                                                        'Delivered'
                                                            ? 'bg-gray-400'
                                                            : 'bg-green-500'
                                                    } h-full rounded-full`}
                                                ></div>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Progress:
                                                {delivery.deliveryStatus ===
                                                'Ready'
                                                    ? '25%'
                                                    : delivery.deliveryStatus ===
                                                        'Picked Up'
                                                      ? '50%'
                                                      : delivery.deliveryStatus ===
                                                          'On The Way'
                                                        ? '75%'
                                                        : '100% (Delivered)'}
                                            </div>
                                        </div>

                                        {/* Delivery Table for Detailed Info */}
                                        <table className="min-w-full bg-white border border-gray-200 mb-4">
                                            <thead>
                                                <tr className="bg-gray-200">
                                                    <th className="px-4 py-2 border">
                                                        Shop Name
                                                    </th>
                                                    <th className="px-4 py-2 border">
                                                        Pickup Address
                                                    </th>
                                                    <th className="px-4 py-2 border">
                                                        Dropoff Address
                                                    </th>
                                                    <th className="px-4 py-2 border">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="hover:bg-gray-100">
                                                    <td className="px-4 py-2 border">
                                                        {delivery.shopName}
                                                    </td>
                                                    <td className="px-4 py-2 border">
                                                        {delivery.pickupAddress}
                                                    </td>
                                                    <td className="px-4 py-2 border">
                                                        {
                                                            delivery.dropOffAddress
                                                        }
                                                    </td>
                                                    <td className="px-4 py-2 border space-y-2">
                                                        <button
                                                            onClick={() =>
                                                                handleStatusUpdate(
                                                                    delivery._id,
                                                                    delivery.deliveryStatus
                                                                )
                                                            }
                                                            className="block w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                                                        >
                                                            Update Status
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleViewDelivery(
                                                                    delivery._id
                                                                )
                                                            }
                                                            className="block w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                                                        >
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No ongoing deliveries at the moment.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DLDriverDashboard
