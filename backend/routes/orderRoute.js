import express from 'express'
import {
    getAllOrders,
    createOrder,
    createPaymentIntent,
    getOrdersByUserId,
    updateOrderStatus,
    DeleteOrder,
    getShopByFarmerId,
} from '../controllers/orderController.js'
const orderRouter = express.Router()

orderRouter.get('/', getAllOrders)
orderRouter.post('/', createOrder)
orderRouter.post('/create-payment-intent', createPaymentIntent)
orderRouter.get('/get-user-orders/:id', getOrdersByUserId)
orderRouter.put('/:id', updateOrderStatus)
orderRouter.delete('/:id', DeleteOrder)
orderRouter.get('/get-shop/:id', getShopByFarmerId)

export default orderRouter
