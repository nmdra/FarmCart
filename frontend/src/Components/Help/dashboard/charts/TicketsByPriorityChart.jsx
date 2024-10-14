import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import { useEffect, useState } from 'react'

const TicketsByPriorityChart = ({ tickets }) => {
    const [data, setData] = useState({
        labels: [],
        datasets: [],
    })

    useEffect(() => {
        const ticketCountByPriority = {}

        tickets.forEach((ticket) => {
            const priority = ticket.priorityLevel
            ticketCountByPriority[priority] =
                (ticketCountByPriority[priority] || 0) + 1
        })

        setData({
            labels: Object.keys(ticketCountByPriority),
            datasets: [
                {
                    label: 'Tickets by Priority',
                    data: Object.values(ticketCountByPriority),
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        })
    }, [tickets])

    // Check if data is valid before rendering
    if (!data.labels.length) {
        return (
            <p className="text-center text-gray-500">
                No ticket data available.
            </p>
        )
    }

    return (
        <div className="w-full">
            <h2 className="mb-4 text-lg font-semibold">
                Tickets by Priority Level
            </h2>
            <Bar data={data} options={{ responsive: true }} />
        </div>
    )
}

TicketsByPriorityChart.propTypes = {
    tickets: PropTypes.arrayOf(
        PropTypes.shape({
            priorityLevel: PropTypes.string.isRequired,
        })
    ).isRequired,
}

export default TicketsByPriorityChart
