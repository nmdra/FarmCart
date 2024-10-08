import Product from '../../models/Admin/AdminProduct.js'

// Add a new product
export const addProduct = async (req, res) => {
    try {
        const { name, description, currentPrice } = req.body

        const product = new Product({
            name,
            description,
            currentPrice,
        })

        await product.save()
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error })
    }
}

// Update an existing product
export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const { name, description, currentPrice } = req.body

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        product.name = name
        product.description = description
        product.currentPrice = currentPrice

        await product.save()
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error })
    }
}

// Retrieve all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error })
    }
}

// Retrieve a specific product by ID
export const getProductById = async (req, res) => {
    try {
        const { productId } = req.params

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error })
    }
}

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }

        await product.deleteOne()
        res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error })
    }
}
