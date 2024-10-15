import { useEffect, useState } from 'react'
import axios from 'axios'

const SupportTicketOverviewTable = () => {
    const [tickets, setTickets] = useState([]) // Initialize tickets as an empty array
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(`/api/help/support-tickets`)
                console.log('Fetched Tickets:', response.data) // Log fetched tickets
                setTickets(response.data)
            } catch (err) {
                console.error('Error fetching tickets:', err) // Log error details
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchTickets()
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className="overflow-x-auto text-xs rounded-lg">
            <table className="min-w-full border border-collapse border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border border-gray-200">
                            Name
                        </th>
                        <th className="px-4 py-2 border border-gray-200">
                            Email
                        </th>
                        <th className="px-4 py-2 border border-gray-200">
                            Phone
                        </th>
                        <th className="px-4 py-2 border border-gray-200">
                            Subject
                        </th>
                        <th className="px-4 py-2 border border-gray-200">
                            Priority Level
                        </th>
                        <th className="px-4 py-2 border border-gray-200">
                            Category
                        </th>
                        <th className="px-4 py-2 border border-gray-200">
                            Description
                        </th>
                        <th className="px-4 py-2 border border-gray-200">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(tickets) && tickets.length > 0 ? (
                        tickets.map((ticket) => (
                            <tr key={ticket._id}>
                                <td className="px-4 py-2 border border-gray-200">
                                    {ticket.name || 'N/A'}
                                </td>
                                <td className="px-4 py-2 border border-gray-200">
                                    {ticket.email || 'N/A'}
                                </td>
                                <td className="px-4 py-2 border border-gray-200">
                                    {ticket.phone || 'N/A'}
                                </td>
                                <td className="px-4 py-2 border border-gray-200">
                                    {ticket.subject || 'N/A'}
                                </td>
                                <td className="px-4 py-2 border border-gray-200">
                                    {ticket.priorityLevel}
                                </td>
                                <td className="px-4 py-2 border border-gray-200">
                                    {ticket.category}
                                </td>
                                <td className="px-4 py-2 border border-gray-200">
                                    {ticket.description || 'N/A'}
                                </td>
                                <td className="px-4 py-2 border border-gray-200">
                                    {new Date(
                                        ticket.createdAt
                                    ).toLocaleDateString()}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="8"
                                className="px-4 py-2 text-center border border-gray-200"
                            >
                                No tickets found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default SupportTicketOverviewTable
