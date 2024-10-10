import React, { useState, useEffect } from 'react'
import axios from '../../axios' // Ensure the path matches your project structure
import { useNavigate } from 'react-router-dom'
import DLmanageSidebar from '../../Components/delivery/DLmanageSidebar' // Import the DeliverySidebar component
import Loading from '../../Components/Loading'

const DLApproveDriver = () => {
    const [pendingForms, setPendingForms] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    // Fetch pending forms when the component loads
    useEffect(() => {
        const fetchPendingForms = async () => {
            try {
                const { data } = await axios.get('/d_forms/pending-forms')
                setPendingForms(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching pending forms:', error)
                setLoading(false)
            }
        }

        fetchPendingForms()
    }, [])

    // Handle reviewing a driver by navigating to the review page
    const handleReview = (id) => {
        navigate(`/manager/approve-driver/${id}`)
    }

    if (loading) {
        return (
            <div className="flex flex-1 min-h-screen justify-center items-center">
                <Loading />
            </div>
        )
    }
    // Display a message if there are no pending forms
    if (pendingForms.length === 0) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                    <DLmanageSidebar />
                </aside>

                {/* Main content */}
                <main className="flex-1 ml-64 p-24 flex justify-start items-start">
                    <div className="text-center text-xl font-semibold">
                        No pending forms to approve.
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <DLmanageSidebar />
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-64 p-16 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-8 bg-white shadow-md rounded-lg">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        Pending Driver Approvals
                    </h2>

                    {/* Table container */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-6 py-3 border-b-2 text-left text-gray-600">
                                        Full Name
                                    </th>
                                    <th className="px-6 py-3 border-b-2 text-left text-gray-600">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 border-b-2 text-left text-gray-600">
                                        Phone
                                    </th>
                                    <th className="px-6 py-3 border-b-2 text-left text-gray-600">
                                        Vehicle Type
                                    </th>
                                    <th className="px-6 py-3 border-b-2 text-left text-gray-600">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingForms.map((form) => (
                                    <tr
                                        key={form._id}
                                        className="hover:bg-gray-100"
                                    >
                                        <td className="px-6 py-4 border-t text-left">
                                            {form.fullName}
                                        </td>
                                        <td className="px-6 py-4 border-t text-left">
                                            {form.email}
                                        </td>
                                        <td className="px-6 py-4 border-t text-left">
                                            {form.phone}
                                        </td>
                                        <td className="px-6 py-4 border-t text-left">
                                            {form.vehicleType}
                                        </td>
                                        <td className="px-6 py-4 border-t text-center">
                                            <button
                                                onClick={() =>
                                                    handleReview(form._id)
                                                }
                                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                                            >
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DLApproveDriver
