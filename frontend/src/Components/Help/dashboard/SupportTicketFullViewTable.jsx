import { useEffect, useState } from 'react'

const SupportTicketFullViewTable = () => {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/help/support-tickets`
                )
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

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-6 py-4 font-semibold text-left text-gray-600 border-b border-gray-300">
                            Name
                        </th>
                        <th className="px-6 py-4 font-semibold text-left text-gray-600 border-b border-gray-300">
                            Email
                        </th>
                        <th className="px-6 py-4 font-semibold text-left text-gray-600 border-b border-gray-300">
                            Phone
                        </th>
                        <th className="px-6 py-4 font-semibold text-left text-gray-600 border-b border-gray-300">
                            Subject
                        </th>
                        <th className="px-6 py-4 font-semibold text-left text-gray-600 border-b border-gray-300">
                            Priority Level
                        </th>
                        <th className="px-6 py-4 font-semibold text-left text-gray-600 border-b border-gray-300">
                            Category
                        </th>
                        <th className="px-6 py-4 font-semibold text-left text-gray-600 border-b border-gray-300">
                            Description
                        </th>
                        <th className="px-6 py-4 font-semibold text-left text-gray-600 border-b border-gray-300">
                            Created At
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket, index) => (
                        <tr
                            key={ticket._id}
                            className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                        >
                            <td className="px-6 py-4 border-b border-gray-300">
                                {ticket.name}
                            </td>
                            <td className="px-6 py-4 border-b border-gray-300">
                                {ticket.email}
                            </td>
                            <td className="px-6 py-4 border-b border-gray-300">
                                {ticket.phone}
                            </td>
                            <td className="px-6 py-4 border-b border-gray-300">
                                {ticket.subject}
                            </td>
                            <td className="px-6 py-4 border-b border-gray-300">
                                {ticket.priorityLevel}
                            </td>
                            <td className="px-6 py-4 border-b border-gray-300">
                                {ticket.category}
                            </td>
                            <td className="px-6 py-4 border-b border-gray-300">
                                {ticket.description}
                            </td>
                            <td className="px-6 py-4 border-b border-gray-300">
                                {new Date(ticket.createdAt).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SupportTicketFullViewTable
