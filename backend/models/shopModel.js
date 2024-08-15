import mongoose from "mongoose";
import productSchema from "./ProductModel.js"; // Import productSchema directly

// Define the schema for a Shop
const shopSchema = new mongoose.Schema({
    // Reference to the Farmer who owns the shop
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farmer", // Reference to the Farmer model
        required: true, // Ensure that a shop must be linked to a farmer
    },
    // Name of the shop
    name: {
        type: String,
        required: true,
    },
    // Address subdocument containing house number, street name, and city
    address: {
        houseNo: {
            type: String,
            required: true,
        },
        streetName: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
    },
    // District where the shop is located
    district: {
        type: String,
        required: true,
    },
    // Category of the shop (e.g., Vegetables, Fruits)
    category: {
        type: String,
        required: true,
    },
    // Email address for contact
    email: {
        type: String,
        required: true,
    },
    // Contact number for the shop
    contactNumber: {
        type: String,
        required: true,
    },
    // Description of the shop
    description: {
        type: String,
        required: true,
    },
    // Embedded products array
    products: [productSchema], // Embedded products array
}, {
    timestamps: true,
});

// Create and export the Shop model using the schema
const Shop = mongoose.model("Shop", shopSchema);
export default Shop;
