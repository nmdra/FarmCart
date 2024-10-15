import { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import logo from '../../../../public/logoIcon.png' // Ensure this path is correct

const FeedbackDataViewTable = () => {
    const [feedbacks, setFeedbacks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [feedbacksPerPage] = useState(5) // Show 5 feedbacks per page
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await fetch(`/api/help/feedback`)
                if (!response.ok) {
                    throw new Error('Failed to fetch feedbacks')
                }
                const data = await response.json()
                setFeedbacks(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchFeedbacks()
    }, [])

    // Handle Pagination
    const indexOfLastFeedback = currentPage * feedbacksPerPage
    const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage
    const currentFeedbacks = feedbacks.slice(
        indexOfFirstFeedback,
        indexOfLastFeedback
    )
    const totalPages = Math.ceil(feedbacks.length / feedbacksPerPage)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    // Handle Search
    const filteredFeedbacks = currentFeedbacks.filter(
        (feedback) =>
            feedback.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feedback.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Generate PDF Report
    const generateReport = () => {
        const input = document.getElementById('table-to-pdf')

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF()

            // Load the logo and add it to the PDF
            const logoImage = new Image()
            logoImage.src = logo // Use the imported logo

            logoImage.onload = () => {
                pdf.addImage(logoImage, 'PNG', 10, 10, 50, 20) // Adjust position and size as needed

                const imgWidth = 190
                const pageHeight = pdf.internal.pageSize.height
                const imgHeight = (canvas.height * imgWidth) / canvas.width
                let heightLeft = imgHeight
                let position = 30 // Adjust to position below logo

                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
                heightLeft -= pageHeight

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight
                    pdf.addPage()
                    pdf.addImage(logoImage, 'PNG', 10, 10, 50, 20) // Add logo to each page
                    pdf.addImage(
                        imgData,
                        'PNG',
                        10,
                        position,
                        imgWidth,
                        imgHeight
                    )
                    heightLeft -= pageHeight
                }

                pdf.save('feedback_report.pdf')
            }

            logoImage.onerror = () => {
                console.error('Failed to load logo image.')
            }
        })
    }

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
                    placeholder="Search feedback"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    onClick={generateReport}
                    className="px-4 py-2 ml-4 text-black hover:text-wh bg-[#b8f724] rounded hover:#1e3201"
                >
                    Generate Report
                </button>
            </div>

            {/* Feedbacks Table */}
            <div className="p-3" id="table-to-pdf">
                <table className="min-w-full p-10 bg-white border border-gray-200 rounded-xl">
                    <thead className="bg-gray-200">
                        <tr>
                            {[
                                'Name',
                                'Email',
                                'Overall Experience',
                                'Response Time Satisfaction',
                                'Solution Satisfaction',
                                'Issue Resolved',
                                'Additional Comments',
                                'Recommend',
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
                        {filteredFeedbacks.map((feedback, index) => (
                            <tr
                                key={feedback._id}
                                className={`hover:bg-gray-100 ${
                                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                }`}
                            >
                                <td className="px-6 py-4 border-b border-gray-300">
                                    {feedback.name}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-300">
                                    {feedback.email}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-300">
                                    {feedback.overallExperience}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-300">
                                    {feedback.responseTimeSatisfaction}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-300">
                                    {feedback.solutionSatisfaction}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-300">
                                    {feedback.issueResolved}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-300">
                                    {feedback.additionalComments}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-300">
                                    {feedback.recommend}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-300">
                                    {new Date(
                                        feedback.createdAt
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
                        {indexOfFirstFeedback + 1}-{indexOfLastFeedback}
                    </span>{' '}
                    of{' '}
                    <span className="font-semibold text-gray-900">
                        {feedbacks.length}
                    </span>
                </span>

                {/* Pagination Buttons */}
                <div className="flex space-x-2">
                    <button
                        className="px-4 py-2 text-black bg-[#99dd05] rounded hover:[#75b100] disabled:opacity-50"
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
                        className="px-4 py-2 text-black bg-[#99dd05] rounded hover:bg-indigo-700 disabled:opacity-50"
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

export default FeedbackDataViewTable
