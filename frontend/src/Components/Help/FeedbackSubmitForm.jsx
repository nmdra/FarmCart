import { useState } from 'react'
import axios from 'axios' // Make sure to install axios
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const FeedbackSubmitForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        overallExperience: '',
        responseTimeSatisfaction: '',
        solutionSatisfaction: '',
        issueResolved: '',
        additionalComments: '',
        recommend: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Send form data to your backend API
            const response = await axios.post(
                `/api/help/feedback`, // Corrected the backend route
                formData
            )
            toast.success('Feedback submitted successfully!')
            console.log('Feedback submitted successfully:', response.data)
            // Reset the form after successful submission
            setFormData({
                name: '',
                email: '',
                overallExperience: '',
                responseTimeSatisfaction: '',
                solutionSatisfaction: '',
                issueResolved: '',
                additionalComments: '',
                recommend: '',
            })
        } catch (error) {
            console.error('Error submitting feedback:', error)
            toast.error('Failed to submit feedback. Please try again.')
        }
    }

    return (
        <div className="max-w-lg p-4 mx-auto mt-10 bg-white border rounded-lg">
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                {/* Name (Optional) */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Email Address (Optional) */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Email Address:
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Rate Overall Experience (1-5 stars) */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Rate your overall experience:
                    </label>
                    <select
                        name="overallExperience"
                        value={formData.overallExperience}
                        onChange={handleChange}
                        required
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select rating</option>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <option key={star} value={star}>
                                {star} Star{star > 1 ? 's' : ''}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Satisfaction with Response Time (1-5 stars) */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        How satisfied were you with the response time?
                    </label>
                    <select
                        name="responseTimeSatisfaction"
                        value={formData.responseTimeSatisfaction}
                        onChange={handleChange}
                        required
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select rating</option>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <option key={star} value={star}>
                                {star} Star{star > 1 ? 's' : ''}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Satisfaction with Solution Provided (1-5 stars) */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        How satisfied were you with the solution provided?
                    </label>
                    <select
                        name="solutionSatisfaction"
                        value={formData.solutionSatisfaction}
                        onChange={handleChange}
                        required
                        className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select rating</option>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <option key={star} value={star}>
                                {star} Star{star > 1 ? 's' : ''}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Was your issue resolved? (Yes/No) */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Was your issue resolved?
                    </label>
                    <div className="flex items-center">
                        <label className="mr-4">
                            <input
                                type="radio"
                                name="issueResolved"
                                value="Yes"
                                onChange={handleChange}
                                required
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="issueResolved"
                                value="No"
                                onChange={handleChange}
                                required
                            />
                            No
                        </label>
                    </div>
                </div>

                {/* Additional Comments */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Additional Comments:
                    </label>
                    <textarea
                        name="additionalComments"
                        value={formData.additionalComments}
                        onChange={handleChange}
                        className="block w-full h-32 p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                {/* Would you recommend this service? (Yes/No) */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Would you recommend this service to others?
                    </label>
                    <div className="flex items-center">
                        <label className="mr-4">
                            <input
                                type="radio"
                                name="recommend"
                                value="Yes"
                                onChange={handleChange}
                                required
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="recommend"
                                value="No"
                                onChange={handleChange}
                                required
                            />
                            No
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 font-semibold text-black hover:text-white bg-[#b8f724] rounded-md hover:bg-[#1e3201] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    )
}

export default FeedbackSubmitForm
