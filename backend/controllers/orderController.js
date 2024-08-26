import { MOCK_DATA } from '../data/MOCK_ORDERS.js'

export const getAllOrders = async (req, res, next) => {
    try {
        res.json(MOCK_DATA)
    } catch (error) {
        return next(error)
    }
}
