import Product from '../../models/Admin/AdminProduct.js' // Correct path to Product model
import Promotion from '../../models/Admin/AdminPromotion.js' // Correct path to Promotion model

// Retrieve product details for a specific product ID
export const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.params

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        // Send product details along with current price
        res.status(200).json({
            productId: product._id,
            name: product.name,
            currentPrice: product.currentPrice,
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving product details',
            error,
        })
    }
}
// Add a promotion to a product
export const addPromotion = async (req, res) => {
    try {
        const { productId, discountPercentage } = req.body

        // Find the product by ID
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        // Validate discount percentage
        if (discountPercentage < 0 || discountPercentage > 100) {
            return res
                .status(400)
                .json({
                    message: 'Discount percentage must be between 0 and 100',
                })
        }

        // Calculate the new price based on the discount
        const newPrice = product.currentPrice * (1 - discountPercentage / 100)

        // Create a new promotion
        const promotion = new Promotion({
            productId,
            discountPercentage,
            newPrice,
        })

        // Save the promotion to the database
        await promotion.save()

        res.status(201).json(promotion)
    } catch (error) {
        res.status(500).json({ message: 'Error adding promotion', error })
    }
}

// Update an existing promotion
export const updatePromotion = async (req, res) => {
    try {
        const { promotionId } = req.params
        const { discountPercentage } = req.body

        const promotion = await Promotion.findById(promotionId)
        if (!promotion) {
            return res.status(404).json({ message: 'Promotion not found' })
        }
        // Validate discount percentage
        if (discountPercentage < 0 || discountPercentage > 100) {
            return res
                .status(400)
                .json({
                    message: 'Discount percentage must be between 0 and 100',
                })
        }

        // Update the promotion details
        const product = await Product.findById(promotion.productId)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        promotion.discountPercentage = discountPercentage
        promotion.newPrice =
            product.currentPrice * (1 - discountPercentage / 100)

        await promotion.save()

        res.status(200).json(promotion)
    } catch (error) {
        res.status(500).json({ message: 'Error updating promotion', error })
    }
}

// Retrieve promotions for a specific product
export const getPromotionsByProduct = async (req, res) => {
    try {
        const { productId } = req.params

        // Find promotions by product ID
        const promotions = await Promotion.find({ productId }).populate(
            'productId'
        )

        if (promotions.length === 0) {
            return res
                .status(404)
                .json({ message: 'No promotions found for this product' })
        }

        res.status(200).json(promotions)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving promotions', error })
    }
}

// Delete a promotion
export const deletePromotion = async (req, res) => {
    try {
        const { promotionId } = req.params

        const promotion = await Promotion.findById(promotionId)
        if (!promotion) {
            return res.status(404).json({ message: 'Promotion not found' })
        }

        await promotion.deleteOne()

        res.status(200).json({ message: 'Promotion deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting promotion', error })
    }
}
