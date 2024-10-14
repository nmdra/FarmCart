import { useEffect, useRef } from 'react'
import { Chart } from 'chart.js'
import PropTypes from 'prop-types'

const PieChart = ({ data, labels, title, width = 300, height = 300 }) => {
    const chartRef = useRef(null) // Create a ref to store the chart instance

    useEffect(() => {
        // Destroy the previous chart instance if it exists
        if (chartRef.current) {
            chartRef.current.destroy()
        }

        const ctx = document.getElementById(title).getContext('2d')
        chartRef.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                            '#9966FF',
                        ],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: title,
                    },
                },
            },
        })

        // Cleanup function to destroy the chart instance on unmount
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy()
            }
        }
    }, [data, labels, title])

    return (
        <canvas
            id={title}
            width={width}
            height={height}
            className="w-full"
        ></canvas>
    )
}

// PropTypes validation
PieChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
}

export default PieChart
