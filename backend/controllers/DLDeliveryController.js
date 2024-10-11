import DLDriver from '../models/DLDriverModel.js'
import dOrder from '../models/DLOModel.js'
import DLDelivery from '../models/DLDeliveryModel.js'
import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'

// Function to generate a tracking ID starting with 'TR' followed by 5 digits
const generateTrackingID = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000)
    return `TR${randomNum}`
}

// Controller to assign a driver and create delivery record
export const assignDriverToOrder = async () => {
    try {
        // Find the oldest order
        const order = await dOrder.findOne().sort({ createdAt: 1 })
        if (!order) {
            /* console.log('No orders available');*/
            return
        }

        const existingDelivery = await DLDelivery.findOne({
            orderID: order.oID,
        })
        if (existingDelivery) {
            // If the order is already assigned, delete the order from dOrder table
            await dOrder.deleteOne({ _id: order._id })
            console.log(
                `Order ${order.oID} is already assigned, deleted from dOrder table.`
            )
            return
        }

        // Find an available driver
        const driver = await DLDriver.findOne({ isAvailable: true }).sort({
            createdAt: 1,
        })
        if (!driver) {
            /* console.log('No drivers available');*/
            return
        }

        // Generate tracking ID
        const trackingID = generateTrackingID()

        // Create a new delivery entry
        const delivery = new DLDelivery({
            trackingID,
            orderID: order.oID,
            oID: order.orderID,
            driverID: driver._id,
            drID: driver.driverID,
            shopName: order.shopName,
            pickupAddress:
                `${order.shopAddress.houseNo || ''}, ${order.shopAddress.streetName || ''}, ${order.shopAddress.city || ''}, ${order.shopAddress.district || ''}`
                    .trim()
                    .replace(/^,|,$/g, ''),
            customerName: order.customerName,
            dropOffAddress:
                `${order.customerAddress.streetAddress || ''}, ${order.customerAddress.city || ''}, ${order.customerAddress.zipCode || ''}, ${order.customerAddress.district || ''}`
                    .trim()
                    .replace(/^,|,$/g, ''),
        })

        await delivery.save()

        // Update the driver's status to unavailable
        driver.isAvailable = false
        await driver.save()

        // Delete the order after assignment
        await dOrder.deleteOne({ _id: order._id })

        // Call the function to send an email to the driver
        await sendEmailToDriver(driver, delivery)

        /* console.log(`Assigned driver ${driver.fullName} to order ${order._id} with tracking ID ${trackingID}`); */
    } catch (error) {
        console.error('Error assigning driver to order:', error)
    }
}

// Function to send an email to the driver
export const sendEmailToDriver = async (driver, delivery) => {
    try {
        // Set up the Nodemailer transporter using your environment variables
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        // Set up the email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: driver.email,
            subject: `Order Assignment: Order ${delivery.oID} Assigned to You`,
            html: `
                <h2>Hi ${driver.fullName},</h2>
                <p>We are excited to inform you that you have been assigned to deliver the following order:</p>
                <h3>Order Details</h3>
                <ul>
                    <li><strong>Order ID:</strong> ${delivery.oID}</li>
                    <li><strong>Tracking ID:</strong> ${delivery.trackingID}</li>
                    <li><strong>Shop Name:</strong> ${delivery.shopName}</li>
                    <li><strong>Pickup Address:</strong> ${delivery.pickupAddress}</li>
                    <li><strong>Customer Name:</strong> ${delivery.customerName}</li>
                    <li><strong>Drop-Off Address:</strong> ${delivery.dropOffAddress}</li>
                </ul>
                <p>For more details, please log in to the delivery portal or contact support if needed.</p>
                <br/>
                <p>Thank you for being part of our delivery team!</p>
                <p>Best Regards,</p>
                <p><strong>Your Company Name</strong></p>
            `,
        }

        // Send the email
        await transporter.sendMail(mailOptions)
        console.log(`Email sent to driver: ${driver.email}`)
    } catch (error) {
        console.error('Error sending email to driver:', error)
    }
}

