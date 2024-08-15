import mongoose from "mongoose";

// Define the schema for a Product (to be embedded in Shop)
const productSchema = new mongoose.Schema({
    // Name of the product
    name: {
        type: String,
        required: true,
    },
    // Price of the product (assuming price per kg)
    pricePerKg: {
        type: Number,
        required: true,
    },
    // Description of the product
    description: {
        type: String,
        required: true,
    },
    // Image URL or path representing the product
    /* image: {
        type: String,
        required: true,
    }, */
}, {
    timestamps: true,
});

export default productSchema;
