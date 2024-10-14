import asyncHandler from 'express-async-handler'
import dOrder from '../models/DLOModel.js'
import Order from '../models/OrderModel.js' // Import the Order model
import Shop from '../models/shopModel.js' // Import the Shop model
import User from '../models/userModel.js' // Import the User model
import DLDelivery from '../models/DLDeliveryModel.js'

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public
const addOrder = asyncHandler(async (req, res) => {
    const {
        orderID,
        customerName,
        customerAddress,
        shopName,
        shopAddress,
        orderStatus,
        deliveryDate,
        deliverId,
        deliverName,
    } = req.body

    const order = new dOrder({
        orderID,
        customerName,
        customerAddress,
        shopName,
        shopAddress,
        orderStatus,
        deliveryDate,
        deliverId,
        deliverName,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
})

// @desc    Fetch all orders
// @route   GET /api/orders
// @access  Public
const getOrders = asyncHandler(async (req, res) => {
    const orders = await dOrder.find({})
    res.json(orders)
})

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Public
const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await dOrder.findById(req.params.id)

    if (order) {
        const allowedStatus = [
            'Pending',
            'Ready',
            'Picked Up',
            'On The Way',
            'Delivered',
        ]
        const currentStatusIndex = allowedStatus.indexOf(order.orderStatus)

        // Ensure the status progresses in order and cannot be reversed
        if (currentStatusIndex < allowedStatus.length - 1) {
            order.orderStatus = allowedStatus[currentStatusIndex + 1]
        } else {
            return res
                .status(400)
                .json({ message: 'Order is already delivered' })
        }

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404).json({ message: 'Order not found' })
    }
})

const deleteOrder = asyncHandler(async (req, res) => {
    const order = await dOrder.findById(req.params.id)

    if (order) {
        await order.deleteOne() // Use deleteOne instead of remove
        res.json({ message: 'Order deleted successfully' })
    } else {
        res.status(404).json({ message: 'Order not found' })
    }
})

// Helper function to generate a random order ID between A000000 to Z999999
const generateOrderId = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const randomLetter = letters[Math.floor(Math.random() * letters.length)]
    const randomNumber = Math.floor(100000 + Math.random() * 900000) // Generate a 6-digit number
    return `${randomLetter}${randomNumber}`
}

