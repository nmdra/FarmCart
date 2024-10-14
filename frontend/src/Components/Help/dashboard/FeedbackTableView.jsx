import { useEffect, useState } from 'react'
import axios from 'axios'

const FeedbackTableView = () => {
    const [feedbacks, setFeedbacks] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/help/feedback`
                ) // Adjusted endpoint
                setFeedbacks(response.data)
            } catch (error) {
                console.error('Error fetching feedbacks:', error)
            }
        }

        fetchFeedbacks()
    }, [])

    const filteredFeedbacks = feedbacks.filter(
        (feedback) =>
            feedback.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feedback.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-4">
            <h2 className="mb-4 text-2xl font-bold">Feedback Table</h2>
            <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mb-4 border"
            />
            <table className="min-w-full border border-collapse border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border border-gray-300">
                            Name
                        </th>
                        <th className="px-4 py-2 border border-gray-300">
                            Email
                        </th>
                        <th className="px-4 py-2 border border-gray-300">
                            Overall Experience
                        </th>
                        <th className="px-4 py-2 border border-gray-300">
                            Response Time Satisfaction
                        </th>
                        <th className="px-4 py-2 border border-gray-300">
                            Solution Satisfaction
                        </th>
                        <th className="px-4 py-2 border border-gray-300">
                            Issue Resolved
                        </th>
                        <th className="px-4 py-2 border border-gray-300">
                            Additional Comments
                        </th>
                        <th className="px-4 py-2 border border-gray-300">
                            Recommend
                        </th>
                        <th className="px-4 py-2 border border-gray-300">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFeedbacks.length > 0 ? (
                        filteredFeedbacks.map((feedback) => (
                            <tr key={feedback._id}>
                                <td className="px-4 py-2 border border-gray-300">
                                    {feedback.name || 'N/A'}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {feedback.email || 'N/A'}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {feedback.overallExperience}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {feedback.responseTimeSatisfaction}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {feedback.solutionSatisfaction}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {feedback.issueResolved}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {feedback.additionalComments || 'N/A'}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {feedback.recommend}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {new Date(
                                        feedback.createdAt
                                    ).toLocaleDateString()}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="9"
                                className="px-4 py-2 text-center border border-gray-300"
                            >
                                No feedback available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default FeedbackTableView
