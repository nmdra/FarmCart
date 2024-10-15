// SupportTicketPDFView.js
import { useEffect, useState } from 'react'
import PDFGenerator from '../../Components/Help/dashboard/PDFGenerator' // Adjust the import path as needed
import logo from '../../../public/LogoMain.png'
import SupportTicketCharts from '../../Components/Help/dashboard/SupportTicketCharts'

const SupportTicketPDFView = () => {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch(`/api/help/support-tickets`)
                if (!response.ok) {
                    throw new Error('Failed to fetch tickets')
                }
                const data = await response.json()
                setTickets(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchTickets()
    }, [])

    // Handle Search
    const filteredTickets = tickets.filter(
        (ticket) =>
            ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Loading and Error States
    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>
    }

    return (
        <div className="py-10 ">
            <PDFGenerator
                title="FarmCart Support Tickets"
                logoSrc={logo}
                additionalInfo={[
                    'Company Name: FarmCart',
                    'Address: 123 FarmCart Lane, Green Valley, TX 76543',
                    'Phone: +1 (555) 123-4567',
                    'Email: support@farmcart.com',
                ]}
            >
                {/* Search Input */}
                <div
                    className="flex items-center justify-between w-full p-3 py-4"
                    data-html2canvas-ignore
                >
                    <input
                        type="text"
                        className="px-4 py-2 border border-gray-300 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Search tickets"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Tickets Cards View */}
                <div>
                    {filteredTickets.map((ticket) => (
                        <div
                            key={ticket._id}
                            className="p-4 mb-4 bg-white border border-gray-300 rounded-lg shadow-md"
                        >
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">
                                {ticket.subject} - <span>{ticket.name}</span>
                            </h3>
                            <p className="text-gray-700">
                                Email: {ticket.email}
                            </p>
                            <p className="text-gray-700">
                                Phone: {ticket.phone}
                            </p>
                            <p className="text-gray-700">
                                Category: {ticket.category}
                            </p>
                            <p className="text-gray-700">
                                Priority: {ticket.priorityLevel}
                            </p>
                            <p className="text-gray-700">
                                Description: {ticket.description}
                            </p>
                            <p className="text-gray-500">
                                Created At:{' '}
                                {new Date(ticket.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
                <SupportTicketCharts />
                <div className="mt-10 invoice-footer">
                    <hr className="border-gray-300" />
                    <p className="mt-2 text-sm text-gray-600">
                        Thank you for your business! If you have any questions
                        about this invoice, please contact us at
                        support@farmcart.com or call +1 (555) 123-4567.
                    </p>
                </div>
            </PDFGenerator>
        </div>
    )
}

export default SupportTicketPDFView
