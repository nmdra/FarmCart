// routes/DLEmailRoutes.js
import express from 'express'
import { sendApprovalEmail } from '../controllers/DLEmailController.js'

const router = express.Router()

// Route to send approval email
router.post('/send-approval-email/:id', sendApprovalEmail)

export default router
