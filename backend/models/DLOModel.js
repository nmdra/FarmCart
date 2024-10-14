import mongoose from 'mongoose'

const dorderSchema = new mongoose.Schema(
    {
        /* generate and store the  oID:{type: String,}, */

        oID: {
            type: String,
            required: [true, 'Order ID required'], // Ensure each order has a unique ID
            unique: [true, 'Order already exists'],
        },

        orderID: {
            type: String, // You can change this to any type or ObjectId if needed
            required: false, // Ensure each order has a unique ID
            // Make sure this order ID is unique
        },
        customerName: {
            type: String,
            required: false,
        },

        customerEmail: {
            type: String,
            required: false,
        },

        customerNumber: {
            type: String,
            required: false,
        },
        customerAddress: {
            type: String,
            required: false,
            // streetAddress: { type: String, required: false },
            // city: { type: String, required: false },
            // zipCode: { type: String, required: false },
            // district: { type: String, required: false },
        },
        shopName: {
            type: String,
            required: [false, 'Shop name is required'],
        },
        shopAddress: {
            houseNo: {
                type: String,
                required: [false, 'House number is required'],
            },
            streetName: {
                type: String,
                required: [false, 'Street name is required'],
            },
            city: {
                type: String,
                required: [false, 'City is required'],
            },
        },
        shopEmail: {
            type: String,
            required: false,
        },

        shopPhone: {
            type: String,
            required: false,
        },

        orderStatus: {
            type: String,
            enum: ['Pending', 'Ready', 'Picked Up', 'On The Way', 'Delivered'],
            default: 'Pending',
            required: false,
        },
        deliveryDate: {
            type: Date,
            default: null,
        },
        deliveredAt: {
            type: Date,
            default: null,
        },
        deliverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Driver', // Reference to a 'Driver' model
            default: null,
        },
        deliverName: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
)

const dOrder = mongoose.model('dOrder', dorderSchema)

export default dOrder
