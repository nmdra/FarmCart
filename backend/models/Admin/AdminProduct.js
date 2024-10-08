import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        currentPrice: { type: Number, required: true },
        // You can add more fields as necessary
    },
    {
        timestamps: true, // Optional: adds createdAt and updatedAt fields
    }
)

const Product = mongoose.model('Product', productSchema)

export default Product
