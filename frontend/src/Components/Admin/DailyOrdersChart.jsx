import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import farmcartLogo from '../../assets/logo.png'
import 'chart.js/auto' // Importing chart.js

const DailyOrdersChart = () => {
    const [chartData, setChartData] = useState({})
    const chartRef = useRef(null) // Reference to capture the chart instance

    useEffect(() => {
        const fetchDailyOrders = async () => {
            try {
                const { data } = await axios.get('/api/orders/daily-orders')

                const dates = data.map((order) => order._id)
                const totalOrders = data.map((order) => order.totalOrders)
                const totalSales = data.map((order) => order.totalSales)

                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Total Orders',
                            data: totalOrders,
                            borderColor: 'rgba(34, 197, 94, 1)', // Tailwind Green (Accent color)
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            fill: true,
                            tension: 0.8,
                        },
                        {
                            label: 'Total Sales (Rs)',
                            data: totalSales,
                            borderColor: 'rgba(16, 185, 129, 1)',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            fill: true,
                            tension: 0.8,
                        },
                    ],
                })
            } catch (error) {
                console.error('Error fetching daily orders', error)
            }
        }

        fetchDailyOrders()
    }, [])

    // Function to download the chart as a PNG image with a white background and a logo
    const downloadChart = () => {
        const chartInstance = chartRef.current

        if (chartInstance) {
            const canvas = chartInstance.canvas // Get the chart canvas
            const imageData = canvas.toDataURL('image/png') // Get chart image as PNG

            // Create a new canvas to add the white background and the logo
            const newCanvas = document.createElement('canvas')
            newCanvas.width = canvas.width
            newCanvas.height = canvas.height

            const ctx = newCanvas.getContext('2d')

            // Fill the new canvas with a white background
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, newCanvas.width, newCanvas.height)

            // Draw the original chart on top of the white background
            const img = new Image()
            img.src = imageData
            img.onload = () => {
                ctx.drawImage(img, 0, 0) // Draw the chart image

                // Now load the logo and add it to the canvas
                const logo = new Image()
                logo.src = farmcartLogo // Replace this with the path or URL of your logo
                console.log(logo.src)
                logo.onload = () => {
                    // Draw the logo at the bottom-right corner of the chart
                    const logoWidth = 150 // Width of the logo
                    const logoHeight = 50 // Height of the logo
                    const xPosition = newCanvas.width - logoWidth - 10 // 10px padding from right
                    const yPosition = 10 // 10px padding from bottom

                    ctx.drawImage(
                        logo,
                        xPosition,
                        yPosition,
                        logoWidth,
                        logoHeight
                    ) // Draw logo

                    // Convert the new canvas with white background and logo to PNG
                    const newDataUrl = newCanvas.toDataURL('image/png')

                    // Trigger download
                    const link = document.createElement('a')
                    link.href = newDataUrl
                    link.download = 'daily-orders-chart.png' // Set the filename
                    link.click() // Programmatically trigger the download
                }
            }
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
            <h2 className="text-2xl font-bold text-black mb-6">Daily Orders</h2>
            {chartData.labels ? (
                <>
                    <Line data={chartData} ref={chartRef} id="bidStatus" />
                    <button
                        onClick={downloadChart}
                        className="mt-6 px-6 py-2 ml-0 border-2 rounded-full border-[#99DD05] text-grey font-semibold flex items-center gap-2 hover:bg-[#f5fce6] hover:text-black transition-all"
                    >
                        Download Chart as PNG
                    </button>
                </>
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    )
}

export default DailyOrdersChart
