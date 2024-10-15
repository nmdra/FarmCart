import { useEffect, useState } from 'react'
import axios from 'axios'

const FeedbackOverviewTable = () => {
    const [feedbacks, setFeedbacks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get(`/api/help/feedback`) // Use the environment variable here
                setFeedbacks(response.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchFeedbacks()
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className="overflow-x-auto text-xs rounded-lg">
            <table className="min-w-full border border-collapse border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border border-gray-200">
                            Name
                        </th>
                        <th className="px-4 py-2 border border-gray-200">
                            Email
                        </th>
                        <th className="px-4 py-2 border border-gray-200">
                            Overall Experience
                        </th>
                        <th className="px-4 py-2 border border-gray-200">
                            Response Time Satisfaction
                        </th>
                        <th className="px-4 py-2 border border-gray-200">
                            Solution Satisfaction
                        </th>
                        <th className="px-4 py-2 border border-gray-200">
                            Issue Resolved
                        </th>
                        <th className="px-4 py-2 border border-gray-200">
                            Additional Comments
                        </th>
                        <th className="px-4 py-2 border border-gray-200">
                            Recommend
                        </th>
                        <th className="px-4 py-2 border border-gray-200">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((feedback) => (
                        <tr key={feedback._id}>
                            <td className="px-4 py-2 border border-gray-200">
                                {feedback.name || 'N/A'}
                            </td>
                            <td className="px-4 py-2 border border-gray-200">
                                {feedback.email || 'N/A'}
                            </td>
                            <td className="px-4 py-2 border border-gray-200">
                                {feedback.overallExperience}
                            </td>
                            <td className="px-4 py-2 border border-gray-200">
                                {feedback.responseTimeSatisfaction}
                            </td>
                            <td className="px-4 py-2 border border-gray-200">
                                {feedback.solutionSatisfaction}
                            </td>
                            <td className="px-4 py-2 border border-gray-200">
                                {feedback.issueResolved}
                            </td>
                            <td className="px-4 py-2 border border-gray-200">
                                {feedback.additionalComments || 'N/A'}
                            </td>
                            <td className="px-4 py-2 border border-gray-200">
                                {feedback.recommend}
                            </td>
                            <td className="px-4 py-2 border border-gray-200">
                                {new Date(
                                    feedback.createdAt
                                ).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FeedbackOverviewTable
