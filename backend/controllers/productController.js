import asyncHandler from '../middlewares/asyncHandler.js'
import Shop from '../models/shopModel.js'
import mongoose from 'mongoose'

// Fetch products of a shop by ID
//route         GET /api/shops/:id/products
const getShopProducts = asyncHandler(async (req, res) => {
    const { id } = req.params

    // Check if the provided shop ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
        throw new Error('Invalid Shop ID')
    }

    // Find the shop by ID and select only the products field
    const shop = await Shop.findById(id).select('products')
    console.log('Fetched Shop:', shop) // Debug log

    if (shop) {
        // Respond with the list of products
        res.json(shop.products)
    } else {
        res.status(404)
        throw new Error('Shop not found')
    }
})

// Fetch a specific product of a shop by shopId and productId
//route         GET /api/shops/:id/products/:productId
const getShopProductById = asyncHandler(async (req, res) => {
    const { id, productId } = req.params

    // Validate the shopId and productId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
        throw new Error('Invalid Shop ID')
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400)
        throw new Error('Invalid Product ID')
    }

    // Find the shop by ID
    const shop = await Shop.findById(id)
    console.log('Fetched Shop:', shop) // Debug log

    if (shop) {
        // Find the specific product within the shop's products array
        const product = shop.products.id(productId)
        console.log('Fetched Product:', product) // Debug log

        if (product) {
            // Respond with the product details
            res.json(product)
        } else {
            res.status(404)
            throw new Error('Product not found')
        }
    } else {
        res.status(404)
        throw new Error('Shop not found')
    }
})

// Add a product to a shop
//route         POST /api/shops/:id/products/:productId
const addProductToShop = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { name, pricePerKg, description, image } = req.body

    // Validate the shop ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
        throw new Error('Invalid Shop ID')
    }

    // Find the shop by ID
    const shop = await Shop.findById(id)
    if (shop) {
        // Create a new product object
        const newProduct = {
            _id: new mongoose.Types.ObjectId(), // Ensure unique ID for product
            name,
            pricePerKg,
            description,
            image,
        }

        // Add the new product to the shop's products array
        shop.products.push(newProduct)
        const updatedShop = await shop.save({ validateBeforeSave: false })
        res.status(201).json(updatedShop)
    } else {
        res.status(404)
        throw new Error('Shop not found')
    }
})

// Update a product in a shop
//route         PUT /api/shops/:id/products/:productId
const updateProductInShop = asyncHandler(async (req, res) => {
    const { id, productId } = req.params
    const { name, pricePerKg, description, image } = req.body

    // Validate the shop ID and product ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
        throw new Error('Invalid Shop ID')
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400)
        throw new Error('Invalid Product ID')
    }

    // Find the shop by ID
    const shop = await Shop.findById(id)
    if (shop) {
        // Find the product within the shop's products array
        const product = shop.products.id(productId)

        if (product) {
            // Update product fields with provided values, if any
            product.name = name || product.name
            product.pricePerKg = pricePerKg || product.pricePerKg
            product.description = description || product.description
            product.image = image || product.image

            // Save the updated shop
            const updatedShop = await shop.save()
            res.json(updatedShop)
        } else {
            res.status(404)
            throw new Error('Product not found')
        }
    } else {
        res.status(404)
        throw new Error('Shop not found')
    }
})

// Delete a product from a shop
//route         DELETE /api/shops/:id/products/:productId
const deleteProductFromShop = asyncHandler(async (req, res) => {
    const shopId = req.params.id
    const productId = req.params.productId
    console.log('shopid :', shopId) // Debug log
    console.log(productId) // Debug log

    // Validate the shop ID and product ID
    if (!mongoose.Types.ObjectId.isValid(shopId)) {
        res.status(400)
        throw new Error('Invalid Shop ID')
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400)
        throw new Error('Invalid Product ID')
    }

    // Find the shop by ID
    const shop = await Shop.findById(shopId)
    if (shop) {
        // Find the product within the shop's products array
        const product = shop.products.id(productId)

        if (product) {
            // Remove the product from the shop
            product.deleteOne()
            await shop.save()
            res.json({ message: 'Product removed from shop' })
        } else {
            res.status(404)
            throw new Error('Product not found')
        }
    } else {
        res.status(404)
        throw new Error('Shop not found')
    }
})

export {
    getShopProducts,
    getShopProductById,
    addProductToShop,
    updateProductInShop,
    deleteProductFromShop,
}
