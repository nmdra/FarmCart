import { useEffect, useState } from 'react'
import axios from 'axios'
import jsPDFInvoiceTemplate, { OutputType } from 'jspdf-invoice-template'

import 'jspdf-autotable'
import farmcartLogo from '../../../../public/farmcart.svg'

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL

const SupportTicketsViewTable = () => {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/help/support-tickets/`
                )
                setTickets(response.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchTickets()
    }, [])

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const generatePDF = (order) => {
        const user = JSON.parse(localStorage.getItem('user'))
        const props = {
            outputType: OutputType.Save,
            returnJsPDFDocObject: true,
            fileName: `Invoice_${order._id}`,
            orientationLandscape: false,
            compress: true,
            logo: {
                src: farmcartLogo,
                type: 'PNG',
                width: 72,
                height: 12,
                margin: {
                    top: 0,
                    left: 0,
                },
            },
            stamp: {
                inAllPages: true,
                src: 'https://cdn.me-qr.com/qr/127374536.png?v=1727191883',
                type: 'PNG',
                width: 20,
                height: 20,
                margin: {
                    top: 0,
                    left: 0,
                },
            },
            business: {
                name: 'FarmCart Lanka (PVT.) LTD',
                address: 'No.78, Malabe, Colombo',
                phone: '(+94) 011 34 56 837',
                email: 'contact@farmcart.com',
                website: 'www.farmcart.com',
            },
            contact: {
                label: 'Invoice issued for:',
                name: `${user.firstname} ${user.lastname}`,
                address: `${user.defaultAddress.streetAddress}, ${user.defaultAddress.city}, ${user.defaultAddress.zipCode}`,
                phone: order.shippingAddress.phone,
            },
            invoice: {
                label: 'Invoice #: ',
                num: order._id.slice(-12),
                invDate: `Payment Date: ${new Date(order.createdAt).toLocaleDateString()}`,
                invGenDate: `Invoice Date: ${new Date().toLocaleDateString()}`,
                headerBorder: true,
                tableBodyBorder: true,
                header: [
                    { title: '#', style: { width: 10 } },
                    { title: 'Title', style: { width: 30 } },
                    { title: 'Price' },
                    { title: 'Quantity' },
                    { title: 'Unit' },
                    { title: 'Total' },
                ],
                table: order.orderItems.map((item, index) => [
                    index + 1,
                    item.name,
                    item.price.toFixed(2),
                    item.quantity,
                    'pcs', // Adjust unit as needed
                    (item.price * item.quantity).toFixed(2),
                ]),
                additionalRows: [
                    {
                        col1: 'Total:',
                        col2: `Rs.${order.totalPrice.toFixed(2)}`,
                        style: { fontSize: 14 },
                    },
                ],
                invDescLabel: 'Invoice Note',
                invDesc: 'Thank you for your order!',
            },
            footer: {
                text: 'The invoice is created on a computer and is valid without the signature and stamp.',
            },
            pageEnable: true,
            pageLabel: 'Page ',
        }

        // Create PDF and get the created PDF object
        const pdfCreated = jsPDFInvoiceTemplate(props)

        // Save the created PDF
        pdfCreated.jsPDFDocObject.save()
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    const filteredTickets = tickets.filter((ticket) =>
        ticket.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="overflow-x-auto">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="px-4 py-2 border rounded"
                />
            </div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Phone</th>
                        <th className="px-4 py-2 border">Subject</th>
                        <th className="px-4 py-2 border">Priority Level</th>
                        <th className="px-4 py-2 border">Category</th>
                        <th className="px-4 py-2 border">Description</th>
                        <th className="px-4 py-2 border">Created At</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTickets.map((ticket) => (
                        <tr key={ticket._id}>
                            <td className="px-4 py-2 border">{ticket.name}</td>
                            <td className="px-4 py-2 border">{ticket.email}</td>
                            <td className="px-4 py-2 border">{ticket.phone}</td>
                            <td className="px-4 py-2 border">
                                {ticket.subject}
                            </td>
                            <td className="px-4 py-2 border">
                                {ticket.priorityLevel}
                            </td>
                            <td className="px-4 py-2 border">
                                {ticket.category}
                            </td>
                            <td className="px-4 py-2 border">
                                {ticket.description}
                            </td>
                            <td className="px-4 py-2 border">
                                {new Date(ticket.createdAt).toLocaleString()}
                            </td>
                            <td className="px-4 py-2 border">
                                {/* Assuming each ticket has an associated order object */}
                                <button
                                    onClick={() => generatePDF(ticket.order)} // Adjust based on your data structure
                                    className="px-3 py-1 text-white transition duration-200 ease-in-out bg-green-500 rounded hover:bg-green-600"
                                >
                                    Download Receipt
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SupportTicketsViewTable
