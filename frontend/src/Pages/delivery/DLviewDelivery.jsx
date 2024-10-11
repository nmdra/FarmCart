import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom' // Use navigate to handle navigation
import axios from 'axios' // Make sure this is correctly configured
import jsPDF from 'jspdf'
import 'jspdf-autotable' // Import jsPDF-autotable for table formatting
import farmcartLogo from '../../assets/logo.png' // Make sure you have your logo here
import DLmanageSidebar from '../../Components/delivery/DLmanageSidebar' // Sidebar component
import Loading from '../../Components/Loading'

const DLViewDelivery = () => {
    const { id } = useParams() // Get the delivery ID from the URL
    const [delivery, setDelivery] = useState(null) // State for storing delivery data
    const [driver, setDriver] = useState(null) // State for storing driver data

    const [loading, setLoading] = useState(true)
    const navigate = useNavigate() // To handle navigation if needed

    // Fetch delivery data and then fetch driver details
    useEffect(() => {
        const fetchDeliveryAndDriver = async () => {
            try {
                // Fetch delivery by ID
                const { data: deliveryData } = await axios.get(
                    `/api/delivery/d/${id}`
                )
                setDelivery(deliveryData)

                // Extract the driver ID from the delivery data
                const driverId = deliveryData.driverID

                // Fetch the driver details using the driver ID
                const { data: driverData } = await axios.get(
                    `/api/drivers/get/${driverId}`
                )
                setDriver(driverData)

                setLoading(false) // Set loading to false after both data are fetched
            } catch (error) {
                console.error(
                    'Error fetching delivery or driver details:',
                    error
                )
                setLoading(false)
            }
        }

        fetchDeliveryAndDriver()
    }, [id])

    if (loading) {
        return (
            <div className="flex flex-1 min-h-screen justify-center items-center">
                <Loading />
            </div>
        )
    }
    const generatePDF = () => {
        const doc = new jsPDF('p', 'mm', 'a4') // Set to A4 size (portrait orientation)

        // Add logo
        doc.addImage(farmcartLogo, 'PNG', 10, 10, 50, 20) // Add logo with width and height

        // Add report title
        doc.setFontSize(24)
        doc.setTextColor(40)
        doc.text('Delivery Details Report', 105, 40, null, null, 'center') // Centered title

        // Add company information
        doc.setFontSize(12)
        doc.text('FarmCart Lanka (PVT.) LTD', 105, 50, null, null, 'center')
        doc.text('No.78, Malabe, Colombo', 105, 55, null, null, 'center')
        doc.text('Phone: (+94) 011 34 56 837', 105, 60, null, null, 'center')
        doc.text('Website: www.farmcart.com', 105, 65, null, null, 'center')

        // Section for "Delivery Information"
        doc.setFontSize(18)
        doc.setTextColor(0, 51, 102) // Dark blue color
        doc.text('Delivery Information', 14, 80) // Section title left-aligned

        // Delivery details table
        doc.autoTable({
            startY: 90, // Positioning below "Delivery Information"
            head: [['Field', 'Details']], // Table headers
            body: [
                ['Tracking ID', delivery.trackingID],
                ['Order ID', delivery.oID],
                ['Driver ID', delivery.drID],
                ['Driver Name', driver.fullName],
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
            theme: 'grid', // Use the grid theme for a clean table format
            headStyles: { fillColor: [46, 204, 113] }, // Green background for table headers
            bodyStyles: { textColor: [0, 0, 0] }, // Black text color for the table body
            alternateRowStyles: { fillColor: [245, 245, 245] }, // Light grey for alternate rows
            margin: { top: 10 },
        })

        // Add footer section for generated date and signature space
        const finalY = doc.autoTable.previous.finalY + 20 // Get Y position after the table
        doc.setFontSize(12)
        doc.text(
            `Report Generated on: ${new Date().toLocaleString()}`,
            14,
            finalY
        )

        // Add "Approved by" section with signature line
        doc.text('Approved by:', 14, finalY + 10)
        doc.text('__________________________', 14, finalY + 20) // Placeholder for signature
        doc.text('Signature', 14, finalY + 25)

        // Save the PDF with a dynamic name based on the delivery tracking ID
        doc.save(`Delivery_${delivery.trackingID}.pdf`)
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16 mt-16">
                <DLmanageSidebar />
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
                    {delivery && driver ? (
                        <div className="overflow-x-auto">
                            <table className="mx-auto w-full text-left text-gray-700">
                                <tbody>
                                    {[
                                        ['Tracking ID', delivery.trackingID],
                                        ['Order ID', delivery.oID],
                                        ['Driver ID', delivery.drID],
                                        ['Driver Name', driver.fullName],

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
                            Download
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DLViewDelivery
