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

        console.log('farmerid', id)
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

export const getDailyOrders = async (req, res) => {
    try {
        const orders = await Order.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$createdAt',
                        },
                    },
                    totalOrders: { $sum: 1 },
                    totalSales: { $sum: '$totalPrice' },
                },
            },
            { $sort: { _id: 1 } },
        ])

        res.json(orders)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
}

// Function to calculate total sales for both today and yesterday and return as JSON
export const getTotalSales = async (req, res) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set to the start of today

    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1) // Set to the start of yesterday

    const now = new Date() // Current time for today's end

    try {
        // Get total sales for today
        const todaySales = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: today, $lt: now },
                },
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: '$totalPrice' },
                },
            },
        ])

        // Get total sales for yesterday
        const yesterdaySales = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: yesterday, $lt: today },
                },
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: '$totalPrice' },
                },
            },
        ])

        // Return total sales for today and yesterday in JSON format
        return res.status(200).json({
            today: todaySales.length > 0 ? todaySales[0].totalSales : 0,
            yesterday:
                yesterdaySales.length > 0 ? yesterdaySales[0].totalSales : 0,
        })
    } catch (error) {
        console.error('Error fetching total sales:', error)
        return res.status(500).json({ message: 'Error fetching total sales' })
    }
}

export const getShopTotalIncome = async (req, res) => {
    try {
        const totalIncome = await Order.aggregate([
            {
                $group: {
                    _id: '$farmer.shopId', // Group by shop ID
                    totalIncome: { $sum: '$totalPrice' }, // Sum totalPrice for each shop
                },
            },
            {
                $lookup: {
                    from: 'shops', // Name of your shop collection
                    localField: '_id', // The shop ID from the previous group stage
                    foreignField: '_id', // The shop ID in the shops collection
                    as: 'shopDetails', // Output array field for joined shop details
                },
            },
            {
                $unwind: '$shopDetails', // Deconstruct the shopDetails array
            },
            {
                $lookup: {
                    from: 'farmers', // Assuming the farmers collection holds owner information
                    localField: 'shopDetails.farmer', // Reference to farmer ID in the shopDetails
                    foreignField: '_id', // The farmer ID in the farmers collection
                    as: 'farmerDetails', // Output array field for joined farmer details
                },
            },
            {
                $unwind: '$farmerDetails', // Deconstruct the farmerDetails array
            },
            {
                $project: {
                    _id: 0, // Exclude the default _id field
                    shopId: '$_id', // Include the shop ID
                    shopName: '$shopDetails.name', // Include the shop name
                    totalIncome: 1, // Include total income
                    ownerName: '$farmerDetails.name', // Include the owner's name
                },
            },
        ])

        res.status(200).json(totalIncome) // Send the total income response
    } catch (error) {
        console.error('Error fetching shop total income with owner:', error)
        res.status(500).json({
            message: 'Error fetching total income for shops with owner',
        })
    }
}
