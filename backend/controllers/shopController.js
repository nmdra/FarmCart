import asyncHandler from '../middlewares/asyncHandler.js'
import Shop from '../models/shopModel.js'

// Fetch all shops (might need to limit this based on farmer)
// @description   Fetch all shops
// @route         GET /api/shops
const getShops = asyncHandler(async (req, res) => {
    const shops = await Shop.find({ farmer: req.user._id }) // Fetch only the shops belonging to the logged-in farmer
    res.json(shops)
})

// @description   Fetch a single shop by ID
// @route         GET /api/shops/:id
const getShopById = asyncHandler(async (req, res) => {
    const shop = await Shop.findOne({
        _id: req.params.id,
        farmer: req.user._id,
    }) // Ensure the shop belongs to the farmer

    if (shop) {
        res.json(shop)
    } else {
        res.status(404)
        throw new Error('Shop not found')
    }
})

// @description   Create a new shop
// @route         POST /api/shops
const createShop = asyncHandler(async (req, res) => {
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
        farmer: req.user._id, // Associate the shop with the logged-in farmer
    })

    const createdShop = await shop.save()
    res.status(201).json(createdShop)
})

// @description   Update a shop by ID
// @route         PUT /api/shops/:id
const updateShop = asyncHandler(async (req, res) => {
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
        shop.bank = bank || bank || shop.bank
        shop.branch = branch || shop.branch

        const updatedShop = await shop.save()
        res.json(updatedShop)
    } else {
        res.status(404)
        throw new Error('Shop not found')
    }
})

// @description   Delete a shop by ID
// @route         DELETE /api/shops/:id
const deleteShop = asyncHandler(async (req, res) => {
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
})

export { getShops, getShopById, createShop, updateShop, deleteShop }
