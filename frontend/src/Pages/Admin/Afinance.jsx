import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../Components/Admin/AsideBar.jsx'
import { Button } from '@nextui-org/react'
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const Finance = () => {
    const navigate = useNavigate()
    const [incomeData, setIncomeData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOrder, setSortOrder] = useState('asc') // 'asc' for ascending, 'desc' for descending

    // Function to fetch shop income data
    const fetchShopIncomeData = async () => {
        try {
            const response = await axios.get('/api/orders/shop-total-income')
            setIncomeData(response.data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchShopIncomeData()
    }, [])

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    // Sort the income data based on total income
    const handleSort = () => {
        const sortedData = [...incomeData].sort((a, b) => {
            return sortOrder === 'asc'
                ? a.totalIncome - b.totalIncome
                : b.totalIncome - a.totalIncome
        })
        setIncomeData(sortedData)
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    }

    // Generate PDF report
    const generatePDF = () => {
        const doc = new jsPDF()
        const title = 'Shop Income Report'

        // Set font size and style for title
        doc.setFontSize(16)
        doc.text(title, 14, 16)

        // Set font size for table headers
        doc.setFontSize(12)

        // Create the table
        doc.autoTable({
            head: [['Shop Name', 'Owner Name', 'Total Income']],
            body: incomeData
                .filter((shop) =>
                    shop.shopName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                )
                .map((shop) => [
                    shop.shopName,
                    shop.ownerName,
                    `Rs. ${shop.totalIncome.toFixed(2)}`,
                ]),
            margin: { top: 24 }, // Margin from the top
            styles: {
                fontSize: 10,
                cellPadding: 5,
                halign: 'left', // Align text to the right in cells
                valign: 'middle', // Vertically center the text
            },
            headStyles: {
                fillColor: [22, 160, 133], // Header background color
                textColor: [255, 255, 255], // Header text color
                fontStyle: 'bold', // Bold font style for headers
            },
            theme: 'striped', // Use striped theme for better readability
        })

        doc.save('shop_monthly_payment_report.pdf')
    }

    // Filter data based on search term
    const filteredData = incomeData.filter((shop) =>
        shop.shopName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="flex flex-1 mt-16">
                <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16">
                    <Sidebar />
                </aside>

                <main className="flex-1 ml-64 p-24 pt-8 overflow-y-auto">
                    <header>
                        <h1 className="text-3xl font-bold  text-center">
                            Shop Income Report
                        </h1>
                    </header>

                    {/* Container for search field, buttons */}
                    <div className="flex items-center justify-center space-x-2 mt-10 mb-4">
                        {/* Search Bar */}
                        <input
                            type="text"
                            placeholder="Search by shop name..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="border p-2 w-1/4 rounded-md shadow-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" // Adjusted classes
                        />

                        {/* Button to Manage Shop Income */}
                        <Button
                            onClick={() => navigate('/manage-shop-income')}
                            className="bg-blue-500 text-white"
                        >
                            Manage Shop Income
                        </Button>

                        {/* Sort Button */}
                        <Button onClick={handleSort} className="bg-gray-200">
                            Sort Income{' '}
                            {sortOrder === 'asc'
                                ? 'Low to High'
                                : 'High to Low'}
                        </Button>

                        {/* Download PDF Button */}
                        <Button
                            onClick={generatePDF}
                            className="bg-green-500 text-white"
                        >
                            Shops Income Report
                        </Button>
                    </div>

                    {/* Added margin to separate buttons and table */}
                    <div className="mt-6">
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>Error: {error}</div>
                        ) : (
                            <table className="min-w-full border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-200 p-2">
                                            Shop Name
                                        </th>
                                        <th className="border border-gray-200 p-2">
                                            Owner Name
                                        </th>
                                        <th className="border border-gray-200 p-2">
                                            Total Income
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((shop) => (
                                        <tr key={shop.shopId}>
                                            <td className="border border-gray-200 p-2">
                                                {shop.shopName}
                                            </td>
                                            <td className="border border-gray-200 p-2">
                                                {shop.ownerName}
                                            </td>
                                            <td className="border border-gray-200 p-2">
                                                Rs.{shop.totalIncome.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Finance
