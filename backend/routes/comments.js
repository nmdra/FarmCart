// routes/commentRoutes.js

import { Router } from 'express'
import Comment from '../models/Comment.js'

const router = Router()

// Route to add a new comment
router.post('/add', async (req, res) => {
    const { blogId, name, comment } = req.body
    try {
        const newComment = new Comment({ blogId, name, comment })
        await newComment.save()
        res.status(200).json(newComment)
    } catch (err) {
        res.status(500).json({ message: 'Failed to add comment', error: err })
    }
})

// Route to get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 })
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json({ message: 'Failed to get comments', error: err })
    }
})

// Route to get comments by blog ID
router.get('/:blogId', async (req, res) => {
    const { blogId } = req.params
    try {
        const comments = await Comment.find({ blogId }).sort({ createdAt: -1 })
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json({ message: 'Failed to get comments', error: err })
    }
})

// Route to delete a comment by ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deletedComment = await Comment.findByIdAndDelete(id)
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' })
        }
        res.status(200).json({
            message: 'Comment deleted successfully',
            deletedComment,
        })
    } catch (err) {
        res.status(500).json({
            message: 'Failed to delete comment',
            error: err,
        })
    }
})

export default router
