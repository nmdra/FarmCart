import { useEffect, useState } from 'react'
// import html2canvas from 'html2canvas'
// import html2pdf from 'html2pdf.js'
// import jsPDF from 'jspdf'
// import logo from '../../../../public/logoIcon.png' // Make sure this path is correct

const SupportTicketFullViewTable = () => {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [ticketsPerPage] = useState(5) // Show 5 tickets per page
    const [searchTerm, setSearchTerm] = useState('')

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

    // Handle Pagination
    const indexOfLastTicket = currentPage * ticketsPerPage
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage
    const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket)
    const totalPages = Math.ceil(tickets.length / ticketsPerPage)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    // Handle Search
    const filteredTickets = currentTickets.filter(
        (ticket) =>
            ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )

    //Generate PDF
    // async function generatePDF() {
    //     const element = document.querySelector('#table-to-pdf')
    //     html2pdf(element)
    // }
    // Generate PDF Report
    // const generateReport = () => {
    //     const input = document.getElementById('table-to-pdf')

    //     html2canvas(input).then((canvas) => {
    //         const imgData = canvas.toDataURL('image/png')
    //         const pdf = new jsPDF()

    //         // Load the logo and add it to the PDF
    //         const logoImage = new Image()
    //         logoImage.src = logo // Use the imported logo

    //         logoImage.onload = () => {
    //             pdf.addImage(logoImage, 'PNG', 10, 10, 50, 20) // Adjust position and size as needed

    //             const imgWidth = 190
    //             const pageHeight = pdf.internal.pageSize.height
    //             const imgHeight = (canvas.height * imgWidth) / canvas.width
    //             let heightLeft = imgHeight
    //             let position = 30 // Adjust to position below logo

    //             pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
    //             heightLeft -= pageHeight

    //             while (heightLeft >= 0) {
    //                 position = heightLeft - imgHeight
    //                 pdf.addPage()
    //                 pdf.addImage(logoImage, 'PNG', 10, 10, 50, 50) // Add logo to each page
    //                 pdf.addImage(
    //                     imgData,
    //                     'PNG',
    //                     10,
    //                     position,
    //                     imgWidth,
    //                     imgHeight
    //                 )
    //                 heightLeft -= pageHeight
    //             }

    //             pdf.save('support_ticket_report.pdf')
    //         }

    //         logoImage.onerror = () => {
    //             console.error('Failed to load logo image.')
    //         }
    //     })
    // }

    // Loading and Error States
    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>
    }

    return (
        <div className="overflow-x-auto border rounded-lg">
            {/* Search Input */}
            <div className="flex items-center justify-between w-full p-3 py-4">
                <input
                    type="text"
                    className="px-4 py-2 border border-gray-300 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Search tickets"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <button
                    onClick={generateReport}
                    className="px-4 py-2 ml-4 text-white bg-indigo-600 rounded hover:bg-indigo-700"
                >
                    Generate Report
                </button> */}
                {/* <button
                    onClick={generatePDF}
                    className="px-4 py-2 ml-4 text-white bg-indigo-600 rounded hover:bg-indigo-700"
                >
                    Generate PDF
                </button> */}
            </div>

            {/* Tickets Table */}
            <div className="p-3 text-xs" id="table-to-pdf">
                <table className="min-w-full p-10 bg-white border border-gray-200 rounded-xl">
                    <thead className="bg-gray-200">
                        <tr>
                            {[
                                'Name',
                                'Email',
                                'Phone',
                                'Subject',
                                'Priority Level',
                                'Category',
                                'Description',
                                'Created At',
                            ].map((header) => (
                                <th
                                    key={header}
                                    className="px-6 py-4 font-semibold text-left text-gray-600 border-b border-gray-300"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTickets.map((ticket, index) => (
                            <tr
                                key={ticket._id}
                                className={`hover:bg-gray-100 ${
                                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                }`}
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
                                    {new Date(
                                        ticket.createdAt
                                    ).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Section */}
            <nav className="flex items-center justify-between p-4 border-t">
                <span className="text-sm font-normal text-gray-500">
                    Showing{' '}
                    <span className="font-semibold text-gray-900">
                        {indexOfFirstTicket + 1}-{indexOfLastTicket}
                    </span>{' '}
                    of{' '}
                    <span className="font-semibold text-gray-900">
                        {tickets.length}
                    </span>
                </span>

                {/* Pagination Buttons */}
                <div className="flex space-x-2">
                    <button
                        className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50"
                        disabled={currentPage === 1}
                        onClick={() => paginate(currentPage - 1)}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={`px-4 py-2 border rounded ${
                                currentPage === i + 1
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-indigo-600'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50"
                        disabled={currentPage === totalPages}
                        onClick={() => paginate(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default SupportTicketFullViewTable
