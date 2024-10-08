import mongoose from 'mongoose'

const promotionSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    discountPercentage: { type: Number, required: true },
    newPrice: { type: Number, required: true },
})

const Promotion = mongoose.model('Promotion', promotionSchema)

export default Promotion
