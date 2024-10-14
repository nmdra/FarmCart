import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../Components/Admin/AsideBar.jsx'
import { Button } from '@nextui-org/react'
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const ManageShopIncome = () => {
    const navigate = useNavigate()
    const [shopIncomeData, setShopIncomeData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOrder, setSortOrder] = useState('asc')
    const [taxRate, setTaxRate] = useState(20)
    const [paymentStatus, setPaymentStatus] = useState({}) // State to store payment statuses

    // Function to fetch shop income data
    const fetchShopIncomeData = async () => {
        try {
            const response = await axios.get('/api/orders/shop-total-income') // Adjust endpoint as necessary
            setShopIncomeData(response.data)
            // Initialize payment statuses with default values (e.g., 'Pending')
            const initialStatus = {}
            response.data.forEach((shop) => {
                initialStatus[shop.shopId] = 'Pending' // Default to 'Pending'
            })
            setPaymentStatus(initialStatus)
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

    // Sort the shop income data based on total income
    const handleSort = () => {
        const sortedData = [...shopIncomeData].sort((a, b) => {
            return sortOrder === 'asc'
                ? a.totalIncome - b.totalIncome
                : b.totalIncome - a.totalIncome
        })
        setShopIncomeData(sortedData)
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    }

    const generatePDF = () => {
        const doc = new jsPDF()
        const title = 'Shop Income Report'

        // Set font size and style for title
        doc.setFontSize(16)
        doc.text(title, 14, 16)

        // Create the table
        doc.autoTable({
            head: [
                [
                    'Shop Name',
                    'Owner Name',
                    'Total Income',
                    `Tax (${taxRate}%)`,
                    'Final Shop Income',
                    'FarmCart Company Income',
                    'Payment Status', // New header for payment status
                ],
            ],
            body: shopIncomeData
                .filter((shop) =>
                    shop.shopName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                )
                .map((shop) => {
                    const tax = (shop.totalIncome * (taxRate / 100)).toFixed(2)
                    const finalIncome = (shop.totalIncome - tax).toFixed(2)
                    const farmCartIncome = tax // FarmCart company income is the same as the tax amount
                    return [
                        shop.shopName,
                        shop.ownerName,
                        `Rs. ${shop.totalIncome.toFixed(2)}`,
                        `Rs. ${tax}`,
                        `Rs. ${finalIncome}`,
                        `Rs. ${farmCartIncome}`,
                        paymentStatus[shop.shopId], // Add payment status to the PDF
                    ]
                }),
            margin: { top: 24 },
            styles: {
                fontSize: 10,
                cellPadding: 5,
                halign: 'left',
                valign: 'middle',
            },
            headStyles: {
                fillColor: [22, 160, 133],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
            },
            theme: 'striped',
        })

        doc.save('shop_income_report.pdf')
    }

    // Filter data based on search term
    const filteredData = shopIncomeData.filter((shop) =>
        shop.shopName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Handle payment status button click
    const handlePaymentStatusChange = (shopId, status) => {
        setPaymentStatus((prevStatus) => ({
            ...prevStatus,
            [shopId]: status, // Update the payment status for the specific shop
        }))

        // Optionally, send the new payment status to the backend
        axios
            .post('/api/payment-status', { shopId, status })
            .then((response) => console.log('Payment status updated', response))
            .catch((err) => console.error('Error updating payment status', err))
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="flex flex-1 mt-16">
                <aside className="fixed top-0 left-0 bottom-0 w-64 bg-gray-50 shadow-md pl-8 pt-16">
                    <Sidebar />
                </aside>

                <main className="flex-1 ml-64 p-24 pt-8 overflow-y-auto">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-center">
                            Manage Shop Income
                        </h1>
                    </header>

                    <div className="flex items-center justify-center space-x-2 mt-10 mb-4">
                        <input
                            type="text"
                            placeholder="Search by shop name..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="border p-2 w-1/4 rounded-md shadow-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="number"
                            placeholder="Enter Tax Rate"
                            value={taxRate}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value)
                                if (!isNaN(value) && value >= 0) {
                                    setTaxRate(value)
                                }
                            }}
                            className="border p-2 w-1/12 rounded-md shadow-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <p className="text-gray-500 text-sm mt-1">
                            {' '}
                            Adjust the tax rate
                        </p>

                        <Button
                            onClick={() => navigate('/finance')}
                            className="bg-blue-500 text-white"
                        >
                            Back to Income Page
                        </Button>

                        <Button onClick={handleSort} className="bg-gray-200">
                            Sort Income{' '}
                            {sortOrder === 'asc'
                                ? 'Low to High'
                                : 'High to Low'}
                        </Button>

                        <Button
                            onClick={generatePDF}
                            className="bg-green-500 text-white"
                        >
                            Monthly Payment Report
                        </Button>
                    </div>

                    <div className="flex flex-col">
                        {loading ? (
                            <div className="text-center">Loading...</div>
                        ) : error ? (
                            <div className="text-center text-red-500">
                                Error: {error}
                            </div>
                        ) : (
                            <table className="min-w-full border-collapse border border-gray-200 mt-4">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-200 p-2 text-left">
                                            Shop Name
                                        </th>
                                        <th className="border border-gray-200 p-2 text-left">
                                            Owner Name
                                        </th>
                                        <th className="border border-gray-200 p-2 text-left">
                                            Total Income
                                        </th>
                                        <th className="border border-gray-200 p-2 text-left">
                                            FarmCart Tax ({taxRate}%)
                                        </th>
                                        <th className="border border-gray-200 p-2 text-left">
                                            Final Shop Income
                                        </th>
                                        <th className="border border-gray-200 p-2 text-left">
                                            FarmCart Income
                                        </th>
                                        <th className="border border-gray-200 p-2 text-left">
                                            Payment Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((shop) => {
                                        const tax = (
                                            shop.totalIncome *
                                            (taxRate / 100)
                                        ).toFixed(2)
                                        const finalIncome = (
                                            shop.totalIncome - tax
                                        ).toFixed(2)

                                        // Debugging: Log values to check calculations
                                        console.log(
                                            `Shop: ${shop.shopName}, Total Income: ${shop.totalIncome}, Tax: ${tax}, Final Income: ${finalIncome}`
                                        )

                                        return (
                                            <tr key={shop.shopId}>
                                                <td className="border border-gray-200 p-2">
                                                    {shop.shopName}
                                                </td>
                                                <td className="border border-gray-200 p-2">
                                                    {shop.ownerName}
                                                </td>
                                                <td className="border border-gray-200 p-2">
                                                    Rs.
                                                    {shop.totalIncome.toFixed(
                                                        2
                                                    )}
                                                </td>
                                                <td className="border border-gray-200 p-2">
                                                    Rs.{tax}
                                                </td>
                                                <td className="border border-gray-200 p-2">
                                                    Rs.{finalIncome}
                                                </td>
                                                <td className="border border-gray-200 p-2">
                                                    Rs.{tax}
                                                </td>
                                                <td className="border border-gray-200 p-2 flex space-x-2">
                                                    <Button
                                                        className={`${
                                                            paymentStatus[
                                                                shop.shopId
                                                            ] === 'Pending'
                                                                ? 'bg-yellow-500'
                                                                : 'bg-gray-300'
                                                        } text-white`}
                                                        onClick={() =>
                                                            handlePaymentStatusChange(
                                                                shop.shopId,
                                                                'Pending'
                                                            )
                                                        }
                                                    >
                                                        Pending
                                                    </Button>
                                                    <Button
                                                        className={`${
                                                            paymentStatus[
                                                                shop.shopId
                                                            ] === 'Paid'
                                                                ? 'bg-green-500'
                                                                : 'bg-gray-300'
                                                        } text-white`}
                                                        onClick={() =>
                                                            handlePaymentStatusChange(
                                                                shop.shopId,
                                                                'Paid'
                                                            )
                                                        }
                                                    >
                                                        Paid
                                                    </Button>
                                                    <Button
                                                        className={`${
                                                            paymentStatus[
                                                                shop.shopId
                                                            ] === 'Declined'
                                                                ? 'bg-red-500'
                                                                : 'bg-gray-300'
                                                        } text-white`}
                                                        onClick={() =>
                                                            handlePaymentStatusChange(
                                                                shop.shopId,
                                                                'Declined'
                                                            )
                                                        }
                                                    >
                                                        Declined
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ManageShopIncome
