import asyncHandler from '../middlewares/asyncHandler.js'
import Shop from '../models/shopModel.js'

// Fetch all shops
export const getAllShops = asyncHandler(async (req, res) => {
    try {
        const shops = await Shop.find() // Fetch all shops
        if (!shops || shops.length === 0) {
            return res.status(404).json({ message: 'No shops found' }) // Handle case where no shops are found
        }
        res.json(shops) // Send the shops data as response
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch all shops: ' + error.message,
        }) // Send error message in response
    }
})
// route         GET /api/shops
const getShops = asyncHandler(async (req, res) => {
    try {
        const shops = await Shop.find({ farmer: req.user._id }) // Fetch only the shops belonging to the logged-in farmer
        res.json(shops)
    } catch (error) {
        res.status(500)
        throw new Error('Failed to fetch shops: ' + error.message)
    }
})

// Fetch a single shop by ID
// route         GET /api/shops/:id
const getShopById = asyncHandler(async (req, res) => {
    try {
        const shop = await Shop.findOne({
            _id: req.params.id,
            farmer: req.user._id,
        }) // Ensure the shop belongs to the farmer

        if (shop) {
            // Decrypt account name and account number
            const decryptedAccountName = shop.decryptAccountName()
            const decryptedAccountNumber = shop.decryptAccountNumber()

            // Send decrypted values in the response
            res.json({
                ...shop._doc,
                account_name: decryptedAccountName,
                account_number: decryptedAccountNumber,
            })
        } else {
            res.status(404)
            throw new Error('Shop not found')
        }
    } catch (error) {
        res.status(500)
        throw new Error('Failed to fetch shop: ' + error.message)
    }
})

// Create a new shop
// route         POST /api/shops
const createShop = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            address: { houseNo, streetName, city },
            district,
            category,
            email,
            contactNumber,
            description,
            products = [],
            account_name,
            account_number,
            bank,
            branch,
            image,
        } = req.body

        const shop = new Shop({
            name,
            address: { houseNo, streetName, city },
            district,
            category,
            email,
            contactNumber,
            description,
            products,
            account_name,
            account_number,
            bank,
            branch,
            image,
            farmer: req.user._id, // Associate the shop with the logged-in farmer
        })

        const createdShop = await shop.save()
        res.status(201).json(createdShop)
    } catch (error) {
        res.status(500)
        throw new Error('Failed to create shop: ' + error.message)
    }
})

// Update a shop by ID
// route         PUT /api/shops/:id
const updateShop = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            address,
            district,
            category,
            email,
            contactNumber,
            description,
            account_name,
            account_number,
            bank,
            branch,
            image,
        } = req.body

        const shop = await Shop.findOne({
            _id: req.params.id,
            farmer: req.user._id,
        }) // Ensure the shop belongs to the farmer

        if (shop) {
            shop.name = name || shop.name
            shop.address = address || shop.address
            shop.district = district || shop.district
            shop.category = category || shop.category
            shop.email = email || shop.email
            shop.contactNumber = contactNumber || shop.contactNumber
            shop.description = description || shop.description
            shop.account_name = account_name || shop.account_name
            shop.account_number = account_number || shop.account_number
            shop.bank = bank || shop.bank
            shop.branch = branch || shop.branch
            shop.image = image || shop.image

            const updatedShop = await shop.save()
            res.json(updatedShop)
        } else {
            res.status(404)
            throw new Error('Shop not found')
        }
    } catch (error) {
        res.status(500)
        throw new Error('Failed to update shop: ' + error.message)
    }
})

// Delete a shop by ID
// route         DELETE /api/shops/:id
const deleteShop = asyncHandler(async (req, res) => {
    try {
        const shop = await Shop.findOne({
            _id: req.params.id,
            farmer: req.user._id,
        }) // Ensure the shop belongs to the farmer

        if (shop) {
            await shop.deleteOne()
            res.json({ message: 'Shop removed' })
        } else {
            res.status(404)
            throw new Error('Shop not found')
        }
    } catch (error) {
        res.status(500)
        throw new Error('Failed to delete shop: ' + error.message)
    }
})

export { getShops, getShopById, createShop, updateShop, deleteShop }
