import PieChart from './charts/PieChart'
import { useEffect, useState } from 'react'
import axios from 'axios'

const FeedbackCharts = () => {
    const [feedbacks, setFeedbacks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get(`/api/help/feedback`)
                setFeedbacks(response.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchFeedbacks()
    }, [])

    const getCounts = (feedbacks, field) => {
        const counts = Array(5).fill(0)
        feedbacks.forEach((feedback) => {
            if (feedback[field]) {
                counts[feedback[field] - 1]++ // Increment count for the corresponding rating
            }
        })
        return counts
    }
    const overallExperienceCounts = getCounts(feedbacks, 'overallExperience')
    const responseTimeCounts = getCounts(feedbacks, 'responseTimeSatisfaction')
    const solutionSatisfactionCounts = getCounts(
        feedbacks,
        'solutionSatisfaction'
    )

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    return (
        <div>
            {/* Pie Charts */}
            <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3">
                <div>
                    <PieChart
                        data={overallExperienceCounts}
                        labels={[
                            '1 Star',
                            '2 Stars',
                            '3 Stars',
                            '4 Stars',
                            '5 Stars',
                        ]}
                        title="Overall Experience"
                    />
                </div>
                <div>
                    <PieChart
                        data={responseTimeCounts}
                        labels={[
                            '1 Star',
                            '2 Stars',
                            '3 Stars',
                            '4 Stars',
                            '5 Stars',
                        ]}
                        title="Response Time Satisfaction"
                    />
                </div>
                <div>
                    <PieChart
                        data={solutionSatisfactionCounts}
                        labels={[
                            '1 Star',
                            '2 Stars',
                            '3 Stars',
                            '4 Stars',
                            '5 Stars',
                        ]}
                        title="Solution Satisfaction"
                    />
                </div>
            </div>
        </div>
    )
}

export default FeedbackCharts
