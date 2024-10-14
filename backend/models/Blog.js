import mongoose from 'mongoose'

// Define blog schema with timestamps
const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 100,
        },
        content: {
            type: String,
            required: true,
            minlength: 5,
        },
        author: {
            type: String,
            required: true,
        },
        newsImage: {
            type: String,
        },
    },
    { timestamps: true }
) // Automatically adds createdAt and updatedAt fields

const Blog = mongoose.model('Blog', blogSchema)
export default Blog
