import express from 'express'
import {
    createFeedback,
    getFeedback,
    deleteFeedback,
} from '../../controllers/Help/feedback.controller.js' // Adjust the path based on your controllers

const router = express.Router()

// Route for creating new feedback
router.post('/', createFeedback)

// Route for fetching all feedback (optional)
router.get('/', getFeedback)

// Route for deleting feedback by ID (optional)
router.delete('/:id', deleteFeedback)

export default router
