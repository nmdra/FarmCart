import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable' // Import jsPDF-autotable for table formatting
import farmcartLogo from '../../../assets/logo.png' // Make sure you have your logo here
import DLmanageSidebar from '../../../Components/delivery/DeliverySidebar' // Sidebar component

const DLViewDelivery = () => {
    const { id } = useParams() // Get the delivery ID from the URL
    const [delivery, setDelivery] = useState(null) // State for storing delivery data
    const [driver, setDriver] = useState(null) // State for driver info
    const [loading, setLoading] = useState(true)
    const driverToken = localStorage.getItem('driverToken') // Get driver token from localStorage
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDelivery = async () => {
            if (!driverToken) {
                navigate('/driver/login') // Redirect to login if token is missing
                return
            }

            try {
                // Fetch the driver profile
                const driverRes = await axios.get('/api/drivers/profile', {
                    headers: {
                        Authorization: `Bearer ${driverToken}`,
                    },
                })
                setDriver(driverRes.data) // Set driver profile

                // Fetch the delivery details using the delivery ID from the URL
                const deliveryRes = await axios.get(`/api/delivery/d/${id}`, {
                    headers: {
                        Authorization: `Bearer ${driverToken}`,
                    },
                })
                setDelivery(deliveryRes.data) // Set delivery details
                setLoading(false) // Set loading to false when data is fetched
            } catch (error) {
                console.error('Error fetching delivery details:', error)
                setLoading(false)
            }
        }

        fetchDelivery()
    }, [driverToken, id, navigate])

    if (loading) return <div className="text-center mt-10">Loading...</div>

    // Function to generate the PDF
    const generatePDF = () => {
        const doc = new jsPDF()

        // Add logo
        doc.addImage(farmcartLogo, 'PNG', 10, 10, 50, 20) // Add logo with width and height

        // Add title
        doc.setFontSize(22)
        doc.text('Delivery Details', 105, 40, null, null, 'center') // Title centered at the top

        // Add company name
        doc.setFontSize(12)
        doc.text('FarmCart Lanka (PVT.) LTD', 105, 50, null, null, 'center')
        doc.text('No.78, Malabe, Colombo', 105, 55, null, null, 'center')
        doc.text('(+94) 011 34 56 837', 105, 60, null, null, 'center')
        doc.text('www.farmcart.com', 105, 65, null, null, 'center')

        // Move down to add delivery details table
        doc.setFontSize(12)
        doc.text('Delivery Information', 14, 80) // Left-aligned delivery information

        // Create a table with delivery details
        doc.autoTable({
            startY: 85, // Starting position on the Y-axis
            head: [['Field', 'Details']], // Table headers
            body: [
                ['Tracking ID', delivery.trackingID],
                ['Order ID', delivery.oID],
                ['Driver Name', driver?.firstName + ' ' + driver?.lastName], // Adding driver name
                ['Driver ID', delivery.drID],
                ['Shop Name', delivery.shopName],
                ['Pickup Address', delivery.pickupAddress],
                ['Customer Name', delivery.customerName || 'N/A'],
                ['Dropoff Address', delivery.dropOffAddress],
                [
                    'Assigned Time',
                    new Date(delivery.assignDateTime).toLocaleString(),
                ],
                ['Delivery Status', delivery.deliveryStatus],
                [
                    'Delivered Time',
                    delivery.deliveredDateTime
                        ? new Date(delivery.deliveredDateTime).toLocaleString()
                        : 'Ongoing',
                ],
            ],
            theme: 'grid', // Use grid theme for the table
            headStyles: { fillColor: [46, 204, 113] }, // Green background for headers
            bodyStyles: { textColor: [0, 0, 0] }, // Black text color for table body
        })

        // Save the PDF with a dynamic name based on the delivery tracking ID
        doc.save(`Delivery_${delivery.trackingID}.pdf`)
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <DLmanageSidebar driver={driver} />
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-64 p-10 md:p-16 overflow-y-auto">
                <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg border-l-4 border-green-500">
                    {' '}
                    {/* Added a green left border */}
                    <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
                        {' '}
                        {/* Increased font size and made it bolder */}
                        Delivery Details
                    </h2>
                    {delivery ? (
                        <div className="overflow-x-auto">
                            <table className="mx-auto w-full text-left text-gray-700">
                                <tbody>
                                    {[
                                        ['Tracking ID', delivery.trackingID],
                                        ['Order ID', delivery.oID],
                                        [
                                            'Driver Name',
                                            driver?.firstName +
                                                ' ' +
                                                driver?.lastName,
                                        ], // Display driver name
                                        ['Driver ID', delivery.drID],
                                        ['Shop Name', delivery.shopName],
                                        [
                                            'Pickup Address',
                                            delivery.pickupAddress,
                                        ],
                                        [
                                            'Customer Name',
                                            delivery.customerName || 'N/A',
                                        ],
                                        [
                                            'Dropoff Address',
                                            delivery.dropOffAddress,
                                        ],
                                        [
                                            'Assigned Time',
                                            new Date(
                                                delivery.assignDateTime
                                            ).toLocaleString(),
                                        ],
                                        [
                                            'Delivery Status',
                                            delivery.deliveryStatus,
                                        ],
                                        [
                                            'Delivered Time',
                                            delivery.deliveredDateTime
                                                ? new Date(
                                                      delivery.deliveredDateTime
                                                  ).toLocaleString()
                                                : 'Ongoing',
                                        ],
                                    ].map(([field, value], index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-100 cursor-pointer"
                                        >
                                            <td className="py-4 px-6 font-medium text-lg">
                                                {field}
                                            </td>
                                            <td className="py-4 px-6 text-lg">
                                                {value}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No delivery details found.</p>
                    )}
                    {/* Download Button */}
                    <div className="mt-6 text-center">
                        <button
                            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                            onClick={generatePDF}
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DLViewDelivery
