import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DeliverySidebar from '../../../Components/delivery/DeliverySidebar'
import Swal from 'sweetalert2'
import Loading from '../../../Components/Loading'

const ViewDeliveries = () => {
    const [deliveries, setDeliveries] = useState([])
    const [filteredDeliveries, setFilteredDeliveries] = useState([])
    const [loading, setLoading] = useState(true)
    const [driver, setDriver] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('All Deliveries')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
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

                // Fetch all deliveries for the driver
                const deliveriesRes = await axios.get(
                    `/api/delivery/driver/${driverRes.data._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${driverToken}`,
                        },
                    }
                )

                setDeliveries(deliveriesRes.data)
                setFilteredDeliveries(deliveriesRes.data)
                setLoading(false)
                setTotalPages(Math.ceil(deliveriesRes.data.length / 20)) // Assuming 20 deliveries per page
            } catch (error) {
                console.error('Error fetching deliveries:', error)
                setLoading(false)
            }
        }

        fetchDriverAndDeliveries()
    }, [driverToken, navigate])

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase()
        setSearchTerm(value)
        filterDeliveries(value, filterStatus)
    }

    const applyStatusFilter = (status) => {
        setFilterStatus(status)
        filterDeliveries(searchTerm, status)
    }

    const filterDeliveries = (search, status) => {
        const filtered = deliveries.filter((delivery) => {
            const matchesSearch =
                delivery.trackingID.toLowerCase().includes(search) ||
                delivery.shopName.toLowerCase().includes(search) ||
                delivery.drID.toLowerCase().includes(search) ||
                delivery.customerName.toLowerCase().includes(search)

            const matchesStatus =
                status === 'All Deliveries' ||
                delivery.deliveryStatus === status

            return matchesSearch && matchesStatus
        })

        setFilteredDeliveries(filtered)
        setTotalPages(Math.ceil(filtered.length / 20)) // Update total pages based on filtered deliveries
        setPage(1) // Reset to first page
    }

    const handleView = (deliveryId) => {
        navigate(`/driver/delivery/${deliveryId}`) // Navigate to delivery view page
    }

    const handlePageChange = (newPage) => {
        setPage(newPage)
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
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        All Deliveries
                    </h2>

                    {/* Search box */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search deliveries by tracking ID, shop name, driver ID, or customer name"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Status filter buttons */}
                    <div className="flex justify-center mb-4 space-x-4">
                        {[
                            'All Deliveries',
                            'Ready',
                            'Picked Up',
                            'On The Way',
                            'Delivered',
                        ].map((status) => (
                            <button
                                key={status}
                                onClick={() => applyStatusFilter(status)}
                                className={`px-4 py-2 rounded-md focus:outline-none ${filterStatus === status ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    {/* Deliveries table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 text-sm">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-3 py-2 border text-left">
                                        #
                                    </th>
                                    <th className="px-3 py-2 border text-left">
                                        Tracking ID
                                    </th>
                                    <th className="px-3 py-2 border text-left">
                                        Order ID
                                    </th>
                                    <th className="px-3 py-2 border text-left">
                                        Driver ID
                                    </th>
                                    <th className="px-3 py-2 border text-left">
                                        Shop Name
                                    </th>
                                    <th className="px-3 py-2 border text-left">
                                        Pickup Address
                                    </th>
                                    <th className="px-3 py-2 border text-left">
                                        Customer Name
                                    </th>
                                    <th className="px-3 py-2 border text-left">
                                        Dropoff Address
                                    </th>
                                    <th className="px-3 py-2 border text-left">
                                        Assigned Time
                                    </th>
                                    <th className="px-3 py-2 border text-left">
                                        Status
                                    </th>
                                    <th className="px-3 py-2 border text-left">
                                        Delivered Time
                                    </th>
                                    <th className="px-3 py-2 border text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDeliveries.length > 0 ? (
                                    filteredDeliveries
                                        .slice((page - 1) * 20, page * 20)
                                        .map((delivery, index) => (
                                            <tr
                                                key={delivery._id}
                                                className="hover:bg-gray-100"
                                            >
                                                <td className="px-3 py-2 border text-left">
                                                    {(page - 1) * 20 +
                                                        index +
                                                        1}
                                                </td>
                                                <td className="px-3 py-2 border">
                                                    {delivery.trackingID}
                                                </td>
                                                <td className="px-3 py-2 border">
                                                    {delivery.oID}
                                                </td>
                                                <td className="px-3 py-2 border">
                                                    {delivery.drID}
                                                </td>
                                                <td className="px-3 py-2 border">
                                                    {delivery.shopName}
                                                </td>
                                                <td className="px-3 py-2 border">
                                                    {delivery.pickupAddress}
                                                </td>
                                                <td className="px-3 py-2 border">
                                                    {delivery.customerName ||
                                                        'N/A'}
                                                </td>
                                                <td className="px-3 py-2 border">
                                                    {delivery.dropOffAddress}
                                                </td>
                                                <td className="px-3 py-2 border">
                                                    {new Date(
                                                        delivery.assignDateTime
                                                    ).toLocaleString()}
                                                </td>
                                                <td className="px-3 py-2 border">
                                                    {delivery.deliveryStatus}
                                                </td>
                                                <td className="px-3 py-2 border">
                                                    {delivery.deliveredDateTime
                                                        ? new Date(
                                                              delivery.deliveredDateTime
                                                          ).toLocaleString()
                                                        : 'Ongoing'}
                                                </td>
                                                <td className="px-3 py-2 border">
                                                    <button
                                                        className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                        onClick={() =>
                                                            handleView(
                                                                delivery._id
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="12"
                                            className="px-3 py-2 border text-center text-gray-600"
                                        >
                                            No deliveries found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            className={`py-1 px-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 ${page === 1 ? 'cursor-not-allowed' : ''}`}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span className="text-gray-700">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            className={`py-1 px-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 ${page === totalPages ? 'cursor-not-allowed' : ''}`}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ViewDeliveries
