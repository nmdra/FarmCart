import asyncHandler from '../middlewares/asyncHandler.js';
import Shop from '../models/shopModel.js';
import mongoose from 'mongoose';

// Fetch products of a shop by ID
const getShopProducts = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid Shop ID');
    }

    const shop = await Shop.findById(id).select('products');
    console.log('Fetched Shop:', shop); // Debug log

    if (shop) {
        res.json(shop.products);
    } else {
        res.status(404);
        throw new Error('Shop not found');
    }
});

// Fetch a specific product of a shop by shopId and productId
const getShopProductById = asyncHandler(async (req, res) => {
    const { id, productId } = req.params;

    // Validate the shopId and productId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid Shop ID');
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400);
        throw new Error('Invalid Product ID');
    }

    

    // Find the shop by ID
    const shop = await Shop.findById(id);

    // Debug log
    console.log('Fetched Shop:', shop); 

    if (shop) {
        // Find the product within the shop's products array
        const product = shop.products.id(productId);

        // Debug log
        console.log('Fetched Product:', product); 

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
// Add a product to a shop
const addProductToShop = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, pricePerKg, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid Shop ID');
    }

    const shop = await Shop.findById(id);
    if (shop) {
        const newProduct = {
            _id: new mongoose.Types.ObjectId(), // Ensure unique ID for product
            name,
            pricePerKg,
            description
        };

        shop.products.push(newProduct);
        const updatedShop = await shop.save({ validateBeforeSave: false });
        res.status(201).json(updatedShop);
    } else {
        res.status(404);
        throw new Error('Shop not found');
    }
});
// Update a product in a shop
const updateProductInShop = asyncHandler(async (req, res) => {
    const { id, productId } = req.params;
    const { name, pricePerKg, description } = req.body;

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
            product.name = name || product.name;
            product.pricePerKg = pricePerKg || product.pricePerKg;
            product.description = description || product.description;

            const updatedShop = await shop.save();
            res.json(updatedShop);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } else {
        res.status(404);
        throw new Error('Shop not found');
    }
});

// Delete a product from a shop
const deleteProductFromShop = asyncHandler(async (req, res) => {
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
            product.deleteOne();
            const updatedShop = await shop.save();
            res.json({ message: 'Product removed from shop' });
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } else {
        res.status(404);
        throw new Error('Shop not found');
    }
});

export { 
    getShopProducts,
    getShopProductById,
    addProductToShop,
    updateProductInShop,
    deleteProductFromShop 
};
