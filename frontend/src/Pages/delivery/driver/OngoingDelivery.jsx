import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DeliverySidebar from '../../../Components/delivery/DeliverySidebar'
import Swal from 'sweetalert2'
import Loading from '../../../Components/Loading'

const OngoingDelivery = () => {
    const [deliveries, setDeliveries] = useState([])
    const [loading, setLoading] = useState(true)
    const [driver, setDriver] = useState(null)
    const driverToken = localStorage.getItem('driverToken')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDriverAndDeliveries = async () => {
            if (!driverToken) {
                navigate('/driver/login') // Redirect to login if not logged in
                return
            }

            try {
                // Fetch driver profile
                const driverRes = await axios.get('/api/drivers/profile', {
                    headers: {
                        Authorization: `Bearer ${driverToken}`,
                    },
                })
                setDriver(driverRes.data)

                // Fetch ongoing deliveries for the driver
                const deliveriesRes = await axios.get(
                    `/api/delivery/ongoing/${driverRes.data._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${driverToken}`,
                        },
                    }
                )

                setDeliveries(deliveriesRes.data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching deliveries:', error)
            }
        }

        fetchDriverAndDeliveries()
    }, [driverToken, navigate])

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

        // Show SweetAlert confirmation
        const result = await Swal.fire({
            title: `Are you sure you want to mark this delivery as ${newStatus}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Yes, ${newStatus}!`,
        })

        if (result.isConfirmed) {
            try {
                // Update status in the backend
                await axios.put(
                    `/api/delivery/${deliveryId}/status`,
                    { deliveryStatus: newStatus },
                    {
                        headers: {
                            Authorization: `Bearer ${driverToken}`,
                        },
                    }
                )

                // Update the state with the new status
                setDeliveries((prevDeliveries) =>
                    prevDeliveries.map((delivery) =>
                        delivery._id === deliveryId
                            ? { ...delivery, deliveryStatus: newStatus }
                            : delivery
                    )
                )

                // Show success message
                Swal.fire(
                    'Updated!',
                    `Delivery marked as ${newStatus}.`,
                    'success'
                )
            } catch (error) {
                Swal.fire('Error', 'Failed to update delivery status', 'error')
            }
        }
    }

    const handleViewDelivery = (deliveryId) => {
        navigate(`/driver/delivery/${deliveryId}`) // Navigate to delivery view page
    }

    if (loading) {
        return (
            <div className="flex flex-1 min-h-screen justify-center items-center">
                <Loading />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <DeliverySidebar driver={driver} />
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-64 p-16 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Ongoing Deliveries
                    </h1>

                    {deliveries.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2 border">
                                            Tracking ID
                                        </th>
                                        <th className="px-4 py-2 border">
                                            Order ID
                                        </th>
                                        <th className="px-4 py-2 border">
                                            Driver ID
                                        </th>
                                        <th className="px-4 py-2 border">
                                            Shop Name
                                        </th>
                                        <th className="px-4 py-2 border">
                                            Pickup Address
                                        </th>
                                        <th className="px-4 py-2 border">
                                            Customer Name
                                        </th>
                                        <th className="px-4 py-2 border">
                                            Dropoff Address
                                        </th>
                                        <th className="px-4 py-2 border">
                                            Assigned Time
                                        </th>
                                        <th className="px-4 py-2 border">
                                            Status
                                        </th>
                                        <th className="px-4 py-2 border">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deliveries.map((delivery) => (
                                        <tr
                                            key={delivery._id}
                                            className="hover:bg-gray-100"
                                        >
                                            <td className="px-4 py-2 border">
                                                {delivery.trackingID}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {delivery.oID}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {delivery.drID}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {delivery.shopName}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {delivery.pickupAddress}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {delivery.customerName}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {delivery.dropOffAddress}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {new Date(
                                                    delivery.assignDateTime
                                                ).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {delivery.deliveryStatus}
                                            </td>
                                            <td className="px-4 py-2 border space-y-2">
                                                <button
                                                    onClick={() =>
                                                        handleStatusUpdate(
                                                            delivery._id,
                                                            delivery.deliveryStatus
                                                        )
                                                    }
                                                    className={`block w-full px-4 py-2 ${
                                                        delivery.deliveryStatus ===
                                                        'Ready'
                                                            ? 'bg-yellow-500 hover:bg-yellow-600'
                                                            : delivery.deliveryStatus ===
                                                                'Picked Up'
                                                              ? 'bg-blue-500 hover:bg-blue-600'
                                                              : delivery.deliveryStatus ===
                                                                  'On The Way'
                                                                ? 'bg-green-500 hover:bg-green-600'
                                                                : 'bg-gray-400 cursor-not-allowed'
                                                    } text-white rounded-md`}
                                                    disabled={
                                                        delivery.deliveryStatus ===
                                                        'Delivered'
                                                    }
                                                >
                                                    {delivery.deliveryStatus ===
                                                    'Ready'
                                                        ? 'Picked Up'
                                                        : delivery.deliveryStatus ===
                                                            'Picked Up'
                                                          ? 'On The Way'
                                                          : delivery.deliveryStatus ===
                                                              'On The Way'
                                                            ? 'Delivered'
                                                            : 'Completed'}
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleViewDelivery(
                                                            delivery._id
                                                        )
                                                    }
                                                    className="block w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">
                            No ongoing deliveries at the moment.
                        </p>
                    )}
                </div>
            </main>
        </div>
    )
}

export default OngoingDelivery
