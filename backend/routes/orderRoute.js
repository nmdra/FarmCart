import express from 'express'
import { getAllOrders } from '../controllers/orderController.js'
import { get } from 'http'

const router = express.Router()

router.route('/').get(getAllOrders)

export default router
