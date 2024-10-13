import Feedback from '../../models/Help/feedback.model.js' // Adjust the path as necessary

// Create a new feedback entry
export const createFeedback = async (req, res) => {
    try {
        const feedback = new Feedback(req.body)
        await feedback.save()
        res.status(201).json({
            message: 'Feedback submitted successfully!',
            feedback,
        })
    } catch (error) {
        res.status(400).json({
            message: 'Error submitting feedback',
            error: error.message,
        })
    }
}

// Get all feedback entries
export const getFeedback = async (req, res) => {
    try {
        const feedbackList = await Feedback.find() // Fetch all feedback from the database
        res.status(200).json(feedbackList)
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching feedback',
            error: error.message,
        })
    }
}

// Optionally, you can implement a method to delete feedback if needed
export const deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id)
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' })
        }
        res.status(200).json({ message: 'Feedback deleted successfully!' })
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting feedback',
            error: error.message,
        })
    }
}

// You can add more controller functions here if needed
