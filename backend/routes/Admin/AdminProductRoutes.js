import express from 'express'
import {
    addProduct,
    updateProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
} from '../../controllers/Admin/AdminProductController.js' // Correct path to Product controller

const router = express.Router()

// Route to add a new product
router.post('/Addproduct', addProduct)

// Route to update an existing product by ID
router.put('/:productId', updateProduct)

// Route to retrieve all products
router.get('/', getAllProducts)

// Route to retrieve a specific product by ID
router.get('/:productId', getProductById)

// Route to delete a product by ID
router.delete('/:productId', deleteProduct)

export default router
