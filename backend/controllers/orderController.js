import Stripe from 'stripe'
import Order from '../models/OrderModel.js'
import Shop from '../models/shopModel.js'
import mongoose from 'mongoose'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const createPaymentIntent = async (req, res) => {
    const { totalPrice, user } = req.body

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: (totalPrice * 100).toFixed(0),
            currency: 'usd',
            payment_method_types: ['card'],
            description: `Order for user ${user.name}`,
        })

        res.status(201).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createOrder = async (req, res) => {
    try {
        const {
            farmer,
            orderItems,
            shippingAddress,
            totalPrice,
            user,
            deliveryDateObj,
        } = req.body

        console.log(req.body)

        const deliveryDate = new Date(
            deliveryDateObj.year,
            deliveryDateObj.month,
            deliveryDateObj.day
        )
        // console.log('orderItems', orderItems)
        const newOrder = new Order({
            farmer,
            orderItems,
            shippingAddress,
            totalPrice,
            user: user,
            deliveryDate,
        })

        await newOrder.save()

        res.status(201).json(newOrder)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const getAllOrders = async (req, res) => {
    const shopId = req.query.shopId
    console.log('shopId', shopId)
    try {
        const orders = shopId
            ? await Order.find({ 'farmer.shopId': shopId }).sort({ _id: 1 })
            : await Order.find().sort({ _id: 1 })

        res.status(200).json(orders)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const getOrdersByUserId = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.id })
        res.status(200).json(orders)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { orderStatus } = req.body
        console.log('orderStatus', orderStatus)
        const order = await Order.findById(id)

        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }

        order.orderStatus = orderStatus

        await order.save()

        res.status(200).json(order)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const DeleteOrder = async (req, res) => {
    try {
        const { id } = req.params
        await Order.findByIdAndDelete(id)
        res.status(200).json({ message: 'Order deleted successfully' })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const getShopByFarmerId = async (req, res) => {
    try {
        const { id } = req.params

        // Optional: Validate the ID format (assuming MongoDB ObjectId)
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid farmer ID format' })
        }

        // Find shops associated with the given farmer ID
        const shops = await Shop.find({ farmer: id })

        // Check if any shop is found
        if (!shops.length) {
            return res
                .status(404)
                .json({ message: 'No shops found for this farmer' })
        }

        // Return the shop(s) found
        res.status(200).json(shops)
    } catch (error) {
        // Return an error with a 500 status for internal server issues
        res.status(500).json({
            message: 'Failed to retrieve shops',
            error: error.message,
        })
    }
}

export const getOrderById = async (req, res) => {
    const { id: orderId } = req.params // Destructure orderId from request query
    console.log('Fetching order with ID:', orderId) // Log the orderId

    try {
        // Validate ObjectId
        if (!mongoose.isValidObjectId(orderId)) {
            return res.status(400).json({ message: 'Invalid order ID format.' })
        }

        // Find the order by ID and populate any necessary references
        const order = await Order.findById(orderId)
            .populate('farmer.shopId', 'name')
            .populate('user', 'firstname email')

        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }

        res.status(200).json(order)
    } catch (error) {
        console.error('Error fetching order:', error) // Log the error for debugging
        res.status(500).json({ message: error.message })
    }
}
