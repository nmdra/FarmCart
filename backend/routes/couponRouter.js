import express from 'express'
import { validCoupon } from '../controllers/couponController.js'

const couponRouter = express.Router()

couponRouter.post('/valid-coupon', validCoupon)

export default couponRouter
