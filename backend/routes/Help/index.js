import express from 'express'

import feedbackRoutes from './feedback.route.js' // Feedback routes
import supportTicketRoutes from './supportTicket.routes.js' // Feedback routes

const router = express.Router()

// Mount feedback routes
router.use('/feedback', feedbackRoutes)
router.use('/support-tickets', supportTicketRoutes)

export default router
