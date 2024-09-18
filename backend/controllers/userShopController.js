import Shop from '../models/shopModel.js';
import asyncHandler from '../middlewares/asyncHandler.js'
import mongoose from 'mongoose';


export const getShops = asyncHandler(async (req, res) => {
    try {
        const shops = await Shop.find() // Fetch only the shops belonging to the logged-in farmer
        res.json(shops)
    } catch (error) {
        res.status(500)
        throw new Error('Failed to fetch shops: ' + error.message)
    }
})

// Fetch shop details and its products
export const getShopById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid Shop ID');
    }

    const shop = await Shop.findById(id).populate('products'); // Fetch shop and populate products

    if (shop) {
        res.json(shop);
    } else {
        res.status(404);
        throw new Error('Shop not found');
    }
});

// Fetch all products of a specific shop
export const getShopProducts = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid Shop ID');
    }

    const shop = await Shop.findById(id).select('products'); // Fetch shop's products only

    if (shop) {
        res.json(shop.products);
    } else {
        res.status(404);
        throw new Error('Shop not found');
    }
});

// Fetch a single product from a shop by product ID
export const getShopProductById = asyncHandler(async (req, res) => {
    const { id, productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid Shop ID');
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400);
        throw new Error('Invalid Product ID');
    }

    const shop = await Shop.findById(id);

    if (shop) {
        const product = shop.products.id(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } else {
        res.status(404);
        throw new Error('Shop not found');
    }
});
