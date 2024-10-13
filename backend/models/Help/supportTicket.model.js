import mongoose from 'mongoose'

const { Schema } = mongoose

const supportTicketSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true, // Store email in lowercase
        trim: true, // Remove whitespace
    },
    phone: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    priorityLevel: {
        type: String,
        enum: ['low', 'medium', 'high'], // Enum for specific values
        required: true,
    },
    category: {
        type: String,
        enum: ['technical', 'billing', 'general'], // Enum for specific values
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the created date
    },
})

// Create the model
const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema)

export default SupportTicket
