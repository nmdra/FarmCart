import { useEffect, useState } from 'react'
import TicketsByDateChart from './charts/TicketsByDateChart'
import TicketsByPriorityChart from './charts/TicketsByPriorityChart'
import TicketsByCategoryChart from './charts/TicketsByCategoryChart'

const SupportTicketCharts = () => {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>
    }
    return (
        <div className="mx-auto max-w-7xl">
            <div className="grid items-center grid-cols-3 gap-6 mt-8">
                <div>
                    <TicketsByDateChart tickets={tickets} />
                </div>
                <div>
                    <TicketsByPriorityChart tickets={tickets} />
                </div>
                <div>
                    <TicketsByCategoryChart tickets={tickets} />
                </div>
            </div>
        </div>
    )
}

export default SupportTicketCharts
