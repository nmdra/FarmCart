import mongoose from 'mongoose'
import productSchema from './ProductModel.js' // Import productSchema directly
import bcrypt from 'bcryptjs'

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
            required: [true, 'Email is required'], // Ensure email is provided
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
        products: [productSchema], // Embedded products array
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
        },
        branch: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

// Hash the account_name and account_number before saving to the database
shopSchema.pre('save', async function (next) {
    // Check if either account_name or account_number has been modified
    if (
        !this.isModified('account_name') &&
        !this.isModified('account_number')
    ) {
        return next() // Skip if neither is modified
    }

    try {
        const salt = await bcrypt.genSalt(10) // Generate salt

        if (this.isModified('account_name')) {
            this.account_name = await bcrypt.hash(this.account_name, salt) // Hash the account name
        }

        if (this.isModified('account_number')) {
            this.account_number = await bcrypt.hash(this.account_number, salt) // Hash the account number
        }

        next() // Proceed to the next middleware
    } catch (error) {
        next(error) // Pass any errors to the next middleware
    }
})

// Create and export the Shop model using the schema
const Shop = mongoose.model('Shop', shopSchema)
export default Shop
