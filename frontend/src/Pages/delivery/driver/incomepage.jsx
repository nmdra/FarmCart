import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DeliverySidebar from '../../../Components/delivery/DeliverySidebar'
import Loading from '../../../Components/Loading'

const DriverIncomePage = () => {
    const [driver, setDriver] = useState(null)
    const [loading, setLoading] = useState(true)
    const [totalIncome, setTotalIncome] = useState(0)
    const [deliveryCount, setDeliveryCount] = useState(0)
    const [deliveryProfits, setDeliveryProfits] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDriverProfile = async () => {
            const driverToken = localStorage.getItem('driverToken') // Get token from localStorage
            if (!driverToken) {
                navigate('/driver/login') // If no token, redirect to login page
                return
            }

            try {
                // Fetch driver profile using the token
                const { data } = await axios.get('/api/drivers/profile', {
                    headers: {
                        Authorization: `Bearer ${driverToken}`, // Pass token in headers
                    },
                })

                setDriver(data) // Set driver data from the response
                setLoading(false)
            } catch (err) {
                console.error('Error fetching driver profile:', err)
                localStorage.removeItem('driverToken') // Remove invalid token
                navigate('/driver/login') // Redirect to login on error
            }
        }

        fetchDriverProfile() // Fetch the driver profile on component load
    }, [navigate])

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
                <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Income & Profits
                    </h1>

                    {/* Income Table */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2 border">
                                        Description
                                    </th>
                                    <th className="px-4 py-2 border">
                                        Amount (Rs.)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border">
                                        Total Deliveries
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {deliveryCount}
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border">
                                        Delivery Profits
                                    </td>
                                    <td className="px-4 py-2 border">
                                        Rs. {deliveryProfits}
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border">
                                        Other Earnings
                                    </td>
                                    <td className="px-4 py-2 border">Rs. 0</td>
                                </tr>
                                <tr className="hover:bg-gray-100 font-bold">
                                    <td className="px-4 py-2 border">
                                        Total Income
                                    </td>
                                    <td className="px-4 py-2 border">
                                        Rs. {totalIncome}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DriverIncomePage
