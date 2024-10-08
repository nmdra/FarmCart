import express from 'express'
import {
    addOrder,
    getOrders,
    deleteOrder,
    updateOrderStatus,
} from '../controllers/DLOcontroller.js'

const router = express.Router()

// Route to add a new order
router.post('/a', addOrder)

// Fetch all orders
router.get('/g', getOrders)

// Update order status
router.put('/u/:id/status', updateOrderStatus)

// Delete an order
router.delete('/d/:id', deleteOrder)

export default router
