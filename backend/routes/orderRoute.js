import express from 'express'
import { getAllOrders } from '../controllers/orderController.js'
import protect from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, getAllOrders)

export default router
