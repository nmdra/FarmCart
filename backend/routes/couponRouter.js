import express from 'express'
import { createCoupon, validCoupon } from '../controllers/couponController.js'

const couponRouter = express.Router()

couponRouter.post('/valid-coupon', validCoupon)
couponRouter.post('/create', createCoupon)

export default couponRouter
