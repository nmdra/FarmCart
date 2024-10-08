import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import DLDriver from '../models/DLDriverModel.js'

const protectDriver = asyncHandler(async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET) // Verify token

            req.driver = await DLDriver.findById(decoded.id).select('-password') // Attach driver to request
            next()
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' })
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' })
    }
})

export { protectDriver }
