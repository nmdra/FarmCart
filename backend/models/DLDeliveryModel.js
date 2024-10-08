import mongoose from 'mongoose'

const DLDeliverySchema = new mongoose.Schema({
    trackingID: {
        type: String,
        unique: true,
    },
    orderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },

    oID: { type: String },

    driverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DLDriver',
    },

    drID: {
        type: String,
    },
    shopName: String,

    pickupAddress: {
        type: String,
    },
    customerName: String,

    dropOffAddress: {
        type: String,
    },
    assignDateTime: {
        type: Date,
        default: Date.now,
    },
    deliveryStatus: {
        type: String,
        enum: ['Ready', 'Picked Up', 'On The Way', 'Delivered'],
        default: 'Ready',
    },
    deliveredDateTime: {
        type: Date,
        default: null,
    },
})

const DLDelivery = mongoose.model('DLDelivery', DLDeliverySchema)

export default DLDelivery
