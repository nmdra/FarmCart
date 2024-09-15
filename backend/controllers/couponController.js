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
