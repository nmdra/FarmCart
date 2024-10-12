import mongoose from 'mongoose'
import { type } from 'os'

const orderSchema = new mongoose.Schema(
    {
        farmer: {
            shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer' },
        },
        orderItems: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    // type: String, // change this to object id
                    // required: true,
                },
            },
        ],
        shippingAddress: {
            name: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            phone: { type: String, required: true },
            email: { type: String, required: true },
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            // name: { type: String, required: true },
            // id: { type: String, required: true },
        },
        totalPrice: { type: Number, required: true },
        orderStatus: {
            type: String,
            enum: [
                'Pending',
                'Accept',
                'Rejected',
                'Ready',
                ' Ready. ',
                'PickUp',
                'OnTheWay',
                'Delivered',
                'Picked Up',
                'On The Way',
            ],
            default: 'Pending',
        },
        deliveryDate: {
            type: Date,
        },
        deliveredAt: {
            type: Date,
            default: null,
        },
        deliverId: {
            type: String,
            default: null,
        },
        deliverName: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