// Function to constantly check for available drivers and assign them to oldest orders
export const checkForAvailableDrivers = async () => {
    try {
        // Continuously check every few seconds
        setInterval(async () => {
            await assignDriverToOrder()
        }, 5000) // Check every 5 seconds
    } catch (error) {
        console.error('Error in checking for available drivers:', error)
    }
}

// Controller to get all deliveries with search and pagination
export const getAllDeliveries = async (req, res) => {
    try {
        // Search filters
        const { search = '', page = 1, limit = 20 } = req.query

        // Regular expression for search
        const searchRegex = new RegExp(search, 'i')

        // Fetch deliveries with filters applied
        const deliveries = await DLDelivery.find({
            $or: [
                { trackingID: searchRegex },
                { oID: searchRegex },
                { drID: searchRegex },
                { shopName: searchRegex },
                { customerName: searchRegex },
                { pickupAddress: searchRegex },
                { dropOffAddress: searchRegex },
            ],
        })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))

        // Total number of deliveries for pagination
        const total = await DLDelivery.countDocuments({
            $or: [
                { trackingID: searchRegex },
                { oID: searchRegex },
                { drID: searchRegex },
                { shopName: searchRegex },
                { customerName: searchRegex },
                { pickupAddress: searchRegex },
                { dropOffAddress: searchRegex },
            ],
        })

        res.status(200).json({
            deliveries,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
        })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching deliveries', error })
    }
}

// @desc   Get a single delivery by ID
// @route  GET /api/delivery/:id
// @access Public
export const getDeliveryById = asyncHandler(async (req, res) => {
    const delivery = await DLDelivery.findById(req.params.id)

    if (delivery) {
        res.json(delivery)
    } else {
        res.status(404)
        throw new Error('Delivery not found')
    }
})

// Get total deliveries count
export const getTotalDeliveries = asyncHandler(async (req, res) => {
    const totalDeliveries = await DLDelivery.countDocuments() // Count all documents
    res.json({ count: totalDeliveries })
})

// Get ongoing deliveries count
export const getOngoingDeliveries = asyncHandler(async (req, res) => {
    const ongoingDeliveries = await DLDelivery.countDocuments({
        deliveryStatus: { $ne: 'Delivered' }, // Count where status is not "Delivered"
    })
    res.json({ count: ongoingDeliveries })
})

// Controller to get ongoing deliveries for a specific driver
export const getOngoingDeliveriesByDriver = asyncHandler(async (req, res) => {
    const driverID = req.params.driverID // Get driverID from the URL parameters

    // Find deliveries assigned to the driver where status is not 'Delivered'
    const deliveries = await DLDelivery.find({
        driverID,
        deliveryStatus: { $ne: 'Delivered' },
    })

    if (deliveries.length > 0) {
        res.json(deliveries)
    } else {
        res.json({ message: 'No ongoing deliveries at the moment' })
    }
})

// Update delivery status
export const updateDeliveryStatus = asyncHandler(async (req, res) => {
    const { deliveryStatus } = req.body // Get the new status from the request body

    try {
        const delivery = await DLDelivery.findById(req.params.deliveryId)

        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' })
        }

        // Prevent moving back to previous statuses
        if (delivery.deliveryStatus === 'Delivered') {
            return res.status(400).json({
                message: 'Cannot update the status of a delivered order',
            })
        }

        // Update the delivery status
        delivery.deliveryStatus = deliveryStatus

        // If the delivery is marked as "Delivered", set the deliveredDateTime
        if (deliveryStatus === 'Delivered') {
            delivery.deliveredDateTime = Date.now()
        }

        await delivery.save()

        res.status(200).json({
            message: 'Delivery status updated successfully',
            delivery,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error updating delivery status',
            error,
        })
    }
})

// Controller to get all deliveries for a specific driver
export const getDeliveriesByDriver = async (req, res) => {
    const { driverID } = req.params // Get driverID from route params

    try {
        // Fetch all deliveries where the driverID matches
        const deliveries = await DLDelivery.find({ driverID: driverID })

        if (!deliveries || deliveries.length === 0) {
            return res
                .status(404)
                .json({ message: 'No deliveries found for this driver.' })
        }

        res.status(200).json(deliveries) // Return deliveries as response
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching deliveries',
            error: error.message,
        })
    }
}
