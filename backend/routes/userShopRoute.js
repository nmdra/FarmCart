import express from 'express';
import {
    getShopById,
    getShopProducts,
    getShopProductById,
    getShops,
} from '../controllers/userShopController.js'; // Import the controller functions
import apicache from 'apicache';

// Configure apicache
let cache = apicache.middleware;

const router = express.Router();

// Route to fetch all shops with caching
// GET /api/shops/
router.get('/', cache('5 minutes'), getShops);

// Route to fetch details of a specific shop by ID with caching
// GET /api/shops/:id
router.get('/:id', cache('5 minutes'), getShopById);

// Route to fetch all products for a specific shop with caching
// GET /api/shops/:id/products
router.get('/:id/products', cache('10 minutes'), getShopProducts);

// Route to fetch a specific product from a shop by product ID with caching
// GET /api/shops/:id/products/:productId
router.get('/:id/products/:productId', cache('10 minutes'), getShopProductById);

export default router;
