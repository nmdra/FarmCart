import mongoose from 'mongoose'

// Define the schema for a Product (to be embedded in Shop)
const productSchema = new mongoose.Schema(
    {
        // Name of the product
        name: {
            type: String,
            required: [true, 'Name is required'], // Ensure name is provided
            validate: {
                validator: function (v) {
                    // Validate that the name contains only letters and spaces
                    return /^[a-zA-Z\s]+$/.test(v)
                },
                message:
                    '{VALUE} is not a valid name! Only letters and spaces are allowed.',
            },
        },
        // Price of the product (assuming price per kg)
        pricePerKg: {
            type: Number,
            required: [true, 'price is required'],
            validate: {
                validator: function (v) {
                    // Validate that the price is a valid number with up to two decimal places
                    return /^\d+(\.\d{1,2})?$/.test(v)
                },
                message:
                    '{VALUE} is not a valid price! Price per Kg must be a valid number with up to two decimal places.',
            },
        },
        // Description of the product
        description: {
            type: String,
            required: true,
        },
        // Image URL or path representing the product
        image: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
)

export default productSchema
