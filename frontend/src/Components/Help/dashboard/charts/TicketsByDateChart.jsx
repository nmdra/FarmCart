import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import { useEffect, useState } from 'react'

const TicketsByDateChart = ({ tickets }) => {
    const [data, setData] = useState({
        labels: [],
        datasets: [],
    })

    useEffect(() => {
        const ticketCountByDate = {}

        tickets.forEach((ticket) => {
            const date = new Date(ticket.createdAt).toLocaleDateString()
            ticketCountByDate[date] = (ticketCountByDate[date] || 0) + 1
        })

        setData({
            labels: Object.keys(ticketCountByDate),
            datasets: [
                {
                    label: 'Tickets Created',
                    data: Object.values(ticketCountByDate),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
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
                Tickets Created Over Time
            </h2>
            <Bar data={data} options={{ responsive: true }} />
        </div>
    )
}

TicketsByDateChart.propTypes = {
    tickets: PropTypes.arrayOf(
        PropTypes.shape({
            createdAt: PropTypes.string.isRequired,
        })
    ).isRequired,
}

export default TicketsByDateChart
