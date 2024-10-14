import express from 'express'
import {
    getShops,
    getShopById,
    createShop,
    updateShop,
    deleteShop,
    getAllShops,
} from '../controllers/shopController.js'

import { protect } from '../middlewares/farmerauthMiddleware.js' // Ensure the path is correct
import {
    getShopProducts,
    getShopProductById,
    addProductToShop,
    updateProductInShop,
    deleteProductFromShop,
} from '../controllers/productController.js'

const router = express.Router()

//Fetch All Shops
router.get('/all-shops', getAllShops)

// Route to handle GET and POST requests for shops
router
    .route('/')
    .get(protect, getShops) // Fetch all shops
    .post(protect, createShop) // Create a new shop

// Route to handle GET, PUT, and DELETE requests for a shop by ID
router
    .route('/:id')
    .get(protect, getShopById) // Fetch a shop by its ID
    .put(protect, updateShop) // Update a shop by its ID
    .delete(protect, deleteShop) // Delete a shop by its ID

router
    .route('/:id/products')
    .get(protect, getShopProducts)
    .post(protect, addProductToShop)

router
    .route('/:id/products/:productId')
    .get(protect, getShopProductById) // Fetch a product by its ID
    .put(protect, updateProductInShop) // Update a Product by its ID
    .delete(protect, deleteProductFromShop) // Delete a delete by its ID

export default router
