import PropTypes from 'prop-types'
import { Bar } from 'react-chartjs-2'
import { useEffect, useState } from 'react'

const TicketsByCategoryChart = ({ tickets }) => {
    const [data, setData] = useState({
        labels: [],
        datasets: [],
    })

    useEffect(() => {
        const ticketCountByCategory = {}

        tickets.forEach((ticket) => {
            const category = ticket.category
            ticketCountByCategory[category] =
                (ticketCountByCategory[category] || 0) + 1
        })

        setData({
            labels: Object.keys(ticketCountByCategory),
            datasets: [
                {
                    label: 'Tickets by Category',
                    data: Object.values(ticketCountByCategory),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
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
            <h2 className="mb-4 text-lg font-semibold">Tickets by Category</h2>
            <Bar data={data} options={{ responsive: true }} />
        </div>
    )
}

TicketsByCategoryChart.propTypes = {
    tickets: PropTypes.arrayOf(
        PropTypes.shape({
            category: PropTypes.string.isRequired,
        })
    ).isRequired,
}

export default TicketsByCategoryChart
