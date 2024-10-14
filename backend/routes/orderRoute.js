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
    getDailyOrders,
    getTotalSales,
    getShopTotalIncome,
} from '../controllers/orderController.js'
const orderRouter = express.Router()

orderRouter.get('/', getAllOrders)
orderRouter.post('/', createOrder)
orderRouter.post('/create-payment-intent', createPaymentIntent)
orderRouter.get('/daily-orders', getDailyOrders)
orderRouter.get('/revenue', getTotalSales)
orderRouter.get('/get-user-orders/:id', getOrdersByUserId)
orderRouter.put('/:id', updateOrderStatus)
orderRouter.delete('/:id', DeleteOrder)
orderRouter.get('/get-shop/:id', getShopByFarmerId)
orderRouter.get('/shop-total-income', getShopTotalIncome)

orderRouter.get('/:id', getOrderById) // Fetch order details by ID with populated farmer and user details

export default orderRouter
