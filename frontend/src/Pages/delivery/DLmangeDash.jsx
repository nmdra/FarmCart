import React, { useState, useEffect } from 'react'
import axios from 'axios' // Ensure this path is correct
import DLmanageSidebar from '../../Components/delivery/DLmanageSidebar' // Sidebar component
import { useNavigate } from 'react-router-dom' // For navigating between pages

const DLmanageDash = () => {
    const [stats, setStats] = useState({
        totalDrivers: 0,
        availableDrivers: 0,
        totalDeliveries: 0,
        ongoingDeliveries: 0,
        pendingForms: 0,
    })

    const [pendingForms, setPendingForms] = useState([]) // Store pending delivery forms
    const [loading, setLoading] = useState(true) // Loading state
    const [error, setError] = useState(null) // Error state
    const navigate = useNavigate() // Navigate hook

    // Fetch statistics and pending forms when the component mounts
    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch total drivers count
                const totalDriversRes = await axios.get('/api/drivers/count')
                // Fetch available drivers count
                const availableDriversRes = await axios.get(
                    '/api/drivers/available/count'
                )
                // Fetch total deliveries count
                const totalDeliveriesRes = await axios.get(
                    '/api/delivery/total/count'
                )
                // Fetch ongoing deliveries count (where status != "Delivered")
                const ongoingDeliveriesRes = await axios.get(
                    '/api/delivery/ongoing/count'
                )
                // Fetch pending forms count and data
                const pendingFormsRes = await axios.get(
                    '/api/d_forms/pending-forms'
                )

                // Update the stats state with the fetched data
                setStats({
                    totalDrivers: totalDriversRes.data.count,
                    availableDrivers: availableDriversRes.data.count,
                    totalDeliveries: totalDeliveriesRes.data.count,
                    ongoingDeliveries: ongoingDeliveriesRes.data.count,
                    pendingForms: pendingFormsRes.data.length, // Add pending forms count
                })

                setPendingForms(pendingFormsRes.data) // Store the pending forms
            } catch (error) {
                console.error('Error fetching statistics:', error)
                setError('Failed to fetch statistics') // Set error message
            } finally {
                setLoading(false) // Set loading to false
            }
        }

        fetchStats()
    }, [])

    if (loading) {
        return <div>Loading...</div> // Display a loading message while fetching data
    }

    if (error) {
        return <div className="text-red-500">{error}</div> // Display error message if any
    }

    // Navigate to the view driver page
    const handleViewDriver = (id) => {
        navigate(`/manager/view-driver/${id}`)
    }

    // Navigate to the view delivery page
    const handleViewDelivery = (id) => {
        navigate(`/manager/delivery/${id}`)
    }

    // Navigate to view a specific form
    const handleViewForm = (id) => {
        navigate(`/manager/approve-driver/${id}`)
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <DLmanageSidebar />
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-64 p-16 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md">
                    <h1 className="text-3xl font-bold mb-8 text-gray-800">
                        Delivery Manager Dashboard
                    </h1>

                    {/* Statistics Section */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                        <div className="bg-green-100 p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-green-800">
                                Total Drivers
                            </h2>
                            <p className="text-4xl font-bold text-green-800 mt-4">
                                {stats.totalDrivers}
                            </p>
                        </div>
                        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-blue-800">
                                Available Drivers
                            </h2>
                            <p className="text-4xl font-bold text-blue-800 mt-4">
                                {stats.availableDrivers}
                            </p>
                        </div>
                        <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-yellow-800">
                                Ongoing Deliveries
                            </h2>
                            <p className="text-4xl font-bold text-yellow-800 mt-4">
                                {stats.ongoingDeliveries}
                            </p>
                        </div>
                        <div className="bg-red-100 p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-red-800">
                                Total Deliveries
                            </h2>
                            <p className="text-4xl font-bold text-red-800 mt-4">
                                {stats.totalDeliveries}
                            </p>
                        </div>
                        <div className="bg-purple-100 p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-purple-800">
                                Pending Forms
                            </h2>
                            <p className="text-4xl font-bold text-purple-800 mt-4">
                                {stats.pendingForms}
                            </p>
                        </div>
                    </div>

                    {/* Recent Pending Forms Section */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-2xl font-bold mb-4">
                            Recent Pending Forms
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2 text-left border">
                                            Full Name
                                        </th>
                                        <th className="px-4 py-2 text-left border">
                                            Email
                                        </th>
                                        <th className="px-4 py-2 text-left border">
                                            Phone
                                        </th>
                                        <th className="px-4 py-2 text-left border">
                                            Vehicle Type
                                        </th>
                                        <th className="px-4 py-2 text-left border">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingForms.slice(0, 5).map((form) => (
                                        <tr
                                            key={form._id}
                                            className="bg-white hover:bg-gray-100"
                                        >
                                            <td className="px-4 py-2 border">
                                                {form.fullName}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {form.email}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {form.phone}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {form.vehicleType}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                <button
                                                    className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600"
                                                    onClick={() =>
                                                        handleViewForm(form._id)
                                                    }
                                                >
                                                    View Form
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Ongoing Deliveries Section */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">
                            Ongoing Deliveries
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2 text-left border">
                                            Delivery ID
                                        </th>
                                        <th className="px-4 py-2 text-left border">
                                            Driver Name
                                        </th>
                                        <th className="px-4 py-2 text-left border">
                                            Vehicle Type
                                        </th>
                                        <th className="px-4 py-2 text-left border">
                                            Status
                                        </th>
                                        <th className="px-4 py-2 text-left border">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* This would be populated with ongoing delivery data */}
                                    <tr className="bg-white hover:bg-gray-100">
                                        <td className="px-4 py-2 border">
                                            #1234
                                        </td>
                                        <td className="px-4 py-2 border">
                                            John Doe
                                        </td>
                                        <td className="px-4 py-2 border">
                                            Bike
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <span className="bg-blue-500 text-white px-2 py-1 rounded">
                                                In Progress
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <button
                                                className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600"
                                                onClick={() =>
                                                    handleViewDelivery('1234')
                                                }
                                            >
                                                View Delivery
                                            </button>
                                        </td>
                                    </tr>
                                    {/* Add more rows as necessary */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DLmanageDash
