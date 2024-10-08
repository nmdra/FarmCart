import express from 'express'
import {
    createCoupon,
    validCoupon,
    getAllCoupons,
    updateCoupon,
    getCouponById,
    deleteCoupon,
} from '../controllers/couponController.js'

const couponRouter = express.Router()

couponRouter.post('/valid-coupon', validCoupon)
couponRouter.post('/', createCoupon)
couponRouter.get('/', getAllCoupons)
couponRouter.put('/:id', updateCoupon)
couponRouter.get('/:id', getCouponById)
couponRouter.delete('/:id', deleteCoupon)

export default couponRouter
