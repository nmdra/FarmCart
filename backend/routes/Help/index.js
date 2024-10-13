import express from 'express'

import feedbackRoutes from './feedback.route.js' // Feedback routes

const router = express.Router()

// Mount feedback routes
router.use('/feedback', feedbackRoutes)

export default router
