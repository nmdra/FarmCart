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

export const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find() // Retrieve all coupons
        res.status(200).json(coupons) // Return the coupons
    } catch (error) {
        res.status(500).json({ message: error.message }) // Handle errors
    }
}

export const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params // Get coupon ID from the request params
        const { couponCode, discount, expiryDate } = req.body // Get updated fields from the request body

        // Find the coupon by ID and update it with the new values
        const updatedCoupon = await Coupon.findByIdAndUpdate(
            id,
            { couponCode, discount, expiryDate },
            { new: true } // This option returns the updated document
        )

        // If the coupon is not found, return a 404 error
        if (!updatedCoupon) {
            return res.status(404).json({ message: 'Coupon not found' })
        }

        // Send the updated coupon back to the client
        res.status(200).json(updatedCoupon)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getCouponById = async (req, res) => {
    try {
        const { id } = req.params // Get the coupon ID from the request params
        const coupon = await Coupon.findById(id) // Find the coupon by ID

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' })
        }

        res.status(200).json(coupon) // Send the found coupon as a response
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params // Get the coupon ID from the request params
        const coupon = await Coupon.findByIdAndDelete(id) // Find the coupon by ID and delete it

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' })
        }

        res.status(200).json({ message: 'Coupon deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
