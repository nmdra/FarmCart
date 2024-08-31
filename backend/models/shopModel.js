import mongoose from 'mongoose'
import productSchema from './ProductModel.js' // Import productSchema directly
import CryptoJS from 'crypto-js'

// Define the schema for a Shop
const shopSchema = new mongoose.Schema(
    {
        // Reference to the Farmer who owns the shop
        farmer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Farmer', // Reference to the Farmer model
            required: true, // Ensure that a shop must be linked to a farmer
        },
        // Name of the shop
        name: {
            type: String,
            required: [true, 'Name is required'],
            validate: {
                validator: function (v) {
                    // Validate that the name contains only letters and spaces
                    return /^[a-zA-Z\s]+$/.test(v)
                },
                message:
                    '{VALUE} is not a valid name! Only letters and spaces are allowed.',
            },
        },
        // Address subdocument containing house number, street name, and city
        address: {
            houseNo: {
                type: String,
                required: [true, 'House number is required'], // Ensure house number is provided
            },
            streetName: {
                type: String,
                required: [true, 'Street name is required'], // Ensure street name is provided
            },
            city: {
                type: String,
                required: [true, 'City is required'], // Ensure city is provided
            },
        },
        // District where the shop is located
        district: {
            type: String,
            required: [true, 'distric is required'],
        },
        // Category of the shop (e.g., Vegetables, Fruits)
        category: {
            type: String,
            required: [true, 'Category is required'],
        },
        // Email address for contact
        email: {
            type: String,
            required: [true, 'Email is required'],
            validate: {
                validator: function (v) {
                    // Validate email format
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
                },
                message: '{VALUE} is not a valid email!',
            },
        },
        // Contact number for the shop
        contactNumber: {
            type: String,
            required: [true, 'Contact number is required'], // Ensure contact number is provided
            validate: {
                validator: function (v) {
                    // Validate contact number format (starts with 0, followed by 7 and then 8 digits)
                    return /^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$/.test(v)
                },
                message: '{VALUE} is not a valid contact number!',
            },
        },
        // Description of the shop
        description: {
            type: String,
            required: true,
        },
        // Embedded products array
        products: [productSchema],
        account_name: {
            type: String,
            required: true,
        },
        account_number: {
            type: String,
            required: true,
        },
        bank: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    // Validate that the bank contains only letters and spaces
                    return /^[a-zA-Z\s]+$/.test(v)
                },
                message: ' Only letters and spaces are allowed.',
            },
        },
        branch: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    // Validate that the branch contains only letters and spaces
                    return /^[a-zA-Z\s]+$/.test(v)
                },
                message:
                    '{VALUE} is not a valid name! Only letters and spaces are allowed.',
            },
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

shopSchema.pre('save', async function (next) {
    try {
        if (this.isModified('account_name')) {
            // Encrypt account_name before saving
            this.account_name = CryptoJS.AES.encrypt(
                this.account_name,
                process.env.CRYPTO_SECRET_KEY
            ).toString()
        }

        if (this.isModified('account_number')) {
            // Encrypt account_number before saving
            this.account_number = CryptoJS.AES.encrypt(
                this.account_number,
                process.env.CRYPTO_SECRET_KEY
            ).toString()
        }

        // Continue with the save operation
        next()
    } catch (error) {
        console.error('Error in pre-save hook:', error)
        next(error)
    }
})
// Decrypt fields
shopSchema.methods.decryptAccountName = function () {
    const bytes = CryptoJS.AES.decrypt(
        this.account_name,
        process.env.CRYPTO_SECRET_KEY
    )
    return bytes.toString(CryptoJS.enc.Utf8)
}

shopSchema.methods.decryptAccountNumber = function () {
    const bytes = CryptoJS.AES.decrypt(
        this.account_number,
        process.env.CRYPTO_SECRET_KEY
    )
    return bytes.toString(CryptoJS.enc.Utf8)
}

// Create and export the Shop model using the schema
const Shop = mongoose.model('Shop', shopSchema)
export default Shop