// Function to check orders with status 'Ready' and assign them to dOrder model
const assignReadyOrders = async () => {
    try {
        // console.log('Checking for orders with status "Ready"...')

        // Find all orders with the status 'Ready'
        const readyOrders = await Order.find({ orderStatus: 'Ready' })
        // console.log(`Found ${readyOrders.length} orders with status "Ready".`)

        // Iterate through each ready order
        for (const order of readyOrders) {
            // console.log(`Processing order with ID: ${order._id}`)

            // First check if the order exists in DLDelivery
            const existingDelivery = await DLDelivery.findOne({
                orderID: order._id.toString(),
            })
            if (existingDelivery) {
                // console.log(
                // `Order with ID ${order._id} already exists in DLDelivery.`
                // )
                continue // Skip this order if it already exists in DLDelivery
            }

            // Check if this order has already been assigned in dOrder
            const existingOrder = await dOrder.findOne({
                oID: order._id.toString(),
            })
            if (existingOrder) {
                continue // Skip this order if it already exists in dOrder
            }

            // Find the shop associated with this order (via shopId)
            const shop = await Shop.findById(order.farmer.shopId)
            if (!shop) {
                // console.log(`No shop found for order with ID ${order._id}`)
                continue // Skip this order if no shop is found
            }
            // console.log(`Shop found for order: ${shop.name}, Address: ${shop.address.streetName}, ${shop.address.city}`)

            // Find the user associated with this order
            const user = await User.findById(order.user)
            if (!user) {
                // console.log(`No user found for order with ID ${order._id}`)
                continue // Skip this order if no user is found
            }
            // console.log(`User found for order: ${user.firstname} ${user.lastname}, Email: ${user.email}`)

            // Create a customer name by combining firstname and lastname
            const customerName =
                `${user.firstname || ''} ${user.lastname || ''}`.trim()

            // // Use the defaultAddress from the User model
            // const customerAddress = {
            //     streetAddress: user.defaultAddress.streetAddress || 'N/A',
            //     city: user.defaultAddress.city || 'N/A',
            //     zipCode: user.defaultAddress.zipCode || 'N/A',
            //     district: user.defaultAddress.district || 'N/A',
            // }
            // // console.log(`Customer Address: ${customerAddress.streetAddress}, ${customerAddress.city}`)

            // Extract the shippingAddress fields from the user
            const { name, address, city, phone, email } = order.shippingAddress

            // Combine address and city into a single string
            const cusAddress = `${address}, ${city}`

            // Create a new dOrder with the customer and shop address and order data
            const newDOrder = new dOrder({
                oID: order._id.toString(), // Assigning the order ID from the Order model
                orderID: generateOrderId(), // Randomly generated order ID
                customerName: customerName, // Full name from User model
                customerEmail: email, // Email from User model
                customerNumber: phone, // Phone number from User model
                customerAddress: cusAddress, // Address from User model
                shopName: shop.name, // Shop name from the Shop model
                shopEmail: shop.email, // Shop email from the Shop model
                shopPhone: shop.contactNumber, // Shop phone from the Shop model
                shopAddress: {
                    houseNo: shop.address.houseNo, // House number from the Shop model
                    streetName: shop.address.streetName, // Street name from the Shop model
                    city: shop.address.city, // City from the Shop model
                },
                orderStatus: order.orderStatus, // Assign the same status
                deliveryDate: order.deliveryDate || new Date(), // Add delivery date if applicable
                deliveredAt: order.deliveredAt,
                deliverId: order.deliverId
                    ? mongoose.Types.ObjectId(order.deliverId)
                    : null,
                deliverName: order.deliverName,
            })

            // Save the new dOrder
            await newDOrder.save()
            /*console.log(`Order with ID ${order._id} has been successfully assigned to dOrder with new orderID ${newDOrder.orderID}.`)*/

            // After saving the new dOrder, update the order status to "Assigning" in the Order model
            order.orderStatus = ' Ready. '
            await order.save() // Save the updated order
            // console.log(`Order with ID ${order._id} has been marked as "Assigning" in the Order model.`)
        }
    } catch (error) {
        console.error('Error assigning ready orders to dOrder:', error)
    }
}

// Helper function to update the order status based on delivery status
const syncDeliveryAndOrderStatus = async () => {
    try {
        // Fetch all deliveries where the status is 'Picked Up', 'On The Way', or 'Delivered'
        const deliveries = await DLDelivery.find({
            deliveryStatus: { $in: ['Picked Up', 'On The Way', 'Delivered'] },
        })

        // Iterate over each delivery and update the corresponding order
        for (const delivery of deliveries) {
            const order = await Order.findById(delivery.orderID)

            if (order) {
                // Map delivery status to corresponding order status
                let newOrderStatus

                if (delivery.deliveryStatus === 'Picked Up') {
                    newOrderStatus = 'Picked Up'
                } else if (delivery.deliveryStatus === 'On The Way') {
                    newOrderStatus = 'On The Way'
                } else if (delivery.deliveryStatus === 'Delivered') {
                    newOrderStatus = 'Delivered'
                }

                // Update the order's status if it's different
                if (order.orderStatus !== newOrderStatus) {
                    order.orderStatus = newOrderStatus
                    await order.save() // Save the updated order
                    console.log(
                        `Order ${order._id} updated to ${newOrderStatus}`
                    )
                }
            }
        }
    } catch (error) {
        console.error('Error syncing delivery and order status:', error)
    }
}

// Function to repeatedly check for ready orders every 5 seconds
const startOrderAssignment = () => {
    /* console.log('Starting periodic check for ready orders...')*/
    setInterval(assignReadyOrders, 1000) // Run the check every 5 seconds
}

const startSyncDeliveryOrderStatus = () => {
    setInterval(syncDeliveryAndOrderStatus, 1000) // Run every 5 seconds
}

export { startSyncDeliveryOrderStatus }

export { startOrderAssignment }

export { deleteOrder }

export { getOrders, updateOrderStatus }

export { addOrder }
