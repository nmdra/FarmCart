import Coupon from '../models/couponModel.js'

export const validCoupon = async (req, res) => {
    try {
        const { couponCode } = req.body

        const coupon = await Coupon.findOne({ couponCode })

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' })
        }

        res.status(200).json({ coupon })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createCoupon = async (req, res) => {
    try {
        const { couponCode, discount, expiryDate } = req.body

        const coupon = await Coupon.create({ couponCode, discount, expiryDate })

        res.status(201).json({ coupon })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}
