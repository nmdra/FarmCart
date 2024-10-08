import express from 'express'
import {
    addPromotion,
    updatePromotion,
    getPromotionsByProduct,
    deletePromotion,
    getProductDetails,
} from '../../controllers/Admin/AdminPromotionController.js'

const router = express.Router()

router.get('/product/:productId', getProductDetails)
router.post('/', addPromotion) // Add a promotion
router.put('/:promotionId', updatePromotion) // Update a promotion
router.get('/:productId', getPromotionsByProduct) // Retrieve promotions for a product
router.delete('/:promotionId', deletePromotion) // Delete a promotion

export default router
