import { Router } from 'express'
import Blog from '../models/Blog.js' // Blog model

const router = Router()

// Function to validate required fields with enhanced rules
const validateBlogFields = (title, content, author) => {
    const errors = {}

    if (!title) {
        errors.title = 'Title is required.'
    } else if (title.length < 5) {
        errors.title = 'Title must be at least 5 characters long.'
    }

    if (!content) {
        errors.content = 'Content is required.'
    } else if (content.length < 10) {
        errors.content = 'Content must be at least 10 characters long.'
    }

    if (!author) {
        errors.author = 'Author is required.'
    } else if (author.trim().length === 0) {
        errors.author = 'Author name cannot be empty.'
    }

    return errors
}

// Route to add a new blog post
router.post('/add', async (req, res) => {
    try {
        const { title, content, author, newsImage } = req.body

        // Validate required fields
        const errors = validateBlogFields(title, content, author)
        if (Object.keys(errors).length) {
            // Return a structured response showing all validation errors
            return res.status(400).json({
                message: 'Validation failed. Please fix the errors below.',
                errors,
            })
        }

        const newBlog = new Blog({
            title,
            content,
            author,
            newsImage,
            createdAt: Date.now(), // Set createdAt timestamp
            updatedAt: Date.now(), // Set updatedAt timestamp
        })

        await newBlog.save()
        res.status(201).json({
            message: 'Blog post created successfully',
            newBlog,
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Route to get all blog posts
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find()
        res.status(200).json(blogs)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Route to get a blog post by ID
router.get('/get/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (blog) {
            res.status(200).json(blog)
        } else {
            res.status(404).json({ message: 'Blog post not found' })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Route to update an existing blog post
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params // Get the blog post ID from the request parameters
        const { title, content, author, newsImage } = req.body // Extract the updated fields from the request body

        // Validate required fields
        const errors = validateBlogFields(title, content, author)
        if (Object.keys(errors).length) {
            // Return a structured response showing all validation errors
            return res.status(400).json({
                message: 'Validation failed. Please fix the errors below.',
                errors,
            })
        }

        // Find the blog post by ID and update it
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            {
                title,
                content,
                author,
                newsImage,
                updatedAt: Date.now(), // Update the timestamp
            },
            { new: true } // Return the updated document
        )

        // If the blog post is not found, return a 404 error
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog post not found' })
        }

        res.status(200).json({
            message: 'Blog post updated successfully',
            updatedBlog,
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Route to delete a blog post by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const blogToDelete = await Blog.findById(req.params.id)

        if (!blogToDelete) {
            return res.status(404).json({ message: 'Blog post not found' })
        }

        await Blog.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Blog post deleted successfully' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router
