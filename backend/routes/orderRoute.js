import express from 'express'
import {
    getAllOrders,
    createOrder,
    createPaymentIntent,
    getOrdersByUserId,
    updateOrderStatus,
    DeleteOrder,
    getShopByFarmerId,
    getOrderById,
} from '../controllers/orderController.js'
const orderRouter = express.Router()

orderRouter.get('/', getAllOrders)
orderRouter.post('/', createOrder)
orderRouter.post('/create-payment-intent', createPaymentIntent)
orderRouter.get('/get-user-orders/:id', getOrdersByUserId)
orderRouter.put('/:id', updateOrderStatus)
orderRouter.delete('/:id', DeleteOrder)
orderRouter.get('/get-shop/:id', getShopByFarmerId)

orderRouter.get('/:id', getOrderById) // Fetch order details by ID with populated farmer and user details

export default orderRouter
