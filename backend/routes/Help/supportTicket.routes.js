import express from 'express'
import {
    createTicket,
    getTickets,
    generateTicketReport,
} from '../../controllers/Help/supportTicket.controller.js' // Adjust the path based on your controllers

const router = express.Router()

// Route for creating a new support ticket
router.post('/', createTicket)

// Route for fetching all support tickets (optional)
router.get('/', getTickets)

router.get('/ticket-report/:ticketId', generateTicketReport)
export default router
