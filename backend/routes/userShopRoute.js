import express from 'express';
import {
    getShopById,
    getShopProducts,
    getShopProductById,
    getShops,
} from '../controllers/userShopController.js'; // Import the controller functions

const router = express.Router();

// Route to fetch details of a specific shop by ID
// GET /api/shops/:id
router.get('/', getShops);

// Route to fetch details of a specific shop by ID
// GET /api/shops/:id
router.get('/:id', getShopById);

// Route to fetch all products for a specific shop
// GET /api/shops/:id/products
router.get('/:id/products', getShopProducts);

// Route to fetch a specific product from a shop by product ID
// GET /api/shops/:id/products/:productId
router.get('/:id/products/:productId', getShopProductById);

export default router;
