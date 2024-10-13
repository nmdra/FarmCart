import mongoose from 'mongoose'

const { Schema } = mongoose

const feedbackSchema = new Schema(
    {
        name: {
            type: String,
            required: false, // Optional field
        },
        email: {
            type: String,
            required: false, // Optional field
            lowercase: true, // Store email in lowercase
            trim: true, // Remove whitespace
        },
        overallExperience: {
            type: Number,
            required: true, // Required field for overall experience (1-5 stars)
            min: 1, // Minimum value
            max: 5, // Maximum value
        },
        responseTimeSatisfaction: {
            type: Number,
            required: true, // Required field for response time satisfaction (1-5 stars)
            min: 1, // Minimum value
            max: 5, // Maximum value
        },
        solutionSatisfaction: {
            type: Number,
            required: true, // Required field for solution satisfaction (1-5 stars)
            min: 1, // Minimum value
            max: 5, // Maximum value
        },
        issueResolved: {
            type: String,
            enum: ['Yes', 'No'], // Enum for specific values
            required: true, // Required field
        },
        additionalComments: {
            type: String,
            required: false, // Optional field for additional comments
        },
        recommend: {
            type: String,
            enum: ['Yes', 'No'], // Enum for specific values
            required: true, // Required field
        },
    },
    { timestamps: true }
) // Automatically add createdAt and updatedAt fields

// Create the model
const Feedback = mongoose.model('Feedback', feedbackSchema)

export default Feedback
