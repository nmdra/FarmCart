import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable' // Import jsPDF-autotable for table formatting
import farmcartLogo from '../../../assets/logo.png' // Make sure you have your logo here
import DLmanageSidebar from '../../../Components/delivery/DeliverySidebar' // Sidebar component
import Loading from '../../../Components/Loading'

const DLViewDelivery = () => {
    const { id } = useParams() // Get the delivery ID from the URL
    const [delivery, setDelivery] = useState(null) // State for storing delivery data
    const [driver, setDriver] = useState(null) // State for driver info
    const [customer, setCustomer] = useState(null) // State for driver info

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

    if (loading) {
        return (
            <div className="flex flex-1 min-h-screen justify-center items-center">
                <Loading />
            </div>
        )
    }

    const generatePDF = () => {
        const doc = new jsPDF('p', 'mm', 'a4') // Ensure A4 size document

        // 1. Add the logo and company details
        addLogoAndCompanyInfo(doc)

        // 2. Add a bold main title
        addMainTitle(doc)

        // 3. Add a line divider below the title and company info
        addDivider(doc, 60) // Positioned at y=60 to be below the title and company details

        // 4. Add tracking and issued details (tracking ID, dates, delivery status, etc.)
        addTrackingAndIssuedDetails(doc)

        // 5. Add delivery details in a table format
        addDeliveryDetailsTable(doc)

        // 6. Add footer with generated information and signature
        addFooter(doc)

        // 7. Save the PDF with a dynamic name based on the delivery tracking ID
        doc.save(`Delivery_${delivery.trackingID}.pdf`)
    }

    // Function to add the logo and company information
    const addLogoAndCompanyInfo = (doc) => {
        // Add the logo at the top, aligned to the left
        doc.addImage(farmcartLogo, 'PNG', 10, 10, 50, 20)

        // Add the company information to the right of the logo
        doc.setFontSize(12)
        doc.text('FarmCart Lanka (PVT.) LTD', 190, 15, null, null, 'right')
        doc.text('No.78, Malabe, Colombo', 190, 20, null, null, 'right')
        doc.text('(+94) 011 34 56 837', 190, 25, null, null, 'right')
        doc.text('contact@farmcart.com', 190, 30, null, null, 'right')
        doc.text('www.farmcart.com', 190, 35, null, null, 'right')
    }

    // Function to add the bold main title
    const addMainTitle = (doc) => {
        // Set font to bold and add the main title
        doc.setFontSize(24)
        doc.setFont('helvetica', 'bold') // Set font to bold
        doc.setTextColor(40)
        doc.text('Delivery Details Report', 105, 50, null, null, 'center') // Title centered at the top
    }

    // Function to add tracking ID, assigned date (issued date), delivered date, and other details
    const addTrackingAndIssuedDetails = (doc) => {
        // Add the main title
        doc.setFontSize(24)
        doc.setFont('helvetica', 'bold') // Set font to bold
        doc.setTextColor(40)
        doc.text('Delivery Details Report', 105, 50, null, null, 'center') // Title centered at the top

        // Add tracking ID, assigned date (as Issued Date), and delivered date or "Ongoing"
        doc.setFontSize(12)
        doc.setFont('helvetica', 'normal') // Reset font to normal

        // Tracking ID
        doc.text(`Tracking ID: ${delivery.trackingID}`, 14, 70) // Left-aligned tracking ID

        // Assigned Date (as Issued Date)
        doc.text(
            `Assigned Date: ${new Date(delivery.assignDateTime).toLocaleDateString()}`,
            190,
            70,
            null,
            null,
            'right'
        ) // Right-aligned assigned date

        // Delivery Status
        doc.text(`Delivery Status: ${delivery.deliveryStatus}`, 14, 75) // Left-aligned delivery status

        // Delivered Date or Ongoing
        const deliveredText = delivery.deliveredDateTime
            ? new Date(delivery.deliveredDateTime).toLocaleDateString() // Delivered Date
            : 'Ongoing' // If not delivered
        doc.text(
            `Delivered Date: ${deliveredText}`,
            190,
            75,
            null,
            null,
            'right'
        ) // Right-aligned delivered/ongoing date
    }

    // Function to add a divider line
    const addDivider = (doc, yPos) => {
        doc.setLineWidth(0.5)
        doc.line(10, yPos, 200, yPos) // Horizontal line from x=10 to x=200
    }

    // Function to add delivery details in a table
    const addDeliveryDetailsTable = (doc) => {
        doc.autoTable({
            startY: 90, // Start below the divider line
            head: [['#', 'Field', 'Details']], // Add numbering in the table header
            body: [
                ['1', 'Tracking ID', delivery.trackingID],
                ['2', 'Order ID', delivery.oID],
                [
                    '3',
                    'Driver Name',
                    driver?.firstName + ' ' + driver?.lastName,
                ],
                ['4', 'Driver ID', delivery.drID],
                ['5', 'Shop Name', delivery.shopName],
                ['6', 'Shop Contact Number', delivery.shopPhone],
                ['7', 'Shop Email', delivery.shopEmail],
                ['8', 'Pickup Address', delivery.pickupAddress],
                ['9', 'Customer Name', delivery.customerName || 'N/A'],
                [
                    '10',
                    'Customer Contact Number',
                    delivery.customerNumber || 'N/A',
                ],
                ['11', 'Customer Email', delivery.customerEmail || 'N/A'],
                ['12', 'Dropoff Address', delivery.dropOffAddress],
                [
                    '13',
                    'Assigned Time',
                    new Date(delivery.assignDateTime).toLocaleString(),
                ],
                ['14', 'Delivery Status', delivery.deliveryStatus],
                [
                    '15',
                    'Delivered Time',
                    delivery.deliveredDateTime
                        ? new Date(delivery.deliveredDateTime).toLocaleString()
                        : 'Ongoing',
                ],
            ],
            theme: 'grid', // Table theme
            headStyles: { fillColor: [46, 204, 113] }, // Green background for table headers
            bodyStyles: { textColor: [0, 0, 0] }, // Black text color for table body
        })
    }

    // Function to add footer
    const addFooter = (doc) => {
        // Add "Generated at" timestamp at the bottom
        const generatedAt = new Date().toLocaleString()
        doc.setFontSize(12)
        doc.text(
            `Generated at: ${generatedAt}`,
            14,
            doc.autoTable.previous.finalY + 20
        )

        // Add "Generated by" section at the bottom
        doc.text('Generated by:', 14, doc.autoTable.previous.finalY + 30)
        doc.text(
            `${driver?.firstName + ' ' + driver?.lastName}`, // Driver's full name
            14,
            doc.autoTable.previous.finalY + 35 // Positioning below "Generated by"
        )

        // Placeholder for signature
        doc.text(
            '__________________________',
            14,
            doc.autoTable.previous.finalY + 45
        )
        doc.text('Signature', 14, doc.autoTable.previous.finalY + 50)
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
                                            'Shop ContactNumber',
                                            delivery.shopPhone,
                                        ],
                                        ['Shop Email', delivery.shopEmail],
                                        [
                                            'Pickup Address',
                                            delivery.pickupAddress,
                                        ],
                                        [
                                            'Customer Name',
                                            delivery.customerName || 'N/A',
                                        ],
                                        [
                                            'Customer ContactNumber',
                                            delivery.customerNumber || 'N/A',
                                        ],
                                        [
                                            'Customer Email',
                                            delivery.customerEmail || 'N/A',
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
                                            className={`hover:bg-gray-100 cursor-pointer ${
                                                field === 'Pickup Address' ||
                                                field === 'Dropoff Address'
                                                    ? 'bg-green-200 font-bold'
                                                    : ''
                                            }`}
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
